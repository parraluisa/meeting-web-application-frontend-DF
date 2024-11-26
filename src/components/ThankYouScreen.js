/**
 * ThankYouScreen component renders a thank you message after a meeting.
 *
 * @component
 * @example
 * return (
 *   <ThankYouScreen />
 * )
 */
import React from 'react';
import '../styles/ThankYouScreen.css';

const ThankYouScreen = () => {

    return (
        <div className="thank-you-screen">
            <h2>Gracias por unirte a la reunión</h2>
            <p>Esperamos verte pronto en otra ocasión.</p>
        </div>
    );
};

export default ThankYouScreen;
