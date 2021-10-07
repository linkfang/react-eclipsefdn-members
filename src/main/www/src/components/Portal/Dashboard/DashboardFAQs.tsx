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

const FAQ_ITEMS = [
  {
    question: 'How do I update our address and/or member representative and other contact information?',
    answer: (
      <p>
        Please send an e-mail to <a href="mailto:membership@eclipse.org">membership@eclipse.org</a> with your updated
        address and contact information.
      </p>
    ),
  },
  {
    question: 'How do I edit our Membership Pages?',
    answer: (
      <p>
        Member Representative or their delegate(s) may make edits to the information publicly displayed on your Eclipse
        Foundation membership page can be updated on your organization profile. If you believe you should have this
        authority but do not have access, please contact{' '}
        <a href="mailto:membership.coordination@eclipse-foundation.org">
          membership.coordination@eclipse-foundation.org
        </a>
        .
      </p>
    ),
  },
  {
    question: `How do I promote my organization's products and services?`,
    answer: (
      <p>
        The Eclipse Foundation offers members a number of different ways to promote their products and services ranging
        from ad space on eclipse.org and related properties, highlighting of member products on Eclipse Plugin Central,
        and personalized membership pages that automatically integrate your contributions to the Eclipse ecosystem. Full
        details on the many ways you can promote your products and services can be found by contacting{' '}
        <a href="mailto:membership@eclipse.org">membership@eclipse.org</a>.
      </p>
    ),
  },
  {
    question: 'How do I get involved in Eclipse Projects?',
    answer: (
      <p>
        Engaging in existing Eclipse projects and the process for bringing new projects to Eclipse can be found on our{' '}
        <a href="https://www.eclipse.org/projects/" target="_blank" rel="noreferrer">
          Discover our Projects
        </a>{' '}
        page. The{' '}
        <a href="https://www.eclipse.org/projects/dev_process/index.php" target="_blank" rel="noreferrer">
          Eclipse Foundation Development Process
        </a>{' '}
        describes how Membership at Large, the Board of Directors, other constituents of the Ecosystem, and the Eclipse
        Management Organization (EMO) lead, influence, and collaborate with existing Eclipse Projects.
      </p>
    ),
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
        paddingLeft: theme.spacing(6.5),
      },
    },
    faqIcon: {
      position: 'absolute',
      top: theme.spacing(-3),
      left: theme.spacing(1),
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
      marginTop: theme.spacing(4),
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
      padding: theme.spacing(1.5, 3),
      '& p': {
        margin: 0,
      },
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

  const renderFAQs = FAQ_ITEMS.map((item, index) => (
    <List className={classes.faqItemCtn} key={index}>
      <ListItem className={classes.faqQuestion} onClick={() => handleClick(index)}>
        <ListItemText primary={item.question} />
        <ListItemIcon className={classes.faqExpandIcon}>
          {shouldCollapse[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
      </ListItem>
      <Collapse in={shouldCollapse[index]} timeout="auto" unmountOnExit>
        <ListItem className={classes.faqAnswer}>
          {item.answer}
        </ListItem>
      </Collapse>
    </List>
  ));
  return (
    <div id="faqs">
      <Typography className={classes.faqTitle} variant="h4" component="h1">
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
