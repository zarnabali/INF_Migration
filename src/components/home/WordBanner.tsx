'use client';

import { Box, Container, Typography } from '@mui/material';

// Data matching Vue.js TwoLinerPlanSection
const twoLiner = {
  topline: 'Every Trip Has A Story.',
  bottomline: 'We Have A Plan For Them All.',
};

export function WordBanner() {
  return (
    <Box 
      className="template position-relative overflow-hidden"
      sx={{ 
        py: { xs: 4, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: '1000px !important',
        }}
      >
        <Typography
          variant="h3"
          className="display-1 text-56"
          sx={{
            fontSize: { xs: '32px', sm: '42px', md: '56px' },
            lineHeight: 1.2,
            fontWeight: 400, // font-weight-regular
            textAlign: 'center',
            py: 0.5,
            color: '#005047', // Dark green from Vue.js _override.scss
            fontFamily: "'Givonic', sans-serif",
          }}
        >
          {twoLiner.topline}
        </Typography>
        <Typography
          variant="h3"
          className="display-1 text-56"
          sx={{
            fontSize: { xs: '32px', sm: '42px', md: '56px' },
            lineHeight: 1.2,
            fontWeight: 400,
            textAlign: 'center',
            py: 0.5,
            color: '#005047', // Dark green from Vue.js _override.scss
            fontFamily: "'Givonic', sans-serif",
          }}
        >
          {twoLiner.bottomline}
        </Typography>
      </Container>
    </Box>
  );
}
