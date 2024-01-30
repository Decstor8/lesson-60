import React, { useState, useEffect } from 'react';
import Chat from './components/Chat/Chat';
import {Messages} from "./type";

const App: React.FC = () => {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [dateTime, setDateTime] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const url = `http://146.185.154.90:8000/messages${dateTime && `?datetime=${dateTime}`}`;


                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        ...data
                    ]);

                    setDateTime(data[data.length - 1].datetime);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };


        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    },[dateTime]);

    const submit = async (author: string, message: string) => {
        try {
            const messageText = new URLSearchParams();
            messageText.append('author', author);
            messageText.append('message', message);

            await fetch('http://146.185.154.90:8000/messages', {
                method: 'POST',
                body: messageText,
            });
        } catch (error) {
            console.error('Ошибка с сообщением:', error);
        }
    };

    return (
        <div>
            <Chat messages={messages} onSubmit={submit} />
        </div>
    );
};

export default App;
