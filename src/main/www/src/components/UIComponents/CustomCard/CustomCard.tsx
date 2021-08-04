import {
  createStyles,
  makeStyles,
  Container,
  List,
  Typography,
  ListItemProps,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { darkGray, iconGray } from '../../../Constants/Constants';

const useStyles = makeStyles(() =>
  createStyles({
    resourcesCard: {
      margin: 0,
      padding: 0,
      position: 'relative',
      width: '22%',
      height: 180,
      backgroundColor: '#fff',
      boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
      borderRadius: 4,
    },

    resourcesIconCtn: {
      position: 'absolute',
      top: -27,
      left: 14,
      width: 54,
      height: 54,
      padding: 0,
      '& svg': {
        color: iconGray,
        width: '100%',
        height: '100%',
        paddingBottom: 2,
        // borderBottom: `4px solid ${brightOrange}`,
      },
    },

    resourcesContent: {
      margin: '30px 15px 25px 60px',
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
