/**
 * Main application component.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */

 /**
 * Handles the join event, setting the user's name, camera, and microphone preferences.
 * 
 * @param {string} name - The name of the user.
 * @param {boolean} videoDevice - The user's camera preference.
 * @param {boolean} audioDevice - The user's microphone preference.
 */
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import RoomScreen from './components/RoomScreen';

function App() {
    const [userName, setUserName] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

    const handleJoin = (name, videoDevice, audioDevice) => {
        setUserName(name);
        setCameraEnabled(videoDevice); // Save camera preference
        setMicrophoneEnabled(audioDevice); // Save microphone preference
        setIsJoined(true);
    };

    return (
        <div>
            {!isJoined ? (
                <WelcomeScreen onJoin={handleJoin} />
            ) : (
                <RoomScreen
                    userName={userName}
                    cameraEnabled={cameraEnabled}
                    microphoneEnabled={microphoneEnabled}
                />
            )}
        </div>
    );
}

export default App;
