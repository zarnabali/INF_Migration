import { Box } from '@mui/material';

interface BlankLayoutProps {
  children: React.ReactNode;
}

export const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
    </Box>
  );
};
