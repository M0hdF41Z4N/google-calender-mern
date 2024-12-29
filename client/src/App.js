import React, { useState } from 'react';
import GoogleSignIn from './components/GoogleSignIn';
import EventForm from './components/EventForm';

const App = () => {
  const [userId, setUserId] = useState(null); // Store user ID after sign-in

  return (
      <div>
          <h1>Google Calendar Integration</h1>
          {!userId ? (
              <GoogleSignIn setUserId={setUserId} />
          ) : (
              <EventForm userId={userId} />
          )}
      </div>
  );
};

export default App;
