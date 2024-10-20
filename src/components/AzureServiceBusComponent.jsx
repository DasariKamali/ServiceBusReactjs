import React, { useState } from 'react';
import { ServiceBusClient } from '@azure/service-bus';
import { setLogLevel } from '@azure/logger';

setLogLevel('verbose');

const safeTrim = (value) => (value || '').trim();
const connectionString = safeTrim(import.meta.env.VITE_SERVICE_BUS_CONNECTION_STRING);
const queueName = safeTrim(import.meta.env.VITE_QUEUE_NAME);
const timeOutInMs = Number(import.meta.env.VITE_TIMEOUT_IN_MS) || 60000;

console.log('connectionString is:', connectionString);
console.log('queueName is:', queueName);
console.log('timeOutInMs is:', timeOutInMs);

function AzureServiceBusComponent() {
    const [responseMessage, setResponseMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    const sbClient = new ServiceBusClient(connectionString, {
        retryOptions: {
            timeoutInMs: timeOutInMs,
        },
    });

    const sender = sbClient.createSender(queueName);

    const sendMessage = async () => {
        try {
            await sender.sendMessages({ body: 'Hello World!' });
            setResponseMessage('Message sent successfully!');
        } catch (error) {
            console.error('Error sending messages:', error);
        }
    };

    const receiveMessage = async () => {
        const receiver = sbClient.createReceiver(queueName);
        try {
            const messages = await receiver.receiveMessages(5, { receiveMode: 'receiveAndDelete' });
            const newMessages = messages.map((msg) => msg.body);
            setReceivedMessages((prev) => [...prev, ...newMessages]);

            for (let msg of messages) {
                await receiver.completeMessage(msg);
            }
        } catch (error) {
            console.error('Error receiving messages:', error);
        } finally {
            await receiver.close();
            await sbClient.close();
        }
    };

    return (
        <div>
            <h2>Send Message to Azure Service Bus</h2>
            <button onClick={sendMessage}>Send Message</button>
            {responseMessage && <p>{responseMessage}</p>}
            <div>
                <h3>Received Messages</h3>
                <button onClick={receiveMessage}>Receive Messages</button>
                <ul>
                    {receivedMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AzureServiceBusComponent;
