import { useEffect } from 'react';
// import Draggable from 'react-draggable';
import LeitingLogo from '@/assets/app-icon.png';
import { Window, PhysicalSize, PhysicalPosition, currentMonitor } from '@tauri-apps/api/window'
// import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import './index.css';

const windowx = new Window('toolbar')
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


async function initWindow() {
  const monitor = await currentMonitor();
  const sizexy = await monitor?.size ?? { width: 0, height: 0 };
  console.log('windowx.outerSize()', sizexy.width - 64 - 32, (sizexy.height - 64) / 2);
  windowx.setSize(new PhysicalSize(64, 64));
  windowx.setPosition(new PhysicalPosition(sizexy.width - 64 - 32, (sizexy.height - 64) / 2));
  windowx.onDragDropEvent(e => {
    console.log('onDragDropEvent', e);
  })
}
const FloatingBall = () => {
  // const floatBarRef = useRef();
  // useDoubleClick({
  //   target: floatBarRef,
  //   onSingleClick: () => {
  //     // setText("single click");
  //     windowx.close();
  //   }
  // });

  useEffect(() => {
    initWindow();
  }, [])

  return (
    <div className="relative" style={{ borderRadius: 100, height: 64, width: 64, overflow: 'hidden' }} data-tauri-drag-region>
      {/* 悬浮球 */}
      <div
        data-tauri-drag-region
        style={{ overflow: 'hidden' }}
        className={`fixed flex items-center justify-center cursor-pointer z-50 transition-all duration-300
          w-16 h-16 rounded-full // 默认悬浮球样式
          }`}
      >
        {/* <span data-tauri-drag-region className="text-white font-bold">雷霆</span> */}
        <img data-tauri-drag-region style={{ width: 64, height: 64 }} src={LeitingLogo} alt="" />
      </div>
    </div>
  );
};

export default FloatingBall;