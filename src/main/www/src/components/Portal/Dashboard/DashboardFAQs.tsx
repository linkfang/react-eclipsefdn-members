import { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Collapse,
  Container,
  makeStyles,
  createStyles,
  ListItemIcon,
  List,
  Typography,
  Theme,
} from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { borderRadiusSize, iconGray, mainContentBGColor } from '../../../Constants/Constants';

const faqItems = [
  {
    question: 'Question-1',
    answer:
      "Lorem Ipsum 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum 1 is simply dummy text of the printing and typesetting industry.",
  },
  {
    question: 'Question-2',
    answer:
      "Lorem Ipsum 2 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    question: 'Question-3',
    answer:
      "Lorem Ipsum 3 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    question: 'Question-4',
    answer:
      "Lorem Ipsum 4 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    faqContainer: {
      position: 'relative',
      display: 'flex',
      marginTop: theme.spacing(4),
      padding: theme.spacing(0, 1),
      border: '2px #DCDFE5 solid',
      borderRadius: borderRadiusSize,
      maxWidth: '100%',
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(6.4),
      },
    },
    faqIcon: {
      position: 'absolute',
      top: theme.spacing(-3),
      left: theme.spacing(1.2),
      color: iconGray,
      backgroundColor: mainContentBGColor,
      fontSize: 60,
    },
    faqTitle: {
      textAlign: 'center',
      paddingTop: theme.spacing(9),
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },
    faqIconForBG: {
      fontSize: 200,
      opacity: 0.15,
      color: iconGray,
      marginTop: theme.spacing(4.2),
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        display: 'block',
      },
    },
    faqList: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2.5),
      padding: theme.spacing(1),
    },
    faqItemCtn: {
      padding: 0,
      border: '2px #EDEDED solid',
      borderRadius: borderRadiusSize,
      marginBottom: theme.spacing(0.5),
    },
    faqQuestion: {
      backgroundColor: '#EDEDED',
      cursor: 'pointer',
    },
    faqExpandIcon: {
      flexDirection: 'row-reverse',
    },
    faqAnswer: {
      padding: theme.spacing(1.6, 3.2),
    },
  })
);

export default function DashboardFAQs() {
  const [shouldCollapse, setShouldCollapse] = useState<Array<boolean>>([]);
  const classes = useStyles();

  const handleClick = (index: number) => {
    const newShouldCollapse = [...shouldCollapse];
    newShouldCollapse[index] = !newShouldCollapse[index];
    setShouldCollapse(newShouldCollapse);
  };

  const renderFAQs = faqItems.map((item, index) => (
    <List className={classes.faqItemCtn} key={index}>
      <ListItem className={classes.faqQuestion} onClick={() => handleClick(index)}>
        <ListItemText primary={item.question} />
        <ListItemIcon className={classes.faqExpandIcon}>
          {shouldCollapse[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
      </ListItem>
      <Collapse in={shouldCollapse[index]} timeout="auto" unmountOnExit>
        <ListItem className={classes.faqAnswer}>
          <ListItemText primary={item.answer} />
        </ListItem>
      </Collapse>
    </List>
  ));
  return (
    <div id="faqs">
      <Typography className={classes.faqTitle} variant="h4">
        FAQs
      </Typography>
      <Container className={classes.faqContainer}>
        <ContactSupportIcon className={classes.faqIcon} />
        <Container className={classes.faqList}>{renderFAQs}</Container>
        <ContactSupportIcon className={classes.faqIconForBG} />
      </Container>
    </div>
  );
}
