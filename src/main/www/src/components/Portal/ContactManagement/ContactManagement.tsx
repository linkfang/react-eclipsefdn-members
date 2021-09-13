import { Button, createStyles, makeStyles, Typography } from '@material-ui/core';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { borderRadiusSize, brightOrange, iconGray } from '../../../Constants/Constants';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyle = makeStyles(() =>
  createStyles({
    headerIcon: {
      fontSize: 80,
      color: iconGray,
      borderBottom: `6px ${brightOrange} solid`,
    },
    pageTitle: {
      marginBottom: 40,
      marginTop: 5,
    },
    tableIcon: {
      fontSize: 50,
      color: iconGray,
    },
    contactFilterText: {
      backgroundColor: brightOrange,
      color: 'white',
      padding: '10px',
      borderRadius: borderRadiusSize,
    },
    table: { height: 420, width: '100%' },
    addContactIcon: {
      marginTop: 40,
      marginBottom: 10,
      fontSize: 50,
      color: iconGray,
      borderBottom: `3px ${brightOrange} solid`,
    },
  })
);

const rows = [
  {
    id: 1,
    email: 'lorem1@demo.com',
    role: 'Developer',
    name: 'Jon Snow',
    requestRemove: '',
  },
  {
    id: 2,
    email: 'lorem2@demo.com',
    role: 'Human Resource',
    name: 'Cersei Lannister',
    requestRemove: '',
  },
  {
    id: 3,
    email: 'lorem3@demo.com',
    role: 'Marketing',
    name: 'Jaime Lannister',
    requestRemove: '',
  },
  {
    id: 4,
    email: 'lorem4@demo.com',
    role: 'Manager',
    name: 'Arya Stark',
    requestRemove: '',
  },
  {
    id: 5,
    email: 'lorem5@demo.com',
    role: 'Sales',
    name: 'Daenerys Targaryen',
    requestRemove: '',
  },
  {
    id: 6,
    email: 'lorem6@demo.com',
    role: 'Customer Serivce',
    name: 'Hellen Melisandre',
    requestRemove: '',
  },
  {
    id: 7,
    email: 'lorem7@demo.com',
    role: 'Designer',
    name: 'Ferrara Clifford',
    requestRemove: '',
  },
  {
    id: 8,
    email: 'lorem8@demo.com',
    role: 'Tester',
    name: 'Rossini Frances',
    requestRemove: '',
  },
  {
    id: 9,
    email: 'lorem9@demo.com',
    role: 'Director',
    name: 'Harvey Roxie',
    requestRemove: '',
  },
];

export default function ContactManagement() {
  const classes = useStyle();
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role(s)',
      minWidth: 200,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <div
          onClick={() => console.log('editing: ', params.row)}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          {params.value} <EditIcon style={{ color: iconGray, marginLeft: 10 }} />
        </div>
      ),
    },
    {
      field: 'requestRemove',
      headerName: ' ',
      width: 220,
      renderCell: (params: GridRenderCellParams) => (
        <Button style={{ backgroundColor: '#EBEBEB' }} onClick={() => console.log('requsting removing: ', params.row)}>
          Request Removal From Org
        </Button>
      ),
    },
  ];
  return (
    <>
      <RecentActorsIcon className={classes.headerIcon} />
      <Typography className={classes.pageTitle} variant="h4">
        Contact Management
      </Typography>

      <RecentActorsIcon className={classes.tableIcon} />
      <Typography variant="body1" className={classes.contactFilterText}>
        Contacts
      </Typography>
      <div className={classes.table}>
        <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[5, 10, 100]} disableSelectionOnClick />
      </div>

      <PersonAddIcon className={classes.addContactIcon} />
      <p>
        * If you believe a contact is missing from the list, please contact the individual directly and have them update
        their Eclipse.org account to indicate they are a contact of your company. <br /> Once done, their contact record
        will appear in the list.
      </p>
    </>
  );
}
