import { useState, useCallback } from "react";
import styled from "styled-components";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";

// Styled container with a gentle gradient and padding
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);

  @media (max-width: 768px) {
    padding: 0.5rem;
    padding-bottom: 5rem;
  }
`;

// Header with a subtle box-shadow and background color
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

// Left spacer to balance the layout
const LeftSpacer = styled.div`
  flex: 1;
`;

// Centered title with refined typography
const Title = styled.h1`
  color: #213547;
  text-align: center;
  flex: 1;
  font-size: 2rem;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Auth container styled for visual balance
const AuthContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

// Footer Section Styles (Ambient Background)
const FooterContainer = styled.footer`
  width: 100%;
  margin-top: 2rem;
  padding: 2rem 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.1));
  color: #213547; /* Darker color for text */
  text-align: center;
  border-top: 2px solid rgba(255, 255, 255, 0.2); /* Light border to add definition */
  border-radius: 8px 8px 0 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled.a`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 0.75rem;
  color: #213547; /* Dark color for the icons */
  transition: background 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
    color: #646cff; /* Add a hover effect to change the icon color */
  }

  svg {
    fill: currentColor; /* Ensure icon uses the color of the link */
  }
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #4a4a4a; /* Lighter dark color for footer text */
  margin-top: 1rem;
`;

function App() {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [historyActions, setHistoryActions] = useState({
    canUndo: false,
    canRedo: false,
    undo: null,
    redo: null,
  });

  const handleHistoryUpdate = useCallback((actions) => {
    setHistoryActions(actions);
  }, []);

  const handleClear = useCallback(() => {
    setClearCanvas(true);
  }, []);

  const handleSave = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "paint-artwork.png";
      link.href = image;
      link.click();
    }
  }, []);

  return (
    <AppContainer>
      <Header>
        <LeftSpacer />
        <Title>Aurora Atelier</Title>
        <AuthContainer>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </AuthContainer>
      </Header>

      <Toolbar
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        onClear={handleClear}
        onSave={handleSave}
        onUndo={historyActions.undo}
        onRedo={historyActions.redo}
        canUndo={historyActions.canUndo}
        canRedo={historyActions.canRedo}
      />
      <Canvas
        color={color}
        brushSize={brushSize}
        clearCanvas={clearCanvas}
        setClearCanvas={setClearCanvas}
        onHistoryUpdate={handleHistoryUpdate}
      />

      {/* Footer Section */}
      <FooterContainer>
        <h2>"Every brushstroke shapes a new reality."</h2>
        <p>Express your creativity, one stroke at a time.</p>

        {/* Social Links */}
        <SocialLinksContainer>
          <SocialLink href="https://github.com/binayakbartaula11" target="_blank">
            {/* GitHub Icon */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white">
              <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.797 8.207 11.387.6.11.82-.263.82-.585v-2.092c-3.338.727-4.035-1.642-4.035-1.642-.546-1.389-1.333-1.759-1.333-1.759-1.09-.746.084-.732.084-.732 1.204.084 1.833 1.234 1.833 1.234 1.07 1.832 2.808 1.302 3.493.996.107-.777.419-1.303.762-1.602-2.665-.302-5.467-1.333-5.467-5.93 0-1.31.467-2.379 1.232-3.221-.124-.302-.532-.942.117-1.937 0 0 1.009-.325 3.292 1.241 1.05-.294 2.188-.439 3.314-.445 1.13.006 2.258.151 3.309.445 2.29-1.57 3.29-1.241 3.29-1.241.654.996.242 1.635.118 1.937.765.843 1.232 1.912 1.232 3.221 0 4.604-2.803 5.628-5.481 5.924.431.37.815 1.1.815 2.22v3.307c0 .322.22.698.82.585 4.771-1.59 8.207-6.086 8.207-11.387 0-6.627-5.373-12-12-12z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://x.com/BartaulaBinayak" target="_blank">
            {/* Twitter Icon */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white">
              <path d="M23.495 4.039c-.883.391-1.833.655-2.834.774 1.02-.609 1.797-1.575 2.163-2.723-.953.564-2.006.975-3.137 1.196-.897-.957-2.181-1.551-3.598-1.551-2.718 0-4.915 2.208-4.915 4.933 0 .389.045.768.134 1.131-4.08-.203-7.689-2.14-10.107-5.086-.423.723-.666 1.558-.666 2.45 0 1.692.876 3.179 2.213 4.047-.815-.027-1.584-.245-2.259-.612-.001.019-.001.036-.001.054 0 2.366 1.681 4.346 3.916 4.792-.413.111-.851.171-1.288.171-.315 0-.623-.031-.924-.088.625 1.946 2.444 3.361 4.592 3.403-1.684 1.313-3.806 2.097-6.1 2.097-.396 0-.787-.023-1.173-.069 2.171 1.373 4.758 2.168 7.501 2.168 9.009 0 13.947-7.457 13.947-13.949 0-.213-.006-.426-.015-.638.959-.699 1.793-1.574 2.445-2.557z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/binayakbartaula/" target="_blank">
            {/* LinkedIn Icon */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white">
              <path d="M19.75 0h-15.5C3.462 0 2 1.462 2 3.25v17.5c0 1.788 1.462 3.25 3.25 3.25h14.5c1.788 0 3.25-1.462 3.25-3.25V3.25C24 1.462 22.538 0 20.75 0H3.25zM7.75 19.75H4.25v-9.5h3.5v9.5zm-1.75-10.75c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zM19.75 19.75h-3.5v-5.25c0-1.25-.895-2.25-2.25-2.25-1.347 0-2.25.996-2.25 2.25v5.25h-3.5v-9.5h3.5v1.25h.05c.55-.75 1.5-1.25 2.5-1.25 2.25 0 4.25 1.25 4.25 4.5v5.5z"/>
            </svg>
          </SocialLink>
          {/* Website Link */}
          <SocialLink href="https://binayakio.netlify.app" target="_blank">
  {/* Portfolio Website Icon */}
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-3.31 0-6-2.69-6-6h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6z"/>
  </svg>
</SocialLink>

        </SocialLinksContainer>

        <FooterText>© 2025 Aurora Atelier. All rights reserved.</FooterText>
      </FooterContainer>
    </AppContainer>
  );
}

export default App;
