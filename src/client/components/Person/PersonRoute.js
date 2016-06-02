import React from 'react';
import PersonView from './PersonView';
import LogTable from '../LogTable';

const PersonRoute = ({params: {personId}}) => <PersonView personId={personId} />;

export default PersonRoute;
