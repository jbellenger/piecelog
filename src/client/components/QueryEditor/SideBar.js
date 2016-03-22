import React from 'react';
import styles from './styles.css';
import ExampleQuery from './ExampleQuery';

const Sidebar = ({onQueryClick}) => {
  const queries = [
    ['log', 'select * from log'],
    ['pieces', 'select * from piece'],
    ['people', 'select * from people'],
  ];

  const exampleProps = {onClick: onQueryClick};

  return (
    <aside className={styles.Sidebar}>
      Query Help
      {queries.map(([label, query], i) => (
        <ExampleQuery key={i} label={label} query={query} {...exampleProps} />
      ))}
    </aside>
  );
};

Sidebar.propTypes = {
  onQueryClick: React.PropTypes.func.isRequired
};

export default Sidebar;
