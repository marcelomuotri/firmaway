import { Box, Fade, LinearProgress, TextField, Typography } from '@mui/material'
import { useStyles } from './step3.styles'
import Table from '../../../components/Table/Table'
import StepTitle from '../../../components/StepTitle'
import { useEffect } from 'react'
import QuickSearchToolbar from '../../../components/QuickSearchToolBar'
import CustomSelectCell from '../../../components/CustomSelectCell'

const Step3 = ({
  transactions,
  isGenerateAiLoading,
  tags,
  tableDatastep3,
  setTableDataStep3,
}: any) => {
  console.log(tags)
  useEffect(() => {
    setTableDataStep3(transactions)
  }, [transactions])

  const handleSelectChange = (rowId, newTagName) => {
    const selectedTag = tags.find((tag) => tag.tag_name === newTagName)

    setTableDataStep3((prevData) =>
      prevData.map((row) =>
        row.id === rowId
          ? {
              ...row,
              tag_name: newTagName,
              tag_id: selectedTag ? selectedTag.id : null, // 🔹 Guardamos también el tag_id
            }
          : row
      )
    )
  }

  const handleDescriptionChange = (params, newDescription) => {
    params.api.setEditCellValue({
      id: params.id,
      field: params.field,
      value: newDescription,
    })

    setTableDataStep3((prevData) =>
      prevData.map((row) =>
        row.id === params.id ? { ...row, description: newDescription } : row
      )
    )
  }

  const columns = [
    {
      field: 'created_at',
      headerName: 'Fecha',
      width: 150,
      valueGetter: (params) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'counterparty_name',
      headerName: 'Negocio',
      width: 250,
    },
    {
      field: 'amount',
      headerName: 'Monto',
      valueGetter: (params) => params.toFixed(2),
      width: 150,
    },
    {
      field: 'tag_name',
      headerName: 'Categoría',
      width: 220,
      flex: 0.8,
      renderCell: (params) => (
        <CustomSelectCell
          params={params}
          options={tags.slice(1).map((tag) => tag.tag_name)} // 👈 Excluye el primer tag
          onSelectChange={handleSelectChange}
        />
      ),
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 1,
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: '100%',
              height: 20,
              border: '1px solid #DFE5E9',
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              cursor: 'text',
              backgroundColor: 'white',
            }}
            onClick={() =>
              params.api.startCellEditMode({
                id: params.id,
                field: params.field,
              })
            } // 👈 Hace que sea editable en un solo clic
          >
            {params.value}
          </div>
        )
      },
      renderEditCell: (params) => (
        <TextField
          sx={{
            height: 20,
            border: '1px solid #DFE5E9',
            padding: '8px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            cursor: 'text',
            backgroundColor: 'white',
          }}
          variant='outlined'
          fullWidth
          autoFocus
          value={params.value || ''}
          onChange={(e) => handleDescriptionChange(params, e.target.value)}
        />
      ),
    },
  ]
  const { classes: styles } = useStyles()
  return (
    <Fade in={true} timeout={500}>
      <Box className={styles.step3Container}>
        {isGenerateAiLoading ? (
          <Box
            sx={{
              width: '100%',
              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
                flexDirection: 'column',
                maxWidth: 436,
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 600,
                  lineHeight: '26px',
                  marginBottom: 16,
                }}
              >
                Balancito está haciendo su magia...
              </Typography>
              <LinearProgress sx={{ width: '100%', borderRadius: 12 }} />
              <Typography
                sx={{
                  lineHeight: '22px',
                  marginBottom: 16,
                  color: '#7C7C7C',
                  marginTop: 8,
                }}
              >
                Solo tomará unos segundos.
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: '22px',
                  textAlign: 'center',
                }}
              >
                "La paciencia es la fortaleza del débil y la impaciencia, la
                debilidad del fuerte." – Immanuel Kant
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box className={styles.step3Content}>
            <StepTitle
              title={'Revisión Final'}
              subTitle={'Ultimos ajustes'}
              textKey={
                'Asegúrate de que todas las transacciones estén clasificadas correctamente. Si es necesario, ajusta la categoría y edita la descripción. Cuando todo esté listo, presiona continuar para exportar tu balance contable.'
              }
            />
            <Table
              rows={tableDatastep3}
              columns={columns}
              disableRowSelectionOnClick
              //hideFooterPagination

              disableColumnMenu
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
                pagination: {
                  labelRowsPerPage: 'Mostrar',
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
                },
              }}
              slots={{ toolbar: QuickSearchToolbar }}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              disableExportButton
            />
          </Box>
        )}
      </Box>
    </Fade>
  )
}

export default Step3
