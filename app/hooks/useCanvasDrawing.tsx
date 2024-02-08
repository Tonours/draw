import { useRef, useState, useCallback, useEffect } from 'react';

type Line = { x: number; y: number }[];

export const useCanvasDrawing = (
  parentRef?: React.RefObject<HTMLDivElement>
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(6);
  const [lineColor, setLineColor] = useState<string>('#000000');
  const linesRef = useRef<Line[]>([]);

  const updateDrawingProperties = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    },
    [lineWidth, lineColor]
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linesRef.current = [];
  }, []);

  const drawLine = useCallback(
    (line: Line) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || line.length < 2) {
        return;
      }

      updateDrawingProperties(ctx);

      ctx.beginPath();
      line.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    },
    [updateDrawingProperties]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const startDrawing = (e: MouseEvent) => {
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      linesRef.current.push([{ x, y }]);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawingRef.current) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const currentLine = linesRef.current[linesRef.current.length - 1];
      currentLine.push({ x, y });
      drawLine(currentLine);
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [drawLine]);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const parent = parentRef?.current;
      if (canvas && parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
  }, [parentRef]);

  return {
    canvasRef,
    clearCanvas,
    lineColor,
    lineWidth,
    setLineWidth,
    setLineColor,
  } as const;
};
