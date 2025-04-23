import { useCallback } from "react";

import SearchPure from "@/components/SearchPure";
import platformAdapter from "@/utils/platformAdapter";
import { useAppStore } from "@/stores/appStore";
import { useSyncStore } from "@/hooks/useSyncStore";

function MainApp() {
  const setIsTauri = useAppStore((state) => state.setIsTauri);
  setIsTauri(true);

  const hideCoco = useCallback(() => {
    return platformAdapter.hideWindow();
  }, []);

  useSyncStore();

  return (
    <SearchPure
      isTauri={true}
      hideCoco={hideCoco}
      hasModules={["search", "chat"]}
    />
  );
}

export default MainApp;
