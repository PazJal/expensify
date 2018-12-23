import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponnet) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is a header.</p>}
      <WrappedComponnet {...props}/>
    </div>
  );
}

const requireAuthentication = (WrappedComponnet) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponnet {...props}/> : <p>You are not authenticated. </p>}
    </div>
  );
};

const AuthInfo = requireAuthentication(Info)

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(<AuthInfo info="Details" isAuthenticated={false}/> , document.getElementById('app'));