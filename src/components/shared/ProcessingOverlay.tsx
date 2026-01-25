'use client';

import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';

interface ProcessingOverlayProps {
  open: boolean;
  message?: string;
}

export function ProcessingOverlay({ open, message = 'Processing...' }: ProcessingOverlayProps) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      open={open}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" size={48} />
        <Typography variant="h6">{message}</Typography>
      </Box>
    </Backdrop>
  );
}

