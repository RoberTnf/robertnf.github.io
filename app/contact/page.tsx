'use client'

import { useState, useEffect } from 'react';

export default function Contact() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const parts = ['rob', 'erto', 'diaz', 'tnf', ' at ', 'gma', 'il', ' dot ', 'com'];
        setEmail(parts.join(''));
    }, []);

    return <div>
        <h1>Contact me</h1>
        <p>You can contact me at: <span className="email-address">
            {email || 'Loading email with js to avoid spam bots'}
        </span></p>
    </div>
}
