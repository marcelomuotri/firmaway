import React, { useState, useCallback } from 'react'
import {
  DataGrid,
  GridCellModesModel,
  GridCellParams,
  GridCellModes,
} from '@mui/x-data-grid'
import { Box, Fade, TextField } from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import UnfoldMore from '@mui/icons-material/UnfoldMore'; // Ícono siempre visible
import QuickSearchToolbar from '../QuickSearchToolBar';

/**
 * Componente reutilizable para DataGrid con edición en un solo click.
 *
 * Props más importantes:
 * - rows: array con tus filas
 * - columns: array con tus columnas
 * - ...props: cualquier otra prop que quieras pasar al DataGrid (ej: disableRowSelectionOnClick, etc.)
 */
export default function SingleClickDataGrid({
  rows,
  columns,
  handleProcessRowUpdate,
  ...props
}: any) {
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({})
  const [categoryFilter, setCategoryFilter] = useState<string>('')

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategoryFilter(event.target.value as string)
  }

  const filteredRows = categoryFilter
    ? rows.filter((row: any) => row.tag_name === categoryFilter)
    : rows

  // Maneja el click en la celda y la pasa a modo edición si es editable.
  const handleCellClick = useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      if (!params.isEditable) return

      // Evita clicks que no sean en la celda misma (por ejemplo, un portal)
      if (
        (event.target as any).nodeType === 1 &&
        !event.currentTarget.contains(event.target as Element)
      ) {
        return
      }

      setCellModesModel((prevModel) => {
        // Pone todas las celdas en modo "view"
        const newModel: GridCellModesModel = Object.keys(prevModel).reduce(
          (acc, rowId) => ({
            ...acc,
            [rowId]: Object.keys(prevModel[rowId]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        )

        // Activa el modo "edit" en la celda clickeada
        newModel[params.id as string] = {
          ...(newModel[params.id as string] || {}),
          [params.field]: { mode: GridCellModes.Edit },
        }

        return newModel
      })
    },
    []
  )

  // Se actualiza el state si cambia el cellModesModel
  const handleCellModesModelChange = useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel)
    },
    []
  )

  return (
    <Fade in={true} timeout={1500}>
      <Box>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          cellModesModel={cellModesModel}
          onCellModesModelChange={handleCellModesModelChange}
          onCellClick={handleCellClick}
          sx={{
            // Quita el outline al enfocar cualquier celda
            '& .MuiDataGrid-cell:focus': {
              outline: 'none !important',
            },
            // Si quieres también quitarlo cuando se edita la celda:
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
            '& .MuiDataGrid-iconButtonContainer .MuiSvgIcon-root': {
              color: 'lightgray !important', // Cambia el color del icono
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            '& .MuiDataGrid-iconButtonContainer': {
              visibility: 'visible !important', // Hace que el icono de orden siempre esté visible
              width: 28,
            },
            '& .MuiDataGrid-sortIcon': {
              opacity: '1 !important', // Hace que el ícono siempre sea visible
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: "none"
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableExportButton
          slots={{
            toolbar: () => (
              <QuickSearchToolbar
                categoryFilter={categoryFilter}
                onCategoryChange={handleCategoryChange}
              />
            ),
            columnHeaderSortIcon: (props) => {
              return (<Box display="flex" alignItems="center">
                {props.direction === 'asc' ? <ExpandMore sx={{ color: "lightgray" }} />
                  : props.direction === 'desc' ? <ExpandLess sx={{ color: "lightgray" }} />
                    : <UnfoldMore sx={{ color: "lightgray" }} />}
              </Box>)
            },
          }}
          slotProps={{
            pagination: {
              labelRowsPerPage: 'Mostrar',
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
            },
          }}

          // Start of Selection
          // Removed filterModel as it was not visible
          //processRowUpdate={handleProcessRowUpdate}
          //editMode='cell'
          disableColumnMenu
          disableRowSelectionOnClick
          {...props} // Deja pasar props extra
        />
      </Box>
    </Fade>
  )
}
