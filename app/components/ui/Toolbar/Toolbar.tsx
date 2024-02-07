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
    'flex flex-col cursor-auto relative w-[120px] min-h-[200px] bg-white border-gray-100 border p-2 rounded-lg drop-shadow-sm transition-opacity duration-200 translate-x-4 translate-y-4 z-50',
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
        <ul className="grid grid-cols-2 gap-2">{children}</ul>

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

export type ToolbarItemProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const ToolbarItem = ({
  children,
  className,
  onClick,
}: ToolbarItemProps) => {
  const classNames = clsx(
    'w-full flex items-center justify-center p-2 bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-sm duration-150',
    className
  );

  return (
    <button onClick={onClick} className={classNames} data-testid="toolbar-item">
      {children}
    </button>
  );
};

Toolbar.Item = ToolbarItem;
