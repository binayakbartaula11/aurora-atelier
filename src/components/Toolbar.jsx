import { useState } from "react";
import styled from "styled-components";
import { useUser, SignIn } from "@clerk/clerk-react";

const ToolbarContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f5f5, #ffffff);
  border-radius: 8px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    border-radius: 0;
    background: rgba(245, 245, 245, 0.95);
    justify-content: space-around;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #646cff;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #535bf2;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  &.clear {
    background: #ff4d4d;
  }
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const SizeSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
`;

const ColorPicker = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: scale(1.1);
    border-color: #646cff;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const SizeSlider = styled.input`
  width: 100px;
  height: 8px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 4px;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #646cff;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 95%;
  }
`;

const Toolbar = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  onClear,
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  const { isSignedIn } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSave = () => {
    if (!isSignedIn) {
      setShowSignIn(true);
    } else {
      onSave();
    }
  };

  return (
    <>
      <ToolbarContainer>
        <ColorPickerWrapper>
          <Label>Color</Label>
          <ColorPicker
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Choose color"
          />
        </ColorPickerWrapper>
        <SizeSliderWrapper>
          <Label>Brush Size: {brushSize}px</Label>
          <SizeSlider
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            title="Adjust brush size"
          />
        </SizeSliderWrapper>
        <Button onClick={onUndo} disabled={!canUndo} title="Undo">
          <span role="img" aria-label="undo">↼</span> Undo
        </Button>
        <Button onClick={onRedo} disabled={!canRedo} title="Redo">
          <span role="img" aria-label="redo">⇁</span> Redo
        </Button>
        <Button onClick={onClear} className="clear" title="Clear canvas">
          <span role="img" aria-label="trash">🗑️</span> Clear
        </Button>
        <Button onClick={handleSave} title="Save artwork">
          <span role="img" aria-label="download">↓</span> Save
        </Button>
      </ToolbarContainer>

      {showSignIn && (
        <Modal onClick={() => setShowSignIn(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <SignIn afterSignInUrl={window.location.href} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Toolbar;
