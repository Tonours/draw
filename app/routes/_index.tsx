import { useRef } from 'react';
import { ClientRect, DndContext, Modifier } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import MainLayout from '~/layouts/_main';
import { Toolbar } from '~/components/ui/Toolbar';
import { WhiteBoard } from '~/components/ui/WhiteBoard';
import { snapBottomToCursor } from '~/utils/dndkit';

import IconTrash from '~/icons/icon-trash.svg?react';
import { useCanvasDrawing } from '~/hooks/useCanvasDrawing';

export default function Index() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const { canvasRef, clearCanvas } = useCanvasDrawing(parentRef);
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
            <Toolbar.Item className="col-span-2" onClick={() => clearCanvas()}>
              <IconTrash className="w-3 h-[auto]" />
            </Toolbar.Item>
          </Toolbar>

          <WhiteBoard canvasRef={canvasRef} />
        </DndContext>
      </div>
    </MainLayout>
  );
}
