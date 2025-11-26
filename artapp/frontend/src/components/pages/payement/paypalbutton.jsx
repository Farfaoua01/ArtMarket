import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function Paypalbutton() {
    return (
        <>
            <PayPalButtons style={{
                color: 'gold'
            }} />
        </>
    )

}

export default Paypalbutton;