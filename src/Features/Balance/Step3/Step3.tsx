import { Box, CircularProgress, Fade, LinearProgress, TextField, Typography } from '@mui/material'
import { useStyles } from './step3.styles'
import Table from '../../../components/Table/Table'
import StepTitle from '../../../components/StepTitle'
import { useEffect } from 'react'
import QuickSearchToolbar from '../../../components/QuickSearchToolBar'
import CustomSelectCell from '../../../components/CustomSelectCell'
import Balancito from '../../../assets/balancitoChar.png'

const Step3 = ({
  transactions,
  isGenerateAiLoading,
  tags,
  tableDatastep3,
  setTableDataStep3,
}: any) => {
  useEffect(() => {
    setTableDataStep3(transactions)
  }, [transactions])

  console.log(transactions)

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
      valueFormatter: (params) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'counterparty_name',
      headerName: 'Negocio',
      width: 250,
    },
    {
      field: 'amount',
      headerName: 'Monto',
      valueFormatter: (params) => {
        // Mantenlo en número internamente y formatea la salida
        const val = Number(params) || 0
        return `$ ${val.toFixed(2)}`
      },
      width: 150,
    },
    {
      field: 'tag_name',
      headerName: 'Categoría',
      width: 220,
      flex: 0.8,
      renderCell: (params) => (
        <CustomSelectCell
          // Start of Selection
          params={params}
          options={tags.filter(tag => tag.id !== 1).map(tag => tag.tag_name)} // 👈 Excluye el tag con id=1
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
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>
              <CircularProgress />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <img style={{ width: 12, height: 19 }} src={Balancito} alt="Balancito" />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40%',
                flexDirection: 'column',
                maxWidth: 436,
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 600,
                  lineHeight: '26px',
                }}
              >
                Balancito está haciendo su magia...
              </Typography>
              {/* <LinearProgress sx={{ width: '100%', borderRadius: 12 }} />  */}
              <Typography
                sx={{
                  lineHeight: '22px',
                  marginBottom: 16,
                  color: '#7C7C7C',
                  marginTop: 8,
                }}
              >
                Podría demorar hasta 5 minutos.
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
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: '26px',
                marginBottom: 4,
              }}
            >
              Revisión Final
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '18px',
                marginBottom: 16,
                color: '#6F757B',
              }}
            >
              Últimos ajustes
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                marginBottom: 24,
                lineHeight: '22px',
              }}
            >
              Revisa y clasifica correctamente todas las transacciones{' '}
              <strong>({transactions?.length} en total)</strong>. Si es
              necesario, ajusta la categoría o edita la descripción. Usa la
              paginación para navegar entre ellas y, cuando todo esté listo,
              presiona 'Continuar' para exportar tu balance contable.
            </Typography>
            <Table
              rows={tableDatastep3}
              columns={columns}
            //hideFooterPagination


            />
          </Box>
        )}
      </Box>
    </Fade>
  )
}

export default Step3
