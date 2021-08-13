import { Typography, createStyles, makeStyles, Container, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: { padding: '90px 0 0', margin: 0, maxWidth: '100%' },
    projectAndWGCtn: {
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 40,
      padding: 0,
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-between',
      },
    },
    sectionTitle: {
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },
  })
);

interface SectionCtnProps {
  id: string;
  title: string;
  children: any;
}

export default function SectionCtn(props: SectionCtnProps) {
  const classes = useStyles();

  return (
    <Container className={classes.main} id={props.id}>
      <Typography className={classes.sectionTitle} variant="h4">
        {props.title}
      </Typography>

      <Container className={classes.projectAndWGCtn}>{props.children}</Container>
    </Container>
  );
}
