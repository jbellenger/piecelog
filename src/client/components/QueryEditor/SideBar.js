import React from 'react';
import styles from './styles.css';
import ExampleQuery from './ExampleQuery';
import LogEvent from '../../modules/model/LogEvent';
import Person from '../../modules/model/Person';
import Piece from '../../modules/model/Piece';

const Sidebar = ({onQueryClick}) => {
  const queries = [
    ['log', `select ${LogEvent.fields.join(',')} from log`],
    ['pieces', `select ${Piece.fields.join(',')} from piece`],
    ['people', `select ${Person.fields.join(',')} from person`],
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
