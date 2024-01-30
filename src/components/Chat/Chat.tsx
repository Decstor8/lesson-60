import React from 'react';
import Message from '../Message/Message';
import {Messages} from '../../type';

interface ChatProps {
    messages: Messages[];
    onSubmit: (author: string, message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSubmit }) => {
    return (
        <div>
            <div id="loader">Loading...</div>
            <div id="chat">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onSubmit(formData.get('author') as string, formData.get('message') as string);
            }}>
                <input type="text" name="author" placeholder="Ваше имя" required />
                <input type="text" name="message" placeholder="Ваше сообщение" required />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default Chat;
