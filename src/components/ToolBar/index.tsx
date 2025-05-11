import { useEffect } from 'react';
// import Draggable from 'react-draggable';
import LeitingLogo from '@/assets/app-icon.png';
import { PhysicalSize, PhysicalPosition, currentMonitor } from '@tauri-apps/api/window'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import './index.css';

// const windowx = new Window('toolbar')
// const windowView = new WebviewWindow('toolbar');
// windowx.setPosition(new PhysicalPosition(1830, 200));
// windowx.setFullscreen(true);
// windowx.setIgnoreCursorEvents(true);
// windowx.setSize(new PhysicalSize(64, 64));
// windowx.setTitle('');
// windowx.setResizable(false);
// windowx.setTitleBarStyle('transparent');
// console.log('xxxxx', windowx);
// windowx.setDecorations(false);

const barSize = 48;
const FloatingBall = () => {
  // const floatBarRef = useRef();
  // useDoubleClick({
  //   target: floatBarRef,
  //   onSingleClick: () => {
  //     // setText("single click");
  //     windowx.close();
  //   }
  // });

  async function initWindow() {
    const windowx = await WebviewWindow.getByLabel('toolbar');
    const monitor = await currentMonitor();
    const sizexy = await monitor?.size ?? { width: 0, height: 0 };
    // console.log('windowx.outerSize()', sizexy.width - barSize - barSize / 2, (sizexy.height - barSize) / 2);
    windowx!.setSize(new PhysicalSize(barSize, barSize));
    windowx!.setPosition(new PhysicalPosition(sizexy.width - barSize - barSize / 2, (sizexy.height - barSize) / 2));
  }

  useEffect(() => {
    initWindow();
  }, [])

  return (
    <div className="relative" style={{ borderRadius: 100, height: barSize, width: barSize, overflow: 'hidden' }} data-tauri-drag-region>
      {/* 悬浮球 */}
      <div
        data-tauri-drag-region
        style={{ overflow: 'hidden' }}
        className={`fixed flex items-center justify-center cursor-pointer z-50 transition-all duration-300 w-12 h-12`}
      >
        {/* <span data-tauri-drag-region className="text-white font-bold">雷霆</span> */}
        <img data-tauri-drag-region style={{ width: barSize, height: barSize }} src={LeitingLogo} alt="" />
      </div>
    </div>
  );
};

export default FloatingBall;