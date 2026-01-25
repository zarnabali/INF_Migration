'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, Typography, Box, Divider } from '@mui/material';

interface BaseCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  noPadding?: boolean;
  elevation?: number;
}

export function BaseCard({
  title,
  subtitle,
  children,
  action,
  noPadding = false,
  elevation = 1,
}: BaseCardProps) {
  return (
    <Card elevation={elevation} sx={{ height: '100%' }}>
      {(title || action) && (
        <>
          <CardHeader
            title={
              title && (
                <Typography variant="h6" fontWeight={600}>
                  {title}
                </Typography>
              )
            }
            subheader={
              subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )
            }
            action={action}
            sx={{ pb: 0 }}
          />
          <Divider sx={{ mt: 2 }} />
        </>
      )}
      <CardContent sx={{ p: noPadding ? 0 : undefined }}>
        {children}
      </CardContent>
    </Card>
  );
}

