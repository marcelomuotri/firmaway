import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'
import { getTagIcon } from './CustomSelectCell'

interface QuickSearchToolbarProps {
  categoryFilter: string
  onCategoryChange: (event: SelectChangeEvent<string>) => void
  categories: string[]
}

const QuickSearchToolbar: React.FC<QuickSearchToolbarProps> = ({
  categoryFilter,
  onCategoryChange,
  categories,
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
      <FormControl sx={{ minWidth: 280, marginLeft: 20, border: '1px solid #EBEDEE', borderRadius: "24px!important", maxHeight: "49px" }}>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoryFilter}
          onChange={onCategoryChange}
          displayEmpty
          sx={{
            maxHeight: "49px",
            borderRadius: "24px!important",
            paddingLeft: "8px!important",
          }}
        >
          <MenuItem value="" >
            Todas
          </MenuItem>
          {categories.map((category: string) => (
            <MenuItem key={category} value={category}>
              {getTagIcon(category) + ' ' + category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default QuickSearchToolbar


