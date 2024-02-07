import { useEffect, useRef, useState } from 'react';

type Line = { x: number; y: number }[];

export const useCanvasDrawing = (
  parentRef?: React.RefObject<HTMLDivElement>
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const redrawLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((line) => {
        ctx.beginPath();
        line.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        });
        ctx.closePath();
      });
    };

    const resizeCanvas = () => {
      canvas.width = parentRef?.current?.clientWidth ?? window.innerWidth;
      canvas.height = parentRef?.current?.clientHeight ?? window.innerHeight;
      redrawLines();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const startDrawing = (e: MouseEvent) => {
      setIsDrawing(true);

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLines((prevLines) => [...prevLines, [{ x, y }]]);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      const currentLine = lines[lines.length - 1];
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newLine = [...currentLine, { x, y }];

      setLines((prevLines) => [...prevLines.slice(0, -1), newLine]);
      redrawLines();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [parentRef, lines, isDrawing]);

  return [canvasRef, lines] as const;
};
