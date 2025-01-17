import { Components, Theme } from '@mui/material'
import { theme } from './theme'

export const appComponents: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        '&::-webkit-scrollbar, *::-webkit-scrollbar': {
          width: 18,
          height: 14,
          backgroundColor: theme.palette.common.white,
        },

        '&::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb': {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.action.disabled,
          border: '5px solid transparent',
          backgroundClip: 'padding-box',
        },
        '&::-webkit-scrollbar-thumb:focus, *::-webkit-scrollbar-thumb:focus': {
          backgroundColor: theme.palette.common.greyE6,
        },
        '&::-webkit-scrollbar-thumb:active, *::-webkit-scrollbar-thumb:active':
          {
            backgroundColor: theme.palette.common.greyE6,
          },
        '&::-webkit-scrollbar-thumb:hover, *::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.common.greyE6,
        },
      },
    },
  },
  MuiLink: {
    defaultProps: {
      color: theme.palette.text.secondary,
      fontWeight: 600,
    },
    styleOverrides: {
      root: {
        cursor: 'pointer',
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1Regular: 'h1',
        h1SemiBold: 'h1',
        h1ExtraBold: 'h1',
        titleRegular: 'h2',
        titleSemiBold: 'h2',
        titleExtraBold: 'h2',
        bodyRegular: 'p',
        bodySemiBold: 'p',
        bodyExtraBold: 'p',
      },
    },
    styleOverrides: {
      root: {
        fontSize: '14px', // Establece el tamaño de fuente aquí
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        boxShadow: 'none',
        ':active': {
          boxShadow: 'none',
        },
        ':hover': {
          boxShadow: 'none',
        },
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.divider,
        borderRadius: 2,
        ':after': {
          animation: 'animation-wiooy9 1.6s linear 0.5s infinite',
          background: `linear-gradient( 90deg, transparent, ${theme.palette.common.greyE6}, transparent )`,
        },
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        '@media (min-width: 600px)': {
          minHeight: 34 /* También asegúrate de manejar el media query */,
        },
      },
    },
  },
  // MuiListItemButton: {
  //   styleOverrides: {
  //     root: {
  //         borderRadius: 4,
  //         '&.Mui-selected': {
  //           backgroundColor: '#F7F7F7',
  //           '&:hover': {
  //             backgroundColor: '#F7F7F7',
  //           },
  //         },
  //     },
  //   },
  // },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        height: 40,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      virtualScroller: {
        borderRadius: theme.shape.borderRadius,
      },
      columnHeaderRow: {
        backgroundColor: '#EFEFEF!important',
        color: theme.palette.common.black,
        fontWeight: 500,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        color: theme.palette.text.primary,
      },
    },
  },
}
