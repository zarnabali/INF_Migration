'use client';

import { useState, useEffect } from 'react';
import { Snackbar, Button, Box, Typography } from '@mui/material';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          maxWidth: '600px',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 3,
        },
      }}
      message={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
          <Typography variant="body2">
            We use cookies to enhance your browsing experience, serve personalized content, and
            analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="outlined" size="small" onClick={handleDecline}>
              Decline
            </Button>
            <Button variant="contained" size="small" onClick={handleAccept}>
              Accept
            </Button>
          </Box>
        </Box>
      }
    />
  );
}

