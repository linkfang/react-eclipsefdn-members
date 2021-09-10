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

const useStyles = makeStyles(() =>
  createStyles({
    faqContainer: {
      position: 'relative',
      display: 'flex',
      marginTop: 40,
      paddingLeft: 64,
      paddingRight: 0,
      border: '2px #DCDFE5 solid',
      borderRadius: borderRadiusSize,
      maxWidth: '100%',
    },
    faqIcon: {
      position: 'absolute',
      top: -30,
      left: 12,
      color: iconGray,
      backgroundColor: mainContentBGColor,
      fontSize: 60,
    },
    faqIconForBG: {
      fontSize: 200,
      opacity: 0.15,
      color: iconGray,
      marginTop: 42,
    },
    faqList: {
      marginTop: 30,
      marginBottom: 25,
      padding: 10,
    },
    faqItemCtn: {
      padding: 0,
      border: '2px #EDEDED solid',
      borderRadius: borderRadiusSize,
      marginBottom: 5,
    },
    faqQuestion: {
      backgroundColor: '#EDEDED',
      cursor: 'pointer',
    },
    faqExpandIcon: {
      flexDirection: 'row-reverse',
    },
    faqAnswer: {
      padding: '16px 32px',
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
    <div
      style={{
        paddingTop: 90,
      }}
      id="faqs"
    >
      <Typography variant="h4">FAQs</Typography>
      <Container className={classes.faqContainer}>
        <ContactSupportIcon className={classes.faqIcon} />
        <Container className={classes.faqList}>{renderFAQs}</Container>
        <ContactSupportIcon className={classes.faqIconForBG} />
      </Container>
    </div>
  );
}
