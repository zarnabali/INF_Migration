import { PublicLayout } from '@/components/layouts';
import { TopBanner, WordBanner, ProductsTabs, WhatsCovered, CallToAction } from '@/components/home';
import { Box } from '@mui/material';

export default function HomePage() {
  return (
    <PublicLayout>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(204, 232, 250, 0.3) 100%)',
        }}
      >
        <TopBanner />
        <WordBanner />
        <ProductsTabs />
        <WhatsCovered />
        <CallToAction />
      </Box>
    </PublicLayout>
  );
}
