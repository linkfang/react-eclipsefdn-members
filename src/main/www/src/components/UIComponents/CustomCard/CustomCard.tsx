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
    customCard: {
      padding: 0,
      position: 'relative',
      minWidth: 230,
      height: 200,
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

    customIconCtn: {
      position: 'absolute',
      top: theme.spacing(-2.5),
      left: theme.spacing(1.5),
      width: 55,
      height: 55,
      padding: 0,
      '& svg': {
        color: iconGray,
        width: '100%',
        height: '100%',
        paddingBottom: theme.spacing(0.5),
      },
    },

    customContent: {
      margin: theme.spacing(3, 1.5, 2.5, 6),
      width: 'calc(100% - 60px)',
    },

    customSubtitle: {
      fontWeight: 600,
      color: darkGray,
    },

    customItem: {
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
    <Container className={classes.customCard}>
      <Container className={classes.customIconCtn} style={{ borderBottom: `4px solid ${props.color}` }}>
        {props.icon}
      </Container>
      <Container className={classes.customContent}>
        <Typography variant="subtitle1" className={classes.customSubtitle}>
          {props.subtitle}
        </Typography>

        <List aria-label="custom list">
          {props.listItems.map((listItem, index) => (
            <ListItemLink key={listItem.name + index} className={classes.customItem} href={listItem.url}>
              <ListItemText primary={listItem.name} />
            </ListItemLink>
          ))}
        </List>
      </Container>
    </Container>
  );
}
