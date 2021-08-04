import { Typography, createStyles, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    main: { padding: '90px 0 0', margin: 0, maxWidth: '100%' },
    projectAndWGCtn: {
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 40,
      padding: 0,
      justifyContent: 'space-between',
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
      <Typography variant="h4">{props.title}</Typography>

      <Container className={classes.projectAndWGCtn}>{props.children}</Container>
    </Container>
  );
}
