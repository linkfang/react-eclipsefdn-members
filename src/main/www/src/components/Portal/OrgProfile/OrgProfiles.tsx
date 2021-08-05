import { createStyles, makeStyles, Typography, TextField, Button } from '@material-ui/core';
import Input from '../../UIComponents/Inputs/Input';
// import { DropzoneArea } from 'material-ui-dropzone';

const useStyle = makeStyles(() =>
  createStyles({
    mainSectionHeader: {
      fontWeight: 600,
      margin: '40px 0 15px 0',
    },
    subHeader: {
      fontWeight: 400,
      marginTop: 10,
    },
    primaryBtn: {
      color: 'white',
      marginRight: 20,
      width: 80,
    },
    secondaryBtn: {
      color: 'white',
      backgroundColor: '#696969',
      width: 80,
    },
    saveBtn: {
      marginTop: 40,
      color: 'white',
      width: 80,
    },
  })
);

export default function OrgProfile() {
  const classes = useStyle();
  return (
    <>
      <Typography variant="h4">Your Organizatino Profile</Typography>
      <Typography className={classes.mainSectionHeader} variant="h5">
        Member Information
      </Typography>
      <Input
        name="shortDescription"
        labelName="Short Description"
        multiline={true}
        rows={4}
        helperText="Maximum length 250 characters"
        backgroundColor="#f9f9f9"
      />

      <Input
        name="longDescription"
        labelName="Long Description"
        multiline={true}
        rows={8}
        helperText="Allow HTML tags"
        backgroundColor="#f9f9f9"
      />

      <Input name="companyURL" labelName="Company URL" backgroundColor="#f9f9f9" />

      <Typography className={classes.subHeader} variant="h6">
        Logo upload
      </Typography>
      <TextField name="companyLogo" type="file" helperText="Supported image format: PNG" />
      {/* <DropzoneArea /> */}

      <Typography className={classes.mainSectionHeader} variant="h5">
        Links
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, odio quisquam ad delectus unde repellendus alias
        culpa nulla magni facere repudiandae, temporibus autem eum aperiam tempore explicabo illum quaerat libero.
      </Typography>
      <div className="row">
        <div className="col-md-12">
          <Typography className={classes.subHeader} variant="h6">
            Current Links
          </Typography>
          <Input name="currentLink1" value="lorem ipsum" backgroundColor="#f9f9f9" />
          <Input name="currentLink2" value="lorem ipsum" backgroundColor="#f9f9f9" />
        </div>
        <div className="col-md-12">
          <Typography className={classes.subHeader} variant="h6">
            Add a New Link
          </Typography>
          <Input name="linkTitle" labelName="Title" backgroundColor="#f9f9f9" />
          <Input name="linkDescription" labelName="Description" multiline={true} rows={8} backgroundColor="#f9f9f9" />
          <Input name="linkURL" labelName="URL" backgroundColor="#f9f9f9" />
          <Button className={classes.primaryBtn} variant="contained" color="primary">
            Add
          </Button>
          <Button className={classes.secondaryBtn} variant="contained">
            Cancel
          </Button>
        </div>
      </div>

      <Typography className={classes.mainSectionHeader} variant="h5">
        Contacts
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, odio quisquam ad delectus unde repellendus alias
        culpa nulla magni facere repudiandae, temporibus autem eum aperiam tempore explicabo illum quaerat libero.
      </Typography>
      <div className="row">
        <div className="col-md-12">
          <Typography className={classes.subHeader} variant="h6">
            Current Contacts
          </Typography>
          <Input name="currentContact1" value="lorem ipsum" backgroundColor="#f9f9f9" />
          <Input name="currentContact2" value="lorem ipsum" backgroundColor="#f9f9f9" />
        </div>
        <div className="col-md-12">
          <Typography className={classes.subHeader} variant="h6">
            Add a New Contact
          </Typography>
          <Input name="contactFirstname" labelName="First Name" backgroundColor="#f9f9f9" />
          <Input name="contactLastname" labelName="Last Name" backgroundColor="#f9f9f9" />
          <Input name="contactEmail" labelName="Email Address" backgroundColor="#f9f9f9" />
          <Input name="contactPhone" labelName="Phone Number" backgroundColor="#f9f9f9" />
          <Input name="contactRole" labelName="Contact Role" backgroundColor="#f9f9f9" />
          <Button className={classes.primaryBtn} variant="contained" color="primary">
            Add
          </Button>
          <Button className={classes.secondaryBtn} variant="contained">
            Cancel
          </Button>
        </div>
      </div>

      <Button className={classes.saveBtn} variant="contained" color="primary">
        Save
      </Button>
    </>
  );
}
