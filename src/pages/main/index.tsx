import { useCallback } from "react";

import SearchChat from "@/components/SearchChat";
import platformAdapter from "@/utils/platformAdapter";
import { useAppStore } from "@/stores/appStore";
import { useSyncStore } from "@/hooks/useSyncStore";

function MainApp() {
  const setIsTauri = useAppStore((state) => state.setIsTauri);
  setIsTauri(true);

  const hideLeiting = useCallback(() => {
    return platformAdapter.hideWindow();
  }, []);

  useSyncStore();

  return (
    <SearchChat
      isTauri={true}
      hideLeiting={hideLeiting}
      hasModules={["search", "chat"]}
    />
  );
}

export default MainApp;
