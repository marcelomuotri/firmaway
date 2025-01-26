import { Box, IconButton, InputAdornment } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'

const QuickSearchToolbar = () => {
  return (
    <Box
      sx={{
        marginBottom: 24,
      }}
    >
      <GridToolbarQuickFilter
        placeholder='Buscar'
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton sx={{ color: 'rgb(134, 134, 134)' }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          borderRadius: 2,
          padding: '8px 16px',
          border: '1px solid #EBEDEE',
          '& input': { fontSize: '16px', borderBottom: 'none' },
          '& .MuiInput-root': { borderBottom: 'none!important' },
          '& .MuiInput-root:hover': {
            borderBottom: 'none!important',
            borderBottomColor: 'transparent!important',
          },
          '& .MuiInput-underline:before': { borderBottom: 'none' },
          '& .MuiInput-underline:hover:before': {
            borderBottom: 'none!important',
          },
          '& .MuiInput-underline:after': { borderBottom: 'none' },
        }}
      />
    </Box>
  )
}

export default QuickSearchToolbar
