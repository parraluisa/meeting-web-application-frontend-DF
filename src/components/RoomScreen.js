/**
 * RoomScreen component renders the meeting room or thank you screen based on the user's meeting status.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.userName - The name of the user
 * @param {boolean} props.cameraEnabled - Flag indicating if the camera is enabled
 * @param {boolean} props.microphoneEnabled - Flag indicating if the microphone is enabled
 * @returns {JSX.Element} The RoomScreen component
 */
import React, { useState, useEffect } from 'react';
import MeetingRoom from './MeetingRoom';
import ThankYouScreen from './ThankYouScreen';

import '../styles/RoomScreen.css';

const RoomScreen = ({ userName, cameraEnabled, microphoneEnabled }) => {
  
    const [inMeeting, setInMeeting] = useState(true);

   
    const handleExit = () => {
        console.log('El usuario ha salido de la reunión');
        setInMeeting(false); 
    };

    useEffect(() => {
        console.log(`Usuario: ${userName}`);
        console.log(`Cámara activada: ${cameraEnabled}`);
        console.log(`Micrófono activado: ${microphoneEnabled}`);
    }, [userName, cameraEnabled, microphoneEnabled]);

    return (
        <div className="room-screen">
            {/* conditional Render */}
            {inMeeting ? (
                <MeetingRoom
                    userName={userName}
                    cameraEnabled={cameraEnabled}
                    microphoneEnabled={microphoneEnabled}
                    onExit={handleExit} 
                />
            ) : (
                <ThankYouScreen /> 
            )}
        </div>
    );
};

export default RoomScreen;
