import { createStyles, makeStyles, Typography, Button, Grid, Link } from '@material-ui/core';
import Input from '../../UIComponents/Inputs/Input';
import { DropzoneDialog } from 'material-ui-dropzone';
import { useState } from 'react';

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
    uploadBtn: {
      backgroundColor: '#DCDFE5',
      width: 160,
    },
    linksDescription: {
      marginBottom: 16,
    },
    btns: {
      marginRight: 20,
      width: '100%',
    },
    saveBtn: {
      marginTop: 40,
      width: 80,
    },
  })
);

export default function OrgProfile() {
  const classes = useStyle();
  const [openLogoForWeb, setOpenLogoForWeb] = useState(false);
  const [openLogoForPrint, setOpenLogoForPrint] = useState(false);

  const handleSaveWebLogo = (files: any) => {
    console.log('Web Logo Saved!', files);
    setOpenLogoForWeb(false);
  };

  const handleSavePrintLogo = (files: any) => {
    console.log('Print Logo Saved!', files);
    setOpenLogoForPrint(false);
  };

  return (
    <>
      <Typography variant="h4" className={classes.pageHeader}>
        Your Organizatino Profile
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs>
          <Input
            name="description"
            labelName="Description"
            multiline={true}
            rows={8}
            backgroundColor="#f9f9f9"
            maxLength={700}
            explanationHelperText={'700 characters limit'}
          />
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

        <Grid item>
          <Button className={classes.uploadBtn} onClick={() => setOpenLogoForWeb(true)}>
            Upload New
          </Button>
        </Grid>

        <Grid item xs>
          <Typography className={classes.helperText} variant="body2">
            The supported formats for uploading your logo include: PNG, JPG, or GIF file under 1 MB in size.
          </Typography>
          <Typography className={classes.helperText} variant="body2">
            The logo dimension cannot exceed 500 by 500 pixels.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item>
          <Typography className={classes.subHeader} variant="h6">
            Logo for Print
          </Typography>
        </Grid>

        <Grid item>
          <Button className={classes.uploadBtn} onClick={() => setOpenLogoForPrint(true)}>
            Upload New
          </Button>
        </Grid>

        <Grid item xs>
          <Typography className={classes.helperText} variant="body2">
            If available please include the .eps file of your company logo.
          </Typography>
        </Grid>
      </Grid>

      <DropzoneDialog
        dialogTitle="Upload Logo for Web"
        open={openLogoForWeb}
        onSave={(file) => handleSaveWebLogo(file)}
        acceptedFiles={['image/jpeg', 'image/png', 'image/gif']}
        showPreviews={true}
        maxFileSize={1048576}
        onClose={() => setOpenLogoForWeb(false)}
      />

      <DropzoneDialog
        dialogTitle="Upload Logo for Print"
        open={openLogoForPrint}
        onSave={(file) => handleSavePrintLogo(file)}
        acceptedFiles={['image/jpeg', 'image/png', 'image/gif', '.eps']}
        showPreviews={true}
        maxFileSize={1048576}
        onClose={() => setOpenLogoForPrint(false)}
      />

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
        etc ).
      </Typography>
      <Typography className={classes.linksDescription} variant="body1">
        Please email <Link href="mailto:membership_admin@eclipse.org">membership_admin@eclipse.org</Link> if you
        required assistance.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs>
          <Typography className={classes.mainSectionHeader} variant="h5">
            Current Links
          </Typography>
          <Input name="currentLink1" value="lorem ipsum" backgroundColor="#f9f9f9" />
          <Input name="currentLink2" value="lorem ipsum" backgroundColor="#f9f9f9" />
        </Grid>
        <Grid item xs>
          <Typography className={classes.mainSectionHeader} variant="h5">
            Add a New Link
          </Typography>
          <Input name="linkTitle" labelName="Title" backgroundColor="#f9f9f9" />
          <Input name="linkDescription" labelName="Description" multiline={true} rows={8} backgroundColor="#f9f9f9" />
          <Input name="linkURL" labelName="URL" backgroundColor="#f9f9f9" />
          <Grid container spacing={2}>
            <Grid item xs>
              <Button className={classes.btns} variant="contained" color="primary">
                Add
              </Button>
            </Grid>
            <Grid item xs>
              <Button className={classes.btns} variant="contained" color="secondary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Button className={classes.saveBtn} variant="contained" color="primary">
        Save
      </Button>
    </>
  );
}
