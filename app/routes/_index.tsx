import { Toolbar } from '~/components/ui/Toolbar';
import { WhiteBoard } from '~/components/ui/WhiteBoard';
import { ClientRect, DndContext, Modifier } from '@dnd-kit/core';

import MainLayout from '~/layouts/_main';
import { useRef } from 'react';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { snapBottomToCursor } from '~/utils/dndkit';

export default function Index() {
  const parentRef = useRef<HTMLDivElement | null>(null);
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
            <strong>WIP</strong>
          </Toolbar>

          <WhiteBoard parentRef={parentRef} />
        </DndContext>
      </div>
    </MainLayout>
  );
}
