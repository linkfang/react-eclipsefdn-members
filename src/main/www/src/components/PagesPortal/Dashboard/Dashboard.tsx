import { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';

const faqItems = [
  {
    question: 'Question-1',
    answer:
      "Lorem Ipsum 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
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

export default function Dashboard() {
  const [shouldCollapse, setShouldCollapse] = useState<Array<boolean>>([]);

  const handleClick = (index: number) => {
    const newShouldCollapse = [...shouldCollapse];
    newShouldCollapse[index] = !newShouldCollapse[index];
    setShouldCollapse(newShouldCollapse);
  };

  const renderFAQs = faqItems.map((item, index) => (
    <div key={index}>
      <ListItem>
        <ListItemText primary={item.question} onClick={() => handleClick(index)} />
      </ListItem>
      <Collapse in={shouldCollapse[index]} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem>
            <ListItemText primary={item.answer} />
          </ListItem>
        </List>
      </Collapse>
    </div>
  ));

  return (
    <div>
      <h2>Overview</h2>
      <h2>Projects and Working Groups</h2>
      <h2>Committers and Contributors</h2>
      <h2>Projects and Working Groups</h2>
      <h2>Resources</h2>
      <h2>FAQs</h2>
      <List>{renderFAQs}</List>
    </div>
  );
}
