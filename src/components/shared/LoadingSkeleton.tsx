'use client';

import { Skeleton, Box, Card, CardContent } from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'card' | 'table' | 'form' | 'dashboard';
  count?: number;
}

export function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
  const renderCard = () => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" height={24} />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" height={100} />
        </Box>
      </CardContent>
    </Card>
  );

  const renderTable = () => (
    <Box>
      <Skeleton variant="rectangular" height={56} sx={{ mb: 1 }} />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={52} sx={{ mb: 0.5 }} />
      ))}
    </Box>
  );

  const renderForm = () => (
    <Box>
      {Array.from({ length: 4 }).map((_, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Skeleton variant="text" width="30%" height={24} />
          <Skeleton variant="rectangular" height={56} />
        </Box>
      ))}
      <Skeleton variant="rectangular" width="30%" height={42} sx={{ mt: 2 }} />
    </Box>
  );

  const renderDashboard = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent>
            <Skeleton variant="text" width="50%" height={24} />
            <Skeleton variant="text" width="70%" height={48} />
            <Skeleton variant="text" width="40%" height={20} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderContent = () => {
    switch (variant) {
      case 'table':
        return renderTable();
      case 'form':
        return renderForm();
      case 'dashboard':
        return renderDashboard();
      case 'card':
      default:
        return Array.from({ length: count }).map((_, i) => (
          <Box key={i}>{renderCard()}</Box>
        ));
    }
  };

  return <>{renderContent()}</>;
}

