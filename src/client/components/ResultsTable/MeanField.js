import React, {PropTypes} from 'react';

const MeanField = ({collection, stat, formatter}) => (
  <div>
    <div>
      Mean: {formatter(collection.mean[stat])}
    </div>
    <ol>
      {collection.entries.map((entry) => (
        <li>{formatter(entry[stat])}</li>
      ))}
    </ol>
  </div>
);

export default MeanField;
