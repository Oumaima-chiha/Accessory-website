import { useCallback, useState } from 'react';

interface IToggleSideBarHook {
  sideToggled: boolean;
  toggleSideBar: () => void;
  openSideBar: () => void;
  closeSidebar: () => void;
}

const useToggleSideBar = (): IToggleSideBarHook => {
  const [sideToggled, setSideToggled] = useState(false);

  const toggleSideBar = useCallback(() => {
    setSideToggled(!sideToggled);
  }, [sideToggled]);

  const openSideBar = useCallback(() => {
    setSideToggled(true);
  }, []);

  const closeSidebar = useCallback(() => setSideToggled(false), []);

  return { sideToggled, toggleSideBar, openSideBar, closeSidebar };
};

export default useToggleSideBar;
