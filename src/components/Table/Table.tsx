import React, { useState, useCallback } from 'react'
import {
  DataGrid,
  GridCellModesModel,
  GridCellParams,
  GridCellModes,
} from '@mui/x-data-grid'
import { Box, Fade } from '@mui/material'

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
          rows={rows}
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
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          slotProps={{
            pagination: {
              labelRowsPerPage: 'Mostrar',
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
            },
          }}
          //processRowUpdate={handleProcessRowUpdate}
          //editMode='cell'
          {...props} // Deja pasar props extra
        />
      </Box>
    </Fade>
  )
}
