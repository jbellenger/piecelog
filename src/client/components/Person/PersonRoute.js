import React from 'react';
import PersonView from './PersonView';

const PersonRoute = ({params: {personId}}) => <PersonView personId={personId} />;

export default PersonRoute;
