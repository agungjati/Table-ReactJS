import { Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import * as dayjs from 'dayjs'

const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: false,
      valueGetter: (params) => {
        const name = params.row.name || {}
        return `${name.title} ${name.first} ${name.last}`
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200
    },
    {
      field: 'gender',
      headerName: 'Gender',
    },
    {
      field: 'registered',
      headerName: 'Registered Date',
      width: 200,
      valueGetter: (params) => {
        const registered = params.row.registered || {}
        return dayjs(registered.date).format('MMMM D, YYYY h:mm A')
      }
    }
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  
export const DataTable = (props) => {
    return (
        <Paper sx={{ p: 2, my: 2, height: 400 }} >
          <DataGrid
            getRowId={row => row.email}
            rows={props.data}
            columns={columns}
            pageSize={5}
            rowCount={100}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Paper>
    )
}