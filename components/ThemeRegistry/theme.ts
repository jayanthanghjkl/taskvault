'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
    }
}

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Material Design 3 (M3) Inspired Theme
const theme = createTheme({
    cssVariables: true, // Enable CSS variables for easier customization
    palette: {
        mode: 'light',
        primary: {
            main: '#6750A4', // M3 Seed Purple
            light: '#EADDFF', // Primary Container
            dark: '#21005D', // On Primary Container
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#625B71',
            light: '#E8DEF8', // Secondary Container
            dark: '#1D192B', // On Secondary Container
            contrastText: '#FFFFFF',
        },
        tertiary: { // M3 has tertiary
            main: '#7D5260',
            light: '#FFD8E4',
            dark: '#31111D',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#B3261E',
            light: '#F9DEDC',
            dark: '#410E0B',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FEF7FF', // Surface
            paper: '#F3EDF7',   // Surface Container Low
        },
        text: {
            primary: '#1C1B1F',
            secondary: '#49454F',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: { fontSize: '57px', lineHeight: '64px', letterSpacing: '-0.25px', fontWeight: 400 },
        h2: { fontSize: '45px', lineHeight: '52px', letterSpacing: '0px', fontWeight: 400 },
        h3: { fontSize: '36px', lineHeight: '44px', letterSpacing: '0px', fontWeight: 400 },
        h4: { fontSize: '32px', lineHeight: '40px', letterSpacing: '0px', fontWeight: 400 },
        h5: { fontSize: '28px', lineHeight: '36px', letterSpacing: '0px', fontWeight: 400 },
        h6: { fontSize: '24px', lineHeight: '32px', letterSpacing: '0px', fontWeight: 400 },
        subtitle1: { fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px', fontWeight: 500 },
        subtitle2: { fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', fontWeight: 500 },
        body1: { fontSize: '16px', lineHeight: '24px', letterSpacing: '0.5px', fontWeight: 400 },
        body2: { fontSize: '14px', lineHeight: '20px', letterSpacing: '0.25px', fontWeight: 400 },
        button: { fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', fontWeight: 500, textTransform: 'none' },
        caption: { fontSize: '12px', lineHeight: '16px', letterSpacing: '0.4px', fontWeight: 400 },
        overline: { fontSize: '11px', lineHeight: '16px', letterSpacing: '0.5px', fontWeight: 500, textTransform: 'uppercase' },
    },
    shape: {
        borderRadius: 16, // Default larger radius for M3
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20, // Pill shape
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
                    },
                },
                contained: {
                    backgroundColor: '#6750A4',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: 'rgba(103, 80, 164, 0.92)',
                    },
                },
                outlined: {
                    borderColor: '#79747E',
                    color: '#6750A4',
                },
                text: {
                    color: '#6750A4',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: '#F3EDF7', // Surface Container Low
                    boxShadow: 'none', // Outlined or filled usually
                    border: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                rounded: {
                    borderRadius: 12,
                },
                elevation0: {
                    backgroundColor: '#F3EDF7', // Surface Container
                },
                elevation1: {
                    backgroundColor: '#F7F2FA', // Surface Container High
                    boxShadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)', // Elevation 1
                }
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F3EDF7', // Surface Container
                    color: '#1C1B1F', // On Surface
                    boxShadow: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                    },
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    borderRadius: 16, // M3 FAB is squrcle
                    backgroundColor: '#EADDFF', // Primary Container
                    color: '#21005D', // On Primary Container
                    boxShadow: '0px 4px 8px 3px rgba(0,0,0,0.15)',
                    '&:hover': {
                        backgroundColor: 'rgba(234, 221, 255, 0.92)',
                    }
                }
            }
        }
    },
});

// Extend theme types to include tertiary if needed in TS, but for JS runtime it works.
// module augmentation in d.ts files would be proper for TS projects using custom palette keys.

export default theme;
