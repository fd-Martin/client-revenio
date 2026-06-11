import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbitiene from '../shared/Forbitiene';
import LoadingSpinner from '../shared/LoadingSpinner ';

const LibrarianRoute = ({children}) => {
  const { loding } = useAuth();
  const { role, roleLoding } = useRole();

  if (loding) {
    return <LoadingSpinner />;
  }

  if (roleLoding) {
    return <LoadingSpinner />;
  }

  if (role !== "librarian") {
    return <Forbitiene />;
  }

  return children
};

export default LibrarianRoute;