import { useEffect, useRef, useCallback } from 'react';

type Line = { x: number; y: number }[];

export const useCanvasDrawing = (
  parentRef?: React.RefObject<HTMLDivElement>
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const linesRef = useRef<Line[]>([]);

  const clearCanvas = () => {
    linesRef.current = [];
    redrawLines();
  };

  const drawLine = useCallback((line: Line) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');

    if (!ctx || line.length < 2) {
      return;
    }

    const [start, ...rest] = line;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    rest.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }, []);

  const redrawLines = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linesRef.current.forEach(drawLine);
  }, [drawLine]);

  // Gestion du redimensionnement avec debounce pour optimiser les performances
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !parentRef?.current) return;

    canvas.width = parentRef.current.clientWidth;
    canvas.height = parentRef.current.clientHeight;
    redrawLines();
  }, [redrawLines, parentRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ajout des écouteurs d'événements
    const startDrawing = (e: MouseEvent) => {
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      linesRef.current.push([{ x, y }]);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const currentLine = linesRef.current[linesRef.current.length - 1];
      currentLine.push({ x, y });
      drawLine(currentLine);
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
      redrawLines(); // Redessine pour s'assurer que tout est cohérent
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Applique initialement la taille du canvas

    // Nettoyage des écouteurs d'événements
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas, drawLine, redrawLines]);

  return { canvasRef, clearCanvas };
};
