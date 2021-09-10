import {
  createStyles,
  makeStyles,
  Container,
  List,
  Typography,
  ListItemProps,
  ListItem,
  ListItemText,
  Theme,
} from '@material-ui/core';
import { borderRadiusSize, darkGray, iconGray } from '../../../Constants/Constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resourcesCard: {
      padding: 0,
      position: 'relative',
      minWidth: theme.spacing(23),
      height: theme.spacing(20),
      backgroundColor: '#fff',
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
      borderRadius: borderRadiusSize,
      margin: theme.spacing(2, 0),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2.5, 1, 2, 1),
        width: '46%',
      },
      [theme.breakpoints.up(1200)]: {
        margin: theme.spacing(2.5, 1, 2, 1),
        width: '22%',
      },
    },

    resourcesIconCtn: {
      position: 'absolute',
      top: theme.spacing(-2.7),
      left: theme.spacing(1.4),
      width: theme.spacing(5.4),
      height: theme.spacing(5.4),
      padding: 0,
      '& svg': {
        color: iconGray,
        width: '100%',
        height: '100%',
        paddingBottom: theme.spacing(0.2),
      },
    },

    resourcesContent: {
      margin: theme.spacing(3, 1.5, 2.5, 6),
      width: 'calc(100% - 60px)',
    },

    resourcesSubtitle: {
      fontWeight: 600,
      color: darkGray,
    },

    resourcesItem: {
      padding: 0,
    },
  })
);

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
  return <ListItem button component="a" {...props} />;
};

interface CustomCardProps {
  subtitle: string;
  color: string;
  icon: any;
  listItems: Array<{
    name: string;
    url: string;
  }>;
}

export default function CustomCard(props: CustomCardProps) {
  const classes = useStyles();
  return (
    <Container className={classes.resourcesCard}>
      <Container className={classes.resourcesIconCtn} style={{ borderBottom: `4px solid ${props.color}` }}>
        {props.icon}
      </Container>
      <Container className={classes.resourcesContent}>
        <Typography variant="subtitle1" className={classes.resourcesSubtitle}>
          {props.subtitle}
        </Typography>

        <List aria-label="resources list">
          {props.listItems.map((listItem, index) => (
            <ListItemLink key={listItem.name + index} className={classes.resourcesItem} href={listItem.url}>
              <ListItemText primary={listItem.name} />
            </ListItemLink>
          ))}
        </List>
      </Container>
    </Container>
  );
}
