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

  const getCoords = useCallback((e: MouseEvent | TouchEvent) => {
    let x = 0;
    let y = 0;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      if (e instanceof TouchEvent) {
        e.preventDefault();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
    }
    
    return { x, y };
  }, [])

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

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawingRef.current = true;
      const { x, y } = getCoords(e);

      linesRef.current.push([{ x, y }]);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) {
        return;
      }
      const { x, y } = getCoords(e);
      const currentLine = linesRef.current[linesRef.current.length - 1];
      currentLine.push({ x, y });
      drawLine(currentLine);
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
    };
  }, [drawLine, getCoords]);

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
