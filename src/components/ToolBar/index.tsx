import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { useDoubleClick } from '@reactuses/core';

const flowBarSize = 64;
const flowLineSize = 16;
const flowDis = 24;
const flowHiddenDis = flowDis / 2;

const FloatingBall = () => {
  const floatBarRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - flowBarSize - flowDis, // 初始位置：右侧边缘 30px，悬浮球直径64px
    y: window.innerHeight / 2 - flowBarSize / 2, // 垂直居中，悬浮球半径32px
  });
  const [isEdgeHidden, setIsEdgeHidden] = useState(false);

  // 拖拽结束时检查是否需要吸附到边缘
  const handleDragStop = (e, data) => {
    const { x, y } = data;
    const centerX = window.innerWidth / 2;

    let newX = position.x;

    if (x <= flowHiddenDis || x >= window.innerWidth - flowBarSize - flowHiddenDis) {
      // 吸附到最近的边缘
      if (x <= flowHiddenDis) {
        newX = 0; // 左侧边缘，留出30px边距
      } else {
        newX = window.innerWidth - flowLineSize; // 右侧边缘，贴紧边缘（悬浮球宽度为64px）
      }
      setIsEdgeHidden(true); // 变为竖条样式
    } else if (x < centerX) {
      // 偏离屏幕中间靠左，吸附到左侧边缘
      newX = flowDis;
      setIsEdgeHidden(false); // 恢复悬浮球样式
    } else {
      // 偏离屏幕中间靠右，吸附到右侧边缘
      newX = window.innerWidth - flowBarSize - flowDis;
      setIsEdgeHidden(false); // 恢复悬浮球样式
    }

    setPosition({ x: newX, y });
    setIsDragging(false); // 拖拽结束
  };

  // 切换菜单展开/收起
  const toggleMenu = () => {
    if (!isDragging && isEdgeHidden) {
      if (position.x === 0) {
        setPosition({
          x: flowDis,
          y: position.y,
        })
      } else {
        setPosition({
          x: position.x - flowBarSize - flowHiddenDis,
          y: position.y
        })
      }
      setIsEdgeHidden((prev) => !prev); // 非拖拽状态下才允许展开/收起菜单
    }
  };
  useDoubleClick({
    target: floatBarRef,
    onSingleClick: () => {
      // setText("single click");
    },
    onDoubleClick: () => {
      toggleMenu();
    },
  });

  return (
    <div className="relative">
      {/* 悬浮球 */}
      <Draggable
        position={position}
        onStart={() => setIsDragging(true)}
        onStop={handleDragStop}
      >
        <div
          ref={floatBarRef}
          className={`fixed flex items-center justify-center cursor-pointer z-50 transition-all duration-300 ${
            isEdgeHidden
              ? 'w-4 h-16 bg-gray-700 rounded-none' // 吸附后的竖条样式，高度不变
              : 'w-16 h-16 bg-blue-500 rounded-full shadow-lg' // 默认悬浮球样式
          }`}
          onClick={toggleMenu} // 点击时展开/收起菜单
        >
          {!isEdgeHidden && <span className="text-white font-bold">雷霆</span>}
        </div>
      </Draggable>
    </div>
  );
};

export default FloatingBall;