import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'

interface QuickSearchToolbarProps {
  categoryFilter: string
  onCategoryChange: (event: SelectChangeEvent<string>) => void
}

const QuickSearchToolbar: React.FC<QuickSearchToolbarProps> = ({
  categoryFilter,
  onCategoryChange,
}) => {

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
      {/* <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="category-select-label">Categoría</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoryFilter}
          label="Categoría"
          onChange={onCategoryChange}

        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          <MenuItem value="Cuentas de propietarios">Cuentas de propietarios</MenuItem>
          <MenuItem value="categoria2">Categoría 2</MenuItem>
          <MenuItem value="categoria3">Categoría 3</MenuItem>
        </Select>
      </FormControl> */}

    </Box>
  )
}

export default QuickSearchToolbar
