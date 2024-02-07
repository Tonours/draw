import clsx from 'clsx';
import { useCanvasDrawing } from '~/hooks/useCanvasDrawing';

type WhiteBoardProps = {
  className?: string;
  parentRef: React.RefObject<HTMLDivElement>;
};

export const WhiteBoard = ({ className, parentRef }: WhiteBoardProps) => {
  const [canvasRef] = useCanvasDrawing(parentRef);

  return (
    <canvas
      ref={canvasRef}
      className={clsx('absolute top-0 whiteboard', className)}
      data-testid="white-board"
    />
  );
};
