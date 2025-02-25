import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";

const CanvasContainer = styled.canvas`
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: crosshair;
  touch-action: none;
  max-width: 100%;
  height: auto;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const Canvas = ({ color, brushSize, clearCanvas, setClearCanvas, onHistoryUpdate }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;

    const setCanvasDimensions = () => {
      const containerWidth = container.clientWidth * 0.8;
      const containerHeight = window.innerHeight * 0.7;
      canvas.width = containerWidth;
      canvas.height = containerHeight;
    };

    setCanvasDimensions();
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;

    saveToHistory();

    const handleResize = () => {
      const imageData = canvas.toDataURL();
      setCanvasDimensions();

      const img = new Image();
      img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = imageData;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  useEffect(() => {
    if (clearCanvas) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
      setClearCanvas(false);
    }
  }, [clearCanvas, setClearCanvas]);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();

    setHistory((prev) => {
      const newHistory = prev.slice(0, currentStep + 1);
      return [...newHistory, imageData].slice(-20); // Keep last 20 states
    });
    setCurrentStep((prev) => prev + 1);
  }, [currentStep]);

  const restoreState = useCallback(
    (step) => {
      const img = new Image();
      img.src = history[step];
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        setCurrentStep(step);
      };
    },
    [history]
  );

  const undo = useCallback(() => {
    if (currentStep > 0) {
      restoreState(currentStep - 1);
    }
  }, [currentStep, restoreState]);

  const redo = useCallback(() => {
    if (currentStep < history.length - 1) {
      restoreState(currentStep + 1);
    }
  }, [currentStep, history.length, restoreState]);

  useEffect(() => {
    onHistoryUpdate({
      canUndo: currentStep > 0,
      canRedo: currentStep < history.length - 1,
      undo,
      redo,
    });
  }, [currentStep, history.length, undo, redo, onHistoryUpdate]);

  const getCoordinates = (nativeEvent) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };

    const rect = canvasRef.current.getBoundingClientRect();
    return nativeEvent.touches
      ? {
          offsetX: nativeEvent.touches[0].clientX - rect.left,
          offsetY: nativeEvent.touches[0].clientY - rect.top,
        }
      : {
          offsetX: nativeEvent.clientX - rect.left,
          offsetY: nativeEvent.clientY - rect.top,
        };
  };

  const startDrawing = useCallback((nativeEvent) => {
    const { offsetX, offsetY } = getCoordinates(nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }, []);

  const draw = useCallback(
    (nativeEvent) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = getCoordinates(nativeEvent);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    },
    [isDrawing]
  );

  const stopDrawing = useCallback(() => {
    contextRef.current.closePath();
    setIsDrawing(false);
    saveToHistory();
  }, [saveToHistory]);

  return (
    <CanvasContainer
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onTouchCancel={stopDrawing}
    />
  );
};

export default Canvas;
