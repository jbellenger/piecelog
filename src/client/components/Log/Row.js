import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class View extends React.Component {
  static propTypes = {
    piece_id: PropTypes.string.isRequired,
    person_id: PropTypes.string.isRequired
  };

  render() {
    const {piece_id, person_id} = this.props;
    return (
      <div>
        piece_id=<Link to={'/piece/' + piece_id}>{piece_id}</Link>
        &nbsp;
        person_id=<Link to={'/person/' + person_id}>{person_id}</Link>
      </div>
    );
  }
}
