import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";

import platformAdapter from "@/utils/platformAdapter";

const CONNECTOR_CHANGE_EVENT = "connector_data_change";
const DATASOURCE_CHANGE_EVENT = "datasourceData_change";

type keyArrayObject = {
  [key: string]: any[];
};

export type IConnectStore = {
  serverList: any[];
  setServerList: (servers: []) => void;
  currentService: any;
  setCurrentService: (service: any) => void;
  connector_data: keyArrayObject;
  setConnectorData: (connector_data: any[], key: string) => void;
  datasourceData: keyArrayObject;
  setDatasourceData: (datasourceData: any[], key: string) => void;
  connectionTimeout: number;
  setConnectionTimeout: (connectionTimeout: number) => void;
  currentSessionId?: string;
  setCurrentSessionId: (currentSessionId?: string) => void;
  assistantList: any[];
  setAssistantList: (assistantList: []) => void;
  currentAssistant: any;
  setCurrentAssistant: (assistant: any) => void;
  queryTimeout: number;
  setQueryTimeout: (queryTimeout: number) => void;
  visibleStartPage: boolean;
  setVisibleStartPage: (visibleStartPage: boolean) => void;
};

export const useConnectStore = create<IConnectStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        serverList: [],
        setServerList: (serverList: []) => {
          console.log("set serverList:", serverList);
          set(
            produce((draft) => {
              draft.serverList = serverList;
            })
          );
        },
        currentService: "default_coco_server",
        setCurrentService: (server: any) => {
          console.log("set default server:", server);
          set(
            produce((draft) => {
              draft.currentService = server;
            })
          );
        },
        connector_data: {},
        setConnectorData: async (connector_data: any[], key: string) => {
          set(
            produce((draft) => {
              draft.connector_data[key] = connector_data;
            })
          );
          await platformAdapter.emitEvent(CONNECTOR_CHANGE_EVENT, {
            connector_data,
          });
        },
        datasourceData: {},
        setDatasourceData: async (datasourceData: any[], key: string) => {
          set(
            produce((draft) => {
              draft.datasourceData[key] = datasourceData;
            })
          );
          await platformAdapter.emitEvent(DATASOURCE_CHANGE_EVENT, {
            datasourceData,
          });
        },
        initializeListeners: () => {
          platformAdapter.listenEvent(CONNECTOR_CHANGE_EVENT, (event: any) => {
            const { connector_data } = event.payload;
            set({ connector_data });
          });
          platformAdapter.listenEvent(DATASOURCE_CHANGE_EVENT, (event: any) => {
            const { datasourceData } = event.payload;
            set({ datasourceData });
          });
        },
        connectionTimeout: 120,
        setConnectionTimeout: (connectionTimeout: number) => {
          return set(() => ({ connectionTimeout }));
        },
        setCurrentSessionId(currentSessionId) {
          return set(() => ({ currentSessionId }));
        },
        assistantList: [],
        setAssistantList: (assistantList) => {
          return set(() => ({ assistantList }));
        },
        currentAssistant: null,
        setCurrentAssistant: (assistant: any) => {
          set(
            produce((draft) => {
              draft.currentAssistant = assistant;
            })
          );
        },
        queryTimeout: 5,
        setQueryTimeout: (queryTimeout: number) => {
          return set(() => ({ queryTimeout }));
        },
        visibleStartPage: false,
        setVisibleStartPage: (visibleStartPage: boolean) => {
          return set(() => ({ visibleStartPage }));
        },
      }),
      {
        name: "connect-store",
        partialize: (state) => ({
          currentService: state.currentService,
          connector_data: state.connector_data,
          datasourceData: state.datasourceData,
          connectionTimeout: state.connectionTimeout,
          currentAssistant: state.currentAssistant,
          queryTimeout: state.queryTimeout,
        }),
      }
    )
  )
);
