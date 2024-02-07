import clsx from 'clsx';
import { useDraggable } from '@dnd-kit/core';
import IconDragHandle from '~/icons/icon-draghandle.svg?react';

type ToolbarProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Toolbar = ({ className, children }: ToolbarProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: 'draggable',
    });

  const classNames = clsx(
    'flex flex-col cursor-auto relative w-[120px] min-h-[200px] bg-white border-gray-100 border p-4 rounded-lg drop-shadow-sm transition-opacity duration-200 translate-x-4 translate-y-4 z-50',
    className,
    {
      'opacity-50': isDragging,
      'opacity-100': !isDragging,
    }
  );

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={classNames}
        data-testid="toolbar"
        tabIndex={-1}
      >
        {children}

        <button
          data-testid="toolbar-drag-handle"
          className={clsx(
            'w-full flex items-center justify-center absolute bottom-0 p-2 self-center text-gray-700 hover:text-gray-900',
            {
              'cursor-grabbing': isDragging,
              'cursor-grab': !isDragging,
            }
          )}
          {...listeners}
        >
          <IconDragHandle className="rotate-90" />
        </button>
      </div>
    </>
  );
};
