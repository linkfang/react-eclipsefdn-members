import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from '@material-ui/core';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { borderRadiusSize, brightOrange, iconGray, REMOVE_REASONS } from '../../../Constants/Constants';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useState } from 'react';
import Input from '../../UIComponents/Inputs/Input';
import ModalWindow from '../../UIComponents/Notifications/ModalWindow';
import { isProd } from '../../../Utils/formFunctionHelpers';

const allRoles = [
  'Marketing Representative',
  'Company Representative',
  'Accounting Representative',
  'Signing Authority',
  'WG A Representative',
];

const rows = [
  {
    id: '1',
    email: 'lorem1@demo.com',
    role: ['Company Representative', 'Marketing Representative', 'Accounting Representative'],
    name: 'Jon Snow',
    requestRemove: '',
  },
  {
    id: '2',
    email: 'lorem2@demo.com',
    role: ['Marketing Representative'],
    name: 'Cersei Lannister',
    requestRemove: '',
  },
  {
    id: '3',
    email: 'lorem3@demo.com',
    role: ['Accounting Representative'],
    name: 'Jaime Lannister',
    requestRemove: '',
  },
  {
    id: '4',
    email: 'lorem4@demo.com',
    role: ['Signing Authority'],
    name: 'Arya Stark',
    requestRemove: '',
  },
  {
    id: '5',
    email: 'lorem5@demo.com',
    role: ['WG A Representative'],
    name: 'Daenerys Targaryen',
    requestRemove: '',
  },
];

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    headerIcon: {
      fontSize: 80,
      color: iconGray,
      borderBottom: `6px ${brightOrange} solid`,
    },
    pageTitle: {
      margin: theme.spacing(0.5, 0, 4),
    },
    tableIcon: {
      fontSize: 50,
      color: iconGray,
    },
    contactFilterText: {
      backgroundColor: brightOrange,
      color: 'white',
      padding: theme.spacing(1),
      borderRadius: borderRadiusSize,
    },
    table: { height: 420, width: '100%' },
    roleCell: {
      display: 'flex',
    },
    roleText: {
      whiteSpace: 'normal',
    },
    editIconCtn: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    editIcon: {
      color: iconGray,
      marginLeft: 10,
    },
    removeBtn: {
      backgroundColor: '#EBEBEB',
    },
    addContactIcon: {
      margin: theme.spacing(4, 0, 1),
      fontSize: 50,
      color: iconGray,
      borderBottom: `3px ${brightOrange} solid`,
    },
  })
);

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
      flex: 2,
      minWidth: 320,
      renderCell: (params: GridRenderCellParams) => (
        <div className={classes.roleCell}>
          <Typography variant="body2" className={classes.roleText}>
            {Array.isArray(params.value) &&
              params.value.map((role, index) => {
                return index >= 1 ? ', ' + role : role;
              })}
          </Typography>

          <div
            className={classes.editIconCtn}
            onClick={() => {
              const currentContact = params.row;
              setSelectedContact({
                id: currentContact.id,
                email: currentContact.email,
                role: currentContact.role,
                name: currentContact.name,
                requestRemove: currentContact.requestRemove,
              });
              const shouldCheckedRoles = checkedRoles.map((item) => ({
                role: item.role,
                checked: currentContact.role.includes(item.role),
              }));

              setCheckedRoles(shouldCheckedRoles);
              setOpenEditRoles(true);
            }}
          >
            <EditIcon className={classes.editIcon} />
          </div>
        </div>
      ),
    },
    {
      field: 'requestRemove',
      headerName: ' ',
      width: 220,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          className={classes.removeBtn}
          onClick={() => {
            const currentContact = params.row;
            setSelectedContact({
              id: currentContact.id,
              email: currentContact.email,
              role: currentContact.role,
              name: currentContact.name,
              requestRemove: currentContact.requestRemove,
            });
            setOpenRequestRemoval(true);
          }}
        >
          Request Removal From Org
        </Button>
      ),
    },
  ];

  const [contactList, setContactList] = useState(rows);
  const [openRequestRemoval, setOpenRequestRemoval] = useState(false);
  const [openEditRoles, setOpenEditRoles] = useState(false);
  const [removeReason, setRemoveReason] = useState('');
  const [removeComment, setRemoveComment] = useState('');
  const [selectedContact, setSelectedContact] = useState({
    id: '',
    email: '',
    role: [''],
    name: '',
    requestRemove: '',
  });
  const [checkedRoles, setCheckedRoles] = useState([
    { role: 'Company Representative', checked: false },
    { role: 'Marketing Representative', checked: false },
    { role: 'Accounting Representative', checked: false },
    { role: 'Signing Authority', checked: false },
    { role: 'WG A Representative', checked: false },
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemoveReason((event.target as HTMLInputElement).value);
  };

  const handleRequestRemoval = () => {
    setOpenRequestRemoval(false);
    const newRows = contactList.filter((contact) => contact.id !== selectedContact.id);
    !isProd &&
      console.log('Deleted ', selectedContact.name, '| Because of: ', removeReason, '| With comment: ', removeComment);
    setContactList(newRows);
    setRemoveReason('');
    setRemoveComment('');
  };

  const handleEditRoles = () => {
    setOpenEditRoles(false);
    const newRows = contactList.map((contact) => {
      if (contact.id !== selectedContact.id) {
        return contact;
      }
      const newContactRoles = checkedRoles.filter((role) => role.checked).map((role) => role.role);
      return { ...contact, role: newContactRoles };
    });
    setContactList(newRows);
  };

  const renderRemoveReasonOptions = () => {
    const radioOptions = REMOVE_REASONS.map((option, index) => (
      <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
    ));

    return (
      <RadioGroup aria-label="request remove reason" name="removeReason" value={removeReason} onChange={handleChange}>
        {radioOptions}
        <Input
          name="description"
          labelName="Or Add a Comment Here"
          value={removeComment}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setRemoveComment(ev.target.value)}
          multiline={true}
          rows={8}
          backgroundColor="#f9f9f9"
          maxLength={700}
          explanationHelperText={'700 characters limit'}
        />
      </RadioGroup>
    );
  };

  const renderAvailableRoles = () => {
    return allRoles.map((role, index) => (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            name={role}
            color="primary"
            checked={checkedRoles.find((item) => item.role === role)?.checked}
            onChange={(ev) => {
              const shouldCheckedRoles = checkedRoles.map((item) =>
                // Only update the one that user clicks on. For others, just use what they are
                item.role === ev.target.name
                  ? {
                      role: item.role,
                      checked: ev.target.checked,
                    }
                  : item
              );
              setCheckedRoles(shouldCheckedRoles);
            }}
          />
        }
        label={role}
      />
    ));
  };

  return (
    <>
      <RecentActorsIcon className={classes.headerIcon} />
      <Typography className={classes.pageTitle} variant="h4" component="h1">
        Contact Management
      </Typography>

      <RecentActorsIcon className={classes.tableIcon} />
      <Typography variant="body1" className={classes.contactFilterText}>
        Contacts
      </Typography>
      <div className={classes.table}>
        <DataGrid
          rows={contactList}
          columns={columns}
          rowHeight={55}
          rowsPerPageOptions={[5, 10, 100]}
          disableSelectionOnClick
        />
      </div>

      <PersonAddIcon className={classes.addContactIcon} />
      <Typography variant="body1">
        * If you believe a contact is missing from the list, please contact the individual directly and have them update
        their Eclipse.org account to indicate they are a contact of your company. <br /> Once done, their contact record
        will appear in the list.
      </Typography>

      <ModalWindow
        title={'Request to Remove ' + selectedContact.name}
        content={''}
        customContent={renderRemoveReasonOptions}
        handleProceed={handleRequestRemoval}
        shouldOpen={openRequestRemoval}
        setShouldOpen={setOpenRequestRemoval}
        cancelText={'Cancel'}
        yesText={'Submit'}
      />

      <ModalWindow
        title={'Edit ' + selectedContact.name + `'s Roles`}
        content={''}
        customContent={renderAvailableRoles}
        handleProceed={handleEditRoles}
        shouldOpen={openEditRoles}
        setShouldOpen={setOpenEditRoles}
        cancelText={'Cancel'}
        yesText={'Submit'}
      />
    </>
  );
}
