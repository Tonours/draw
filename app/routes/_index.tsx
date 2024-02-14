import { ChangeEvent, useRef } from 'react';
import {
  ClientRect,
  DndContext,
  Modifier,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import MainLayout from '~/layouts/_main';
import { Toolbar } from '~/components/ui/Toolbar';
import { WhiteBoard } from '~/components/ui/WhiteBoard';
import { snapBottomToCursor } from '~/utils/dndkit';

import IconTrash from '~/icons/icon-trash.svg?react';
import IconCircle from '~/icons/icon-circle.svg?react';
import { useCanvasDrawing } from '~/hooks/useCanvasDrawing';
import { useKeydown } from '~/hooks/useKeydown';
import clsx from 'clsx';

const TOOLBAR_LINE_WIDTH = [6, 10];

export default function Index() {
  const inputColorRef = useRef<HTMLInputElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const {
    canvasRef,
    lineColor,
    lineWidth,
    clearCanvas,
    setLineWidth,
    setLineColor,
  } = useCanvasDrawing(parentRef);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const modifiers = [
    snapBottomToCursor,
    (e: Parameters<Modifier>[0]) =>
      restrictToParentElement({
        ...e,
        containerNodeRect:
          parentRef?.current?.getBoundingClientRect() as ClientRect | null,
      }),
  ];

  useKeydown('alt+shift+KeyC', () => {
    clearCanvas();
  });

  useKeydown('shift+Digit1', () => {
    setLineWidth(TOOLBAR_LINE_WIDTH[0]);
  });

  useKeydown('shift+Digit2', () => {
    setLineWidth(TOOLBAR_LINE_WIDTH[1]);
  });

  useKeydown('shift+KeyC', () => {
    inputColorRef?.current?.click();
  });

  const whiteboardClassNames = clsx({
    'whiteboard--has-bigger-cursor': lineWidth === TOOLBAR_LINE_WIDTH[1],
  });

  return (
    <MainLayout>
      <div ref={parentRef} className="bg-gray-50 w-full h-full relative">
        <DndContext modifiers={modifiers} sensors={sensors}>
          <Toolbar>
            {TOOLBAR_LINE_WIDTH.map((width) => (
              <Toolbar.Item
                key={width}
                as="button"
                title="Change line width (Shift + 1 or 2)"
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
                ref={inputColorRef}
                value={lineColor}
                title='Change line color (Shift + C)'
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
              title="Clear the canvas (Alt + Shift + C)"
            >
              <IconTrash className="w-3 h-[auto]" />
            </Toolbar.Item>
          </Toolbar>

          <WhiteBoard canvasRef={canvasRef} className={whiteboardClassNames} />
        </DndContext>
      </div>
    </MainLayout>
  );
}
