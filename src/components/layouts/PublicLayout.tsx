import { Header } from '@/components/layouts/header/Header';
import { Footer } from '@/components/layouts/footer/Footer';
import { Box } from '@mui/material';

interface PublicLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const PublicLayout = ({ children, showFooter = true }: PublicLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, paddingTop: '80px' }}>
        {children}
      </Box>
      {showFooter && <Footer />}
    </Box>
  );
};
