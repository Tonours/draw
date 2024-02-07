import clsx from 'clsx';

type WhiteBoardProps = {
  className?: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export const WhiteBoard = ({ className, canvasRef }: WhiteBoardProps) => {
  return (
    <canvas
      ref={canvasRef}
      className={clsx('absolute top-0 whiteboard', className)}
      data-testid="white-board"
    />
  );
};
