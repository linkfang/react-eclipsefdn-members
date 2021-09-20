import { createStyles, makeStyles, Typography, Button, Grid, Link } from '@material-ui/core';
import Input from '../../UIComponents/Inputs/Input';
import { DropzoneDialog } from 'material-ui-dropzone';
import { useState } from 'react';
import { useFormik } from 'formik';
import { INITIAL_ORG_NEW_LINK, INITIAL_ORG_PROFILE_VALUE } from '../../UIComponents/FormComponents/formFieldModel';
import {
  VALIDATION_SCHEMA_FOR_NEW_LINK,
  VALIDATION_SCHEMA_FOR_ORG_PROFILE,
} from '../../UIComponents/FormComponents/ValidationSchema';

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
      minWidth: 110,
      fontWeight: 400,
    },
    helperText: {
      margin: 0,
    },
    uploadBtn: {
      backgroundColor: '#DCDFE5',
      width: 160,
    },
    orgProfileBtnCtn: {
      marginTop: 25,
    },
    currentLinksCard: {
      marginBottom: 20,
      padding: 15,
      borderRadius: 5,
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
    },
    currentLinksTitle: {
      fontWeight: 500,
      marginBottom: 5,
    },
    linksDescription: {
      marginBottom: 16,
    },
    btns: {
      marginRight: 20,
      width: '100%',
      minWidth: 90,
    },
  })
);

interface CurrentLink {
  title: string;
  description: string;
  url: string;
}

export default function OrgProfile() {
  const classes = useStyle();
  const [openLogoForWeb, setOpenLogoForWeb] = useState(false);
  const [openLogoForPrint, setOpenLogoForPrint] = useState(false);
  const [currentLinks, setCurrentLinks] = useState<Array<CurrentLink> | []>([]);

  const handleSaveWebLogo = (files: any) => {
    console.log('Web Logo Saved!', files);
    formikOrg.setFieldValue('logos.logoForWeb', files);
    setOpenLogoForWeb(false);
  };

  const handleSavePrintLogo = (files: any) => {
    console.log('Print Logo Saved!', files);
    formikOrg.setFieldValue('logos.logoForPrint', files);
    setOpenLogoForPrint(false);
  };

  const handleSaveOrgProfile = () => {
    console.log('Org profile is saved! ', formikOrg.values);
  };

  const handleAddNewLink = () => {
    console.log('New link is added! ', formikNewLinks.values);
    setCurrentLinks([...currentLinks, formikNewLinks.values]);
    formikNewLinks.resetForm();
  };

  const formikOrg = useFormik({
    initialValues: INITIAL_ORG_PROFILE_VALUE,
    validationSchema: VALIDATION_SCHEMA_FOR_ORG_PROFILE,
    onSubmit: handleSaveOrgProfile,
  });

  const formikNewLinks = useFormik({
    initialValues: INITIAL_ORG_NEW_LINK,
    validationSchema: VALIDATION_SCHEMA_FOR_NEW_LINK,
    onSubmit: handleAddNewLink,
  });

  const renderCurrentLinks = currentLinks.map((link, index) => (
    <div className={classes.currentLinksCard} key={index}>
      <Typography variant="subtitle1" className={classes.currentLinksTitle}>
        {link.title}:
      </Typography>
      <Link href={link.url} rel="noreferrer" target="_blank">
        {link.url}
      </Link>
    </div>
  ));

  return (
    <>
      <Typography variant="h4" className={classes.pageHeader}>
        Your Organizatino Profile
      </Typography>
      <form onSubmit={formikOrg.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs>
            <Input
              name="orgProfile.description"
              labelName="Description"
              multiline={true}
              rows={8}
              backgroundColor="#f9f9f9"
              maxLength={700}
              explanationHelperText={'700 characters limit'}
              value={formikOrg.values.orgProfile.description}
              onChange={formikOrg.handleChange}
              error={formikOrg.touched.orgProfile?.description && Boolean(formikOrg.errors.orgProfile?.description)}
              helperText={formikOrg.errors.orgProfile?.description}
            />
          </Grid>
          <Grid item xs>
            <Input
              name="orgProfile.companyURL"
              labelName="Company URL"
              backgroundColor="#f9f9f9"
              value={formikOrg.values.orgProfile.companyURL}
              onChange={formikOrg.handleChange}
              error={formikOrg.touched.orgProfile?.companyURL && Boolean(formikOrg.errors.orgProfile?.companyURL)}
              helperText={formikOrg.errors.orgProfile?.companyURL}
            />
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

        <Grid container spacing={2} className={classes.orgProfileBtnCtn}>
          <Grid item sm={6} md={2}>
            <Button className={classes.btns} variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
          <Grid item sm={6} md={2}>
            <Button
              className={classes.btns}
              variant="contained"
              color="secondary"
              onClick={() => formikOrg.resetForm()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={formikNewLinks.handleSubmit}>
        <Typography className={classes.mainSectionHeader} variant="h5">
          Links
        </Typography>
        <Typography className={classes.linksDescription} variant="body1">
          This enables you to add link to your membership page, products and services that aimed to be highlighted.
          Simply click [add] to add new entree and to edit and existing entry. To remove an entry, simply use the delete
          button for each links you’d like to remove.
        </Typography>
        <Typography className={classes.linksDescription} variant="body1">
          In addition to your explicit links included here, your organization listing on the Eclipse marketplace will
          automatically appear on your membership page. Please ensure that Your organization [company name] on the
          marketplace listings is the same as it appears on your membership page ( including suffixes such as Inc.,
          GmbH, etc ).
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
            {renderCurrentLinks.length > 0 ? renderCurrentLinks : <Typography>No links yet</Typography>}
          </Grid>
          <Grid item xs>
            <Typography className={classes.mainSectionHeader} variant="h5">
              Add a New Link
            </Typography>
            <Input
              name="title"
              labelName="Title"
              backgroundColor="#f9f9f9"
              value={formikNewLinks.values.title}
              onChange={formikNewLinks.handleChange}
              error={formikNewLinks.touched.title && Boolean(formikNewLinks.errors.title)}
              helperText={formikNewLinks.errors.title}
            />
            <Input
              name="description"
              labelName="Description"
              multiline={true}
              rows={8}
              backgroundColor="#f9f9f9"
              maxLength={700}
              explanationHelperText={'700 characters limit'}
              value={formikNewLinks.values.description}
              onChange={formikNewLinks.handleChange}
              error={formikNewLinks.touched.description && Boolean(formikNewLinks.errors.description)}
              helperText={formikNewLinks.errors.description}
            />
            <Input
              name="url"
              labelName="URL"
              backgroundColor="#f9f9f9"
              value={formikNewLinks.values.url}
              onChange={formikNewLinks.handleChange}
              error={formikNewLinks.touched.url && Boolean(formikNewLinks.errors.url)}
              helperText={formikNewLinks.errors.url}
            />
            <Grid container spacing={2}>
              <Grid item xs>
                <Button className={classes.btns} variant="contained" color="primary" type="submit">
                  Add
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  className={classes.btns}
                  variant="contained"
                  color="secondary"
                  onClick={() => formikNewLinks.resetForm()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
