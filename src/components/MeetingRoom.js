/**
 * MeetingRoom component handles the video conferencing room functionality.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.roomId - The ID of the meeting room.
 * @param {string} props.userName - The name of the user.
 * @param {string} props.userId - The ID of the user.
 * @param {boolean} props.cameraEnabled - Initial state of the camera (enabled/disabled).
 * @param {boolean} props.microphoneEnabled - Initial state of the microphone (enabled/disabled).
 * @param {Function} props.onExit - Callback function to handle exit action.
 * 
 * @returns {JSX.Element} The MeetingRoom component.
 * 
 * @example
 * <MeetingRoom
 *   roomId="12345"
 *   userName="John Doe"
 *   userId="user123"
 *   cameraEnabled={true}
 *   microphoneEnabled={true}
 *   onExit={() => console.log('Exited')}
 * />
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import io from 'socket.io-client';
import '../styles/MeetingRoom.css';

const MeetingRoom = ({ roomId, userName, userId, cameraEnabled, microphoneEnabled, onExit }) => {
  const [isCameraEnabled, setIsCameraEnabled] = useState(cameraEnabled);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(microphoneEnabled);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devices, setDevices] = useState({ camera: [], microphone: [], speaker: [] });
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedMicrophone, setSelectedMicrophone] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('');
  const [participants, setParticipants] = useState([]);
  const socket = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // devices configuration
  useEffect(() => {
    const getDevices = async () => {
      try {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const cameras = mediaDevices.filter((device) => device.kind === 'videoinput');
        const microphones = mediaDevices.filter((device) => device.kind === 'audioinput');
        const speakers = mediaDevices.filter((device) => device.kind === 'audiooutput');
        

        setDevices({ camera: cameras, microphone: microphones, speaker: speakers });

        if (cameras.length > 0) setSelectedCamera(cameras[0].deviceId);
        if (microphones.length > 0) setSelectedMicrophone(microphones[0].deviceId);
        if (speakers.length > 0) setSelectedSpeaker(speakers[0].deviceId);
      } catch (error) {
        console.error('Error obteniendo dispositivos de medios:', error);
      }
    };

    getDevices();
  }, []);

  // camera and microphone configuration
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedCamera },
          audio: { deviceId: selectedMicrophone },
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accediendo a dispositivos de medios:', error);
      }
    };

    getUserMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedCamera, selectedMicrophone]);

  // WebSocket management for real-time communication
  useEffect(() => {
    socket.current = io('http://localhost:3001'); 
    socket.current.emit('joinRoom', { roomId, userId });

    socket.current.on('updateParticipants', (updatedParticipants) => {
      setParticipants(updatedParticipants);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [roomId, userId]);

  return (
    <div className="meeting-room-screen">
      {/* View for participants and users*/}
      <div className="meeting-video-container">
        {/* Other participants view */}
        {participants.map((participant) => (
          <div key={participant.userId} className="participant-video">
            <video autoPlay muted={participant.userId !== userId} />
            <div>{participant.name}</div>
          </div>
        ))}

        {/* personal Video */}
        <div className="participant-video">
          <video ref={videoRef} className={`video-preview ${isCameraEnabled ? '' : 'hidden'}`} autoPlay muted />
          {!isCameraEnabled && <div className="camera-disabled">Cámara desactivada</div>}
          <div className="user-name-overlay">{userName}</div>
        </div>
      </div>

      {/* user controls */}
      <div className="control-bar">
        <div onClick={() => setIsCameraEnabled((prev) => !prev)} className="control-icon">
          {isCameraEnabled ? <FaVideo /> : <FaVideoSlash />}
        </div>
        <div onClick={() => setIsMicrophoneEnabled((prev) => !prev)} className="control-icon">
          {isMicrophoneEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </div>
        <div onClick={() => setIsModalOpen(true)} className="control-icon">
          <FaCog />
        </div>
        <div onClick={onExit} className="control-icon">
          <FaSignOutAlt />
        </div>
      </div>

      {/* Modal configuration */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Configuración de Dispositivos</h3>
            <div className="config-group">
              <label>Cámara</label>
              <select
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
              >
                {devices.camera.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || 'Cámara desconocida'}
                  </option>
                ))}
              </select>
            </div>
            <div className="config-group">
              <label>Micrófono</label>
              <select
                value={selectedMicrophone}
                onChange={(e) => setSelectedMicrophone(e.target.value)}
              >
                {devices.microphone.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || 'Micrófono desconocido'}
                  </option>
                ))}
              </select>
            </div>
            <div className="config-group">
              <label>Altavoz</label>
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
              >
                {devices.speaker.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || 'Altavoz desconocido'}
                  </option>
                ))}
              </select>
            </div>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingRoom;
