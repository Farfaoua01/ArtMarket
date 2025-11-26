import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, Placeholder } from 'react-bootstrap';
import './checkout.css';
import { CardElement } from '@stripe/react-stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js';

function PayementForm({ price }) {
    const [cardn, setCardn] = useState('');
    const [exdate, setExdate] = useState('');
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const handleform = async (event) => {
        event.preventDefault();
        if (!stripe && !elements) {
            return
        }
        try {
            const response = await fetch("http://localhost:8001/api/create-intent-payement", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price }),
            })
            if (response.ok) {
                const res = await response.json();
                const cardElement = elements.getElement(CardElement);
                console.log('ggggggggggggggcard info ', cardElement);
                const { paymentIntent, error } = await stripe.confirmCardPayment(
                    res.clientSecret,
                    {
                        payment_method: {
                            card: cardElement,
                            billing_details: { name: 'Test User' },
                        },
                    }
                );
                if (error) {
                    setError(`Payment failed: ${error.message}`);
                    console.log('errroIIIIIIIIIIIIIIIIIIIIIIIIIIIr');
                } else if (paymentIntent.status === 'succeeded') {
                    setError(null);
                    console.log('ggggggggggggggggggggggggggggggggggg');
                }
            }

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <div>
                <Form onSubmit={handleform}>
                    <div style={{
                        marginTop: '13px', backgroundColor: '#f4f4f4', padding: '19px',
                        margin: '6px', fontSize: '18px', color: '#67696d'
                    }}>
                        <FormGroup >
                            <FormLabel>Card number *</FormLabel>
                            <CardNumberElement options={{
                                placeholder: 'Enter card number',
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#32325d',
                                    },
                                },
                            }} />
                        </FormGroup>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            margin: '11px 0px 11px 0px'
                        }}>
                            <FormGroup>
                                <FormLabel>Expiration Date *</FormLabel>
                                <CardExpiryElement options={{ placeholder: 'MM/YY ' }} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Security Code *</FormLabel>
                                <CardCvcElement options={{ placeholder: 'XXX' }} /> </FormGroup>
                        </div>
                    </div>
                    <Button type='submit' style={{
                        width: '100%', backgroundColor: 'black', height: '50px',
                        border: 'none', marginTop: '19px'
                    }}>Place order & Pay</Button>
                    <p style={{ color: 'red' }}>{error} </p>

                </Form>
            </div>
        </div>
    )
}

export default PayementForm;