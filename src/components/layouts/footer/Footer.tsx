'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container, Grid, Box, Typography, Divider, styled } from '@mui/material';
import { LogoLight } from '@/components/layouts/shared/Logo';
import ArrkLogo from '@/assets/images/logos/arrk-standard-light.svg';

const FooterLink = styled(Link)(({ theme }) => ({
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 400,
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    display: 'block',
    marginBottom: '8px',
    '&:hover': {
        color: '#fae2d4',
        textShadow: '0 0 8px rgba(250, 226, 212, 0.3)',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        textAlign: 'center',
        marginBottom: '4px',
    }
}));

const LegalText = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 300,
    lineHeight: 1.5,
    color: 'white',
    textAlign: 'center',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
        lineHeight: 1.4,
    }
}));

export const Footer = () => {
    return (
        <Box sx={{ overflow: 'hidden', pt: { xs: 0, sm: 0 }, pb: 4 }}>
            <Container className="max-width-1400">
                <Box
                    sx={{
                        backgroundColor: '#0078fc',
                        borderRadius: '10px',
                        py: 4,
                        color: 'white'
                    }}
                >
                    <Container sx={{ py: 2 }}>
                        <Grid container spacing={2}>
                            {/* Column 1 */}
                            <Grid item xs={6} sm={6} lg={4} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <FooterLink href="/programs/single-trip">Single Trip Plan</FooterLink>
                                    <FooterLink href="/programs/annual-individual">Annual Plan</FooterLink>
                                    <FooterLink href="/programs/annual-group">Annual Group Plan</FooterLink>
                                    <FooterLink href="/locate-coverage">Manage Coverage</FooterLink>
                                    <FooterLink href="/about">About Us</FooterLink>
                                </Box>
                            </Grid>

                            {/* Column 2 */}
                            <Grid item xs={6} sm={6} lg={4} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: { xs: 'center', sm: 'flex-start' } }}>
                                    <FooterLink href="/contact">Contact Us</FooterLink>
                                    <FooterLink href="/legal/privacy-policy">Privacy Policy</FooterLink>
                                    <FooterLink href="/legal/terms-of-use">Terms of Service</FooterLink>
                                    <FooterLink href="/legal/electronic-consent">Electronic Consent</FooterLink>
                                    <FooterLink href="/legal/disclosures">Additional Disclosures</FooterLink>
                                </Box>
                            </Grid>

                            {/* Column 3 - Empty on desktop but maintains layout */}
                            <Grid item xs={12} lg={4} sx={{ display: { xs: 'none', lg: 'flex' } }}>
                            </Grid>
                        </Grid>

                        <Divider sx={{ opacity: 0.5, my: 3, borderColor: 'white' }} />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                                <LogoLight />
                            </Grid>
                            <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-end' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                                    <Typography sx={{ color: 'white', fontSize: '15px', display: 'flex', alignItems: 'center', m: 0 }}>
                                        <span style={{ opacity: 0.5 }}>Powered by</span>
                                        <a
                                            href="https://arrk.io/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px', paddingBottom: '4px' }}
                                            aria-label="Visit ARRK website"
                                        >
                                            <Image src={ArrkLogo} alt="ARRK LLC" style={{ height: '24px', width: 'auto' }} />
                                        </a>
                                    </Typography>
                                    <Box component="span" sx={{ color: 'white', opacity: 0.3, mx: 1, display: { xs: 'none', sm: 'inline' } }}>|</Box>
                                    <Link
                                        href="/auth/login"
                                        style={{
                                            color: 'white',
                                            fontSize: '12px',
                                            opacity: 0.6,
                                            textDecoration: 'none',
                                            transition: 'opacity 0.2s'
                                        }}
                                        className="hover:opacity-100"
                                    >
                                        Partner Portal
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, px: { xs: 1, sm: 2 } }}>
                            <LegalText>
                                Migration is a dba of ARRK, LLC, a limited liability company organized under the
                                laws of Delaware in partnership with Cavanaugh Insurance, a licensed insurance
                                producer in all states (NPN 8671833). Chubb is the marketing name used to refer to
                                subsidiaries of Chubb Limited providing insurance and related services.
                            </LegalText>
                            <LegalText sx={{ mb: 0 }}>
                                This information is a brief description of the features of the available plans.
                                All products may not be available in all states. This communication contains
                                product summaries only. Coverage & pricing is subject to the language of the
                                policies as actually issued and may vary by state. Coverage is being marketed by
                                Migration located at 2624 N Division Street, Spokane Washington 99207. Insurance
                                products and services are provided by a licensed producer, and not by the parent
                                company itself.
                            </LegalText>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </Box>
    );
};
