import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import Navigation from './routes'
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007EA7',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          whiteSpace: 'nowrap',
          fontWeight: 300,
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
        },
        toolbar: {
          fontSize: '1.2rem',
        },
        select: {
          fontSize: '1.2rem',
        },
        selectIcon: {
          fontSize: '1.2rem',
        },
        actions: {
          fontSize: '1.2rem',
        },
        displayedRows: {
          fontSize: '1.2rem',
        },
        selectLabel: {
          fontSize: '1.2rem',
        },
        menuItem: {
          fontSize: '1.2rem',
        },
        input:{
          fontSize: '1.2rem',
        },
        selectRoot: {
          fontSize: '1.2rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          '@media (max-width: 600px)': {
            fontSize: '1rem',
          },
          whiteSpace: 'nowrap',
          fontWeight: 300,
        },
        startIcon: {
          fontSize: 'inherit',
          '& > *:first-of-type': {
            fontSize: 'inherit',
          },
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          whiteSpace: 'nowrap',
          fontWeight: 300,
        },
        input: {
          '&::placeholder': {
            fontSize: '1.4rem',
            opacity: 1,
          },
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          '&.Mui-focused': {
            fontSize: '1.2rem',
          },
        },
      },
    },
  },
});

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navigation />
        <ToastContainer />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
