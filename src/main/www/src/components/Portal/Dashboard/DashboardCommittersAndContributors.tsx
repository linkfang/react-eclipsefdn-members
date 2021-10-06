import { Container, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { brightBlue, brightOrange, iconGray } from '../../../Constants/Constants';
import {
  configForAreaStack,
  configForBar,
  dataForAreaStack,
  dataForBarLineChart,
} from '../../../Constants/portalDemoData';
import CustomCard from '../../UIComponents/CustomCard/CustomCard';
import SectionCtn from '../../UIComponents/CustomContainer/SectionCtn';
import { Line, Bar } from 'react-chartjs-2';

const committersDemoData = [
  { name: '- Eclipse Ditto', url: '#' },
  { name: '- Eclipse Hono', url: '#' },
  { name: '- Eclipse Hawkbit', url: '#' },
  { name: '- Eclipse MDT UML2', url: '#' },
  { name: '- Eclipse Ogee', url: '#' },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridCard: {
      '& > div': {
        paddingTop: theme.spacing(0.1),
        margin: 0,
        width: '100%',
      },
    },
    committersCard: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      minHeight: 100,
      backgroundColor: brightOrange,
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
      borderRadius: 4,
    },
    committersIconCtn: {
      position: 'absolute',
      borderBottom: `4px solid ${brightBlue}`,
      top: theme.spacing(-2.5),
      left: theme.spacing(1.5),
      width: 54,
      height: 54,
      padding: 0,
      '& svg': {
        color: iconGray,
        width: '100%',
        height: '100%',
        paddingBottom: theme.spacing(0.5),
      },
    },
    committersCardContent: {
      marginLeft: theme.spacing(6),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
      width: 'calc(100% - 60px)',
    },
    committersCardSubtitle: {
      fontSize: 16,
    },

    cardCBIContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0.5, 0, 0.5, 1.5),
    },
    cbiItem: {
      display: 'flex',
      alignItems: 'center',
    },
    bigWhiteNumber: {
      color: 'white',
      width: 38,
      marginRight: theme.spacing(1),
      textAlign: 'center',
    },
    thickBodyText: {
      fontWeight: 600,
    },
    fullWidthChartCtn: {
      marginTop: theme.spacing(3),
      width: '100%',
    },
  })
);

export default function DashboardCommittersAndContributors() {
  const classes = useStyles();

  return (
    <SectionCtn title="Committers and Contributors" id="committers-contributors">
      <Grid container spacing={4}>
        <Grid item container xs spacing={4}>
          <Grid item container spacing={4}>
            <Grid item xs className={classes.gridCard}>
              <CustomCard
                subtitle="Your Committers"
                color={brightBlue}
                icon={<PeopleAltIcon />}
                listItems={committersDemoData}
              />
            </Grid>
            <Grid item xs className={classes.gridCard}>
              <CustomCard
                subtitle="Your Contributors"
                color={brightBlue}
                icon={<PeopleAltIcon />}
                listItems={committersDemoData}
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <Container className={classes.committersCard}>
              <Container className={classes.committersIconCtn}>
                <PeopleAltIcon />
              </Container>
              <Container className={classes.committersCardContent}>
                <Typography variant="h6" component="h3" className={classes.committersCardSubtitle}>
                  Common Build Infrastructure
                </Typography>
                <Container className={classes.cardCBIContent}>
                  <div className={classes.cbiItem}>
                    <Typography variant="h4" component="h1" className={classes.bigWhiteNumber}>
                      6
                    </Typography>
                    <Typography variant="body1" className={classes.thickBodyText}>
                      resource packs in use
                    </Typography>
                  </div>
                  <div className={classes.cbiItem}>
                    <Typography variant="h4" component="h1" className={classes.bigWhiteNumber}>
                      10
                    </Typography>
                    <Typography variant="body1" className={classes.thickBodyText}>
                      resource packs allocated
                    </Typography>
                  </div>
                </Container>
              </Container>
            </Container>
          </Grid>
        </Grid>

        <Grid item xs>
          <Line data={dataForAreaStack} options={configForAreaStack} />
        </Grid>
      </Grid>
      <div className={classes.fullWidthChartCtn}>
        <Bar data={dataForBarLineChart} options={configForBar} />
      </div>
    </SectionCtn>
  );
}
