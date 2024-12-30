import React , { useState  } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {GOOGLE_CALENDER_SCOPE_URL, LOGIN_URL} from '../constants/urls.js';

const GoogleSignIn = ({setUserId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const login = useGoogleLogin({
        clientId : process.env.REACT_APP_CLIENT_ID,
        flow:"auth-code",
        scope: GOOGLE_CALENDER_SCOPE_URL, // Request read-only access to Calendar
        onSuccess: async (credentialResponse) => {
          setIsLoading(true); 
          try {
            const response = await axios.post(LOGIN_URL, {
              code: credentialResponse.code 
            });
    
            if (response.status === 200) {
              setUserId(response.data.userId); 
              localStorage.setItem('userId', response.data.userId);
              setIsLoading(false);
            } else {
              console.error('Error fetching tokens from backend:', response.data);
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error saving token:', error);
            setIsLoading(false);
          }
        },

        onError: (error) => {
          console.error('Login Failed:', error);
          setIsLoading(false);
        },
      });
    
    return (
      <div className="sign-in-container">
      {isLoading ? (
          <div id="button-skeleton" className="skeleton"></div>
      ) : (
          <>
              <button id="sign-in-button" onClick={login}>Sign in with Google</button>
              {error && <div style={{ color: 'red' }}>{error}</div>}
          </>
      )}
  </div>
    );
};

export default GoogleSignIn;
