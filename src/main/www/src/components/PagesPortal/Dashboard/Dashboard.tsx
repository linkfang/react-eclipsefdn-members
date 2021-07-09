import { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <h2>Overview</h2>
      <h2>Projects and Working Groups</h2>
      <h2>Committers and Contributors</h2>
      <h2>Projects and Working Groups</h2>
      <h2>Resources</h2>
      <h2>FAQs</h2>
      <List>
        <ListItem>
          <ListItemText primary="Title" onClick={handleClick} />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem>
              <ListItemText primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
