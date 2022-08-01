import React, { useState, useEffect } from 'react';
import { ThemeProvider, Typography } from '@mui/material';

import client, { events } from '@urturn/client';
import theme from './theme';

function App() {
  const [boardGame, setBoardGame] = useState(client.getBoardGame() || {});
  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setBoardGame(newBoardGame);
    };
    events.on('stateChanged', onStateChanged);
    return () => {
      events.off('stateChanged', onStateChanged);
    };
  }, []);

  console.log('boardGame:', boardGame);

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        TODO: Display your game here
      </Typography>
    </ThemeProvider>
  );
}

export default App;
