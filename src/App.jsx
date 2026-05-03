import React, { useState } from 'react';
import FinanceDashboard from './FinanceDashboard';
import Login from './components/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {!currentUser ? (
        <Login onLogin={(user) => setCurrentUser(user)} />
      ) : (
        <FinanceDashboard 
          user={currentUser} 
          onLogout={() => setCurrentUser(null)} 
        />
      )}
    </>
  );
}

export default App;
