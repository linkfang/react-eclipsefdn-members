import { createStyles, makeStyles, Typography, TextField, Button, Grid } from '@material-ui/core';
import Input from '../../UIComponents/Inputs/Input';
// import { DropzoneArea } from 'material-ui-dropzone';

const useStyle = makeStyles(() =>
  createStyles({
    pageHeader: {
      marginBottom: 40,
    },
    mainSectionHeader: {
      fontWeight: 600,
      margin: '40px 0 15px 0',
    },
    subHeader: {
      fontWeight: 400,
    },
    helperText: {
      margin: 0,
    },
    linksDescription: {
      marginTop: 15,
    },
    primaryBtn: {
      color: 'white',
      marginRight: 20,
      width: 80,
    },
    secondaryBtn: {
      color: 'white',
      marginRight: 20,
      width: 80,
    },
    saveBtn: {
      color: 'white',
      backgroundColor: '#696969',
      width: 80,
    },
  })
);

export default function OrgProfile() {
  const classes = useStyle();
  return (
    <>
      <Typography variant="h4" className={classes.pageHeader}>
        Your Organizatino Profile
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs>
          <Input name="description" labelName="Description" multiline={true} rows={8} backgroundColor="#f9f9f9" />
        </Grid>
        <Grid item xs>
          <Input name="companyURL" labelName="Company URL" backgroundColor="#f9f9f9" />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item>
          <Typography className={classes.subHeader} variant="h6">
            Logo for Web 
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <TextField name="companyLogo" type="file" />
          {/* <DropzoneArea /> */}
        </Grid>

        <Grid item xs>
          <Typography className={classes.helperText} variant="body2">
            Provide the logo in PNG or SVG formats
          </Typography>
          <Typography className={classes.helperText} variant="body2">
            The dimensions of the logo cannot exceed 354 * 472
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item>
          <Typography className={classes.subHeader} variant="h6">
            Logo for Print
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <TextField name="companyLogo" type="file" />
          {/* <DropzoneArea /> */}
        </Grid>

        <Grid item xs>
          <Typography className={classes.helperText} variant="body2">
            If available please include the .eps file of your company logo.
          </Typography>
        </Grid>
      </Grid>

      <Typography className={classes.mainSectionHeader} variant="h5">
        Links
      </Typography>
      <Typography className={classes.linksDescription} variant="body1">
        This enables you to add link to your membership page, products and services that aimed to be highlighted. Simply
        click [add] to add new entree and to edit and existing entry. To remove an entry, simply use the delete button
        for each links you’d like to remove.
      </Typography>
      <Typography className={classes.linksDescription} variant="body1">
        In addition to your explicit links included here, your organization listing on the Eclipse marketplace will
        automatically appear on your membership page. Please ensure that Your organization [company name] on the
        marketplace listings is the same as it appears on your membership page ( including suffixes such as Inc., GmbH,
        etc )
      </Typography>
      <Typography className={classes.linksDescription} variant="body1">
        Please email membership_admin@eclipse.org if you required assistance.
      </Typography>

      <div className="row">
        <div className="col-md-12">
          <Typography className={classes.mainSectionHeader} variant="h5">
            Current Links
          </Typography>
          <Input name="currentLink1" value="lorem ipsum" backgroundColor="#f9f9f9" />
          <Input name="currentLink2" value="lorem ipsum" backgroundColor="#f9f9f9" />
        </div>
        <div className="col-md-12">
          <Typography className={classes.mainSectionHeader} variant="h5">
            Add a New Link
          </Typography>
          <Input name="linkTitle" labelName="Title" backgroundColor="#f9f9f9" />
          <Input name="linkDescription" labelName="Description" multiline={true} rows={8} backgroundColor="#f9f9f9" />
          <Input name="linkURL" labelName="URL" backgroundColor="#f9f9f9" />
          <Button className={classes.primaryBtn} variant="contained" color="primary">
            Add
          </Button>
          <Button className={classes.secondaryBtn} variant="contained" color="primary">
            Cancel
          </Button>
          <Button className={classes.saveBtn} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
