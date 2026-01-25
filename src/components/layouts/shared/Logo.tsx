import Link from 'next/link';
import Image from 'next/image';
import LogoDarkImg from '@/assets/images/logos/migration-blue.svg';
import LogoLightImg from '@/assets/images/logos/migration-white.svg';
import { Box } from '@mui/material';

export const LogoDark = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/">
                <Image
                    src={LogoDarkImg}
                    alt="INF Travel Insurance"
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '46px',
                        objectFit: 'contain'
                    }}
                    priority
                />
            </Link>
        </Box>
    );
};

export const LogoLight = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Link href="/">
                <Image
                    src={LogoLightImg}
                    alt="INF Travel Insurance"
                    style={{
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '46px',
                        objectFit: 'contain'
                    }}
                    priority
                />
            </Link>
        </Box>
    );
};
