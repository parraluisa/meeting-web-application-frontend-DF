/**
 * WelcomeScreen component renders a welcome screen for the meeting application.
 * It allows the user to enter their name, enable/disable camera and microphone, and join the meeting.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onJoin - Callback function to handle the join action.
 *
 * @returns {JSX.Element} The rendered WelcomeScreen component.
 */
import React, { useState, useRef, useEffect } from 'react';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import '../styles/WelcomeScreen.css';

const WelcomeScreen = ({ onJoin }) => {
    const [userName, setUserName] = useState('');
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const stopCameraStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            if (videoRef.current) videoRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: cameraEnabled, audio: microphoneEnabled });
                streamRef.current = stream;
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        if (cameraEnabled) {
            getUserMedia();
        } else {
            stopCameraStream();
        }

        return () => stopCameraStream();
    }, [cameraEnabled, microphoneEnabled]);

    const handleJoin = () => {
        if (!userName) {
            alert("Por favor ingresa un nombre antes de unirte.");
            return;
        }
        onJoin(userName, cameraEnabled, microphoneEnabled);
    };

    return (
        <div className="welcome-screen">
            <h2>Bienvenido</h2>
            <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <div className="welcome-video-container">
                <video
                    ref={videoRef}
                    className={`video-preview ${cameraEnabled ? '' : 'hidden'}`}
                    autoPlay
                    muted
                />
                {!cameraEnabled && <div className="camera-disabled">Cámara desactivada</div>}
                <div className="controls">
                    <div onClick={() => setCameraEnabled(prev => !prev)} className="control-icon">
                        {cameraEnabled ? <FaVideo /> : <FaVideoSlash />}
                    </div>
                    <div onClick={() => setMicrophoneEnabled(prev => !prev)} className="control-icon">
                        {microphoneEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    </div>
                </div>
            </div>


            <button onClick={handleJoin}>Unirse</button>
        </div>
    );
};

export default WelcomeScreen;
