import { createStyles, makeStyles, TextField, Typography } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import Input from '../../UIComponents/Inputs/Input';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { borderRadiusSize, brightOrange, iconGray } from '../../../Constants/Constants';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyle = makeStyles(() =>
  createStyles({
    pageTitle: {
      marginBottom: 40,
    },
    textField: {
      marginBottom: 14,
      marginTop: 6,
      '& > div': {
        backgroundColor: '#f9f9f9',
      },
    },
    helperText: {
      fontWeight: 600,
    },
    tableIcon: {
      fontSize: 50,
      color: iconGray,
      marginTop: 40,
    },
    contactFilterText: {
      backgroundColor: brightOrange,
      color: 'white',
      padding: '10px',
      borderRadius: borderRadiusSize,
    },
  })
);

const columns: GridColDef[] = [
  { field: 'person', headerName: 'Person', width: 150 },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 134,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 134,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 110,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
  },
  {
    field: 'relation',
    headerName: 'Relation',
    width: 150,
  },
  {
    field: 'wgComponents',
    headerName: 'WG Components',
    width: 170,
  },
  {
    field: 'moreInfo',
    headerName: 'More Info',
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    person: 'Person 1',
    email: 'lorem1@demo.com',
    phone: '1001005678',
    relation: 'Relation 1',
    wgComponents: 'Component 1',
    moreInfo: 'More 1',
    title: 'Developer',
    lastName: 'Snow',
    firstName: 'Jon',
    age: 35,
  },
  {
    id: 2,
    person: 'Person 2',
    email: 'lorem2@demo.com',
    phone: '1002005678',
    relation: 'Relation 2',
    wgComponents: 'Component 2',
    moreInfo: 'More 2',
    title: 'Human Resource',
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
  },
  {
    id: 3,
    person: 'Person 3',
    email: 'lorem3@demo.com',
    phone: '1003005678',
    relation: 'Relation 3',
    wgComponents: 'Component 3',
    moreInfo: 'More 3',
    title: 'Marketing',
    lastName: 'Lannister',
    firstName: 'Jaime',
    age: 45,
  },
  {
    id: 4,
    person: 'Person 4',
    email: 'lorem4@demo.com',
    phone: '1004005678',
    relation: 'Relation 4',
    wgComponents: 'Component 4',
    moreInfo: 'More 4',
    title: 'Manager',
    lastName: 'Stark',
    firstName: 'Arya',
    age: 16,
  },
  {
    id: 5,
    person: 'Person 5',
    email: 'lorem5@demo.com',
    phone: '1005005678',
    relation: 'Relation 5',
    wgComponents: 'Component 5',
    moreInfo: 'More 5',
    title: 'Sales',
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    age: null,
  },
  {
    id: 6,
    person: 'Person 6',
    email: 'lorem6@demo.com',
    phone: '1006005678',
    relation: 'Relation 6',
    wgComponents: 'Component 6',
    moreInfo: 'More 6',
    title: 'Customer Serivce',
    lastName: 'Melisandre',
    firstName: 'Hellen',
    age: 150,
  },
  {
    id: 7,
    person: 'Person 7',
    email: 'lorem7@demo.com',
    phone: '1007005678',
    relation: 'Relation 7',
    wgComponents: 'Component 7',
    moreInfo: 'More 7',
    title: 'Designer',
    lastName: 'Clifford',
    firstName: 'Ferrara',
    age: 44,
  },
  {
    id: 8,
    person: 'Person 8',
    email: 'lorem8@demo.com',
    phone: '1008005678',
    relation: 'Relation 8',
    wgComponents: 'Component 8',
    moreInfo: 'More 8',
    title: 'Tester',
    lastName: 'Frances',
    firstName: 'Rossini',
    age: 36,
  },
  {
    id: 9,
    person: 'Person 9',
    email: 'lorem9@demo.com',
    phone: '1009005678',
    relation: 'Relation 9',
    wgComponents: 'Component 9',
    moreInfo: 'More 9',
    title: 'Director',
    lastName: 'Roxie',
    firstName: 'Harvey',
    age: 65,
  },
];

const allPersons = [
  'Jon Snow',
  'Cersei Lannister',
  'Jaime Lannister',
  'Arya Stark',
  'Daenerys Targaryen',
  'Hellen Melisandre',
  'Ferrara Clifford',
  'Rossini Frances',
  'Harvey Roxie',
];

export default function ContactManagement() {
  const classes = useStyle();
  return (
    <>
      <Typography className={classes.pageTitle} variant="h4">
        Contact Management
      </Typography>

      <Autocomplete
        options={allPersons}
        fullWidth={true}
        freeSolo={true}
        openOnFocus={true}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="Contact"
              placeholder="Search People..."
              variant="outlined"
              size="small"
              className={classes.textField}
            />
          );
        }}
      />

      <div className="row">
        <div className="col-md-12">
          <Input name="title" labelName="Title" requiredMark={true} backgroundColor="#f9f9f9" />
          <Input name="type" labelName="Type" requiredMark={true} backgroundColor="#f9f9f9" />
          <Input name="workingGroup" labelName="Working Group" backgroundColor="#f9f9f9" />
          <Typography className={classes.helperText} variant="body1">
            Contacts must exist in the People database before being associated to an organization.
          </Typography>
        </div>
        <div className="col-md-12">
          <Input
            name="comments"
            labelName="Comments"
            multiline={true}
            rows={8}
            backgroundColor="#f9f9f9"
            height="153px"
          />
          <Typography className={classes.helperText} variant="body1">
            Add Comment...
          </Typography>
        </div>
      </div>
      <RecentActorsIcon className={classes.tableIcon} />
      <Typography variant="body1" className={classes.contactFilterText}>
        Contact - Filtered
      </Typography>
      <div style={{ height: 388, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 10, 100]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
