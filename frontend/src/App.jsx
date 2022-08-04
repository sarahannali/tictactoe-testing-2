import React, { useState, useEffect } from 'react';
import { ThemeProvider, Typography, Stack, Box } from '@mui/material';

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

  const {
    state: {
      board
    } = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]
    }
  } = boardGame;

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Stack margin={2} spacing={1} direction="row" justifyContent="center">
          <Box>
            {board.map((row, rowNum) => (
              <Stack key={rowNum} direction="row">
                {row.map((val, colNum) => (
                  <Stack
                    key={colNum}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      border: 1,
                      borderColor: 'text.primary',
                      height: '100px',
                      width: '100px',
                    }}
                    onClick={async (event) => {
                      event.preventDefault();
                      const move = { x: rowNum, y: colNum };
                      await client.makeMove(move);
                    }}
                  >
                    <Typography color="text.primary" fontSize="60px">
                      {val}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            ))}
          </Box>
        </Stack>
      </Typography>
    </ThemeProvider>
  );
}

export default App;