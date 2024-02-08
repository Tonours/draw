import { ChangeEvent, useRef } from 'react';
import { ClientRect, DndContext, Modifier } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import MainLayout from '~/layouts/_main';
import { Toolbar } from '~/components/ui/Toolbar';
import { WhiteBoard } from '~/components/ui/WhiteBoard';
import { snapBottomToCursor } from '~/utils/dndkit';

import IconTrash from '~/icons/icon-trash.svg?react';
import IconCircle from '~/icons/icon-circle.svg?react';
import { useCanvasDrawing } from '~/hooks/useCanvasDrawing';

const TOOLBAR_LINE_WIDTH = [6, 10];

export default function Index() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const {
    canvasRef,
    lineColor,
    lineWidth,
    clearCanvas,
    setLineWidth,
    setLineColor,
  } = useCanvasDrawing(parentRef);
  const modifiers = [
    snapBottomToCursor,
    (e: Parameters<Modifier>[0]) =>
      restrictToParentElement({
        ...e,
        containerNodeRect:
          parentRef?.current?.getBoundingClientRect() as ClientRect | null,
      }),
  ];

  return (
    <MainLayout>
      <div ref={parentRef} className="bg-gray-50 w-full h-full relative">
        <DndContext modifiers={modifiers}>
          <Toolbar>
            {TOOLBAR_LINE_WIDTH.map((width) => (
              <Toolbar.Item
                key={width}
                as="button"
                selected={lineWidth === width}
                onClick={() => setLineWidth(width)}
              >
                <IconCircle className={`w-[${width}px] h-[${width}px]`} />
              </Toolbar.Item>
            ))}

            <Toolbar.Item className="col-span-2">
              <input
                type="color"
                className="w-full h-8 cursor-pointer"
                value={lineColor}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setLineColor(e.target.value);
                }}
              />
            </Toolbar.Item>
            <hr className="col-span-2 my-1 border-gray-200" />
            <Toolbar.Item
              as="button"
              className="col-span-2 mt-auto"
              onClick={clearCanvas}
            >
              <IconTrash className="w-3 h-[auto]" />
            </Toolbar.Item>
          </Toolbar>

          <WhiteBoard canvasRef={canvasRef} />
        </DndContext>
      </div>
    </MainLayout>
  );
}
