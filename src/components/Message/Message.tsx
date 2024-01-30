import React from 'react';
import dayjs from 'dayjs';
import {Messages} from "../../type";

interface MessageProps {
    message: Messages;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className="block-message">
            <a className="name-message">{message.author}</a>
            <span className="date-message">{dayjs(message.datetime).format('YYYY-MM-DD HH:mm')}</span>
            <p className="text-message">{message.message}</p>
        </div>
    );
};
export default Message;
