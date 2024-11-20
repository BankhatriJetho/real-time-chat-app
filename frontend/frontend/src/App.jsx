import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('sendMessage', { username: 'User', message });
            setMessage('');
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Real-Time Chat</h1>
            <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <div style={{ marginTop: '1rem' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ width: '80%', padding: '0.5rem' }}
                />
                <button onClick={sendMessage} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
