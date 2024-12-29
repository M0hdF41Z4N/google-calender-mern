import React from 'react';
import { gapi } from 'gapi-script';

const GoogleSignIn = () => {
    const handleLogin = () => {
        const auth = gapi.auth2.getAuthInstance();
        auth.signIn().then((user) => {
            const token = user.getAuthResponse().access_token;
            console.log(token);
        });
    };

    return (
        <div>
            <button onClick={handleLogin}>Sign in with Google</button>
        </div>
    );
};

export default GoogleSignIn;
