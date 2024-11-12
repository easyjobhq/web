'use client'

import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { Message } from '@/interfaces/message';
import { authService } from '@/services';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/hooks/auth/getCurrentUser';

function page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const user = getCurrentUser();

    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [groupChatId, setGroupChatId] = useState('');

    const loadInitialMessages = async () => {
        try {
            const newGroupChat = await authService.getChatsClientProfessional(user.id, params.id);
            setGroupChatId(newGroupChat.id);
            setMessages(newGroupChat.chats);
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInitialMessages();
    }, []);

    useEffect(() => {
        if (!groupChatId || socket) return;  // Only create the socket if groupChatId is set and socket is not already created

        const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
            transports: ['websocket'],
            autoConnect: true,
        });

        socketInstance.on('connect', () => {
            setConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setConnected(false);
        });

        // Listen for messages in the specific group chat
        socketInstance.on(groupChatId, (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.off(groupChatId);
            socketInstance.disconnect();
        };
    }, [groupChatId]);  // Depend on groupChatId

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim() && socket) {
            socket.emit('message', {
                chatroom_id: groupChatId,
                message: messageInput,
                client_id: user.id,
            });
            setMessageInput('');
        }
    };

    return (
        <div className='flex'>
            <div className="w-1/4 bg-blue-300">
                {params.id}
                All groupchats available
            </div>
            <div className="w-3/4">
                {/* Message container with overflow */}
                <div className="bg-white h-[70vh] p-10 overflow-y-auto">
                    {messages.map((message: Message, index) => (
                        <div
                            key={index}
                            className={`mb-4 flex ${message.client ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-lg p-3 ${
                                    message.client
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-yellow-300 text-gray-900 rounded-bl-none'
                                } break-words`}
                            >
                                <div className="text-xs opacity-75 mb-1">
                                    {message.client ? 'Tú' : 'Profesional'}
                                </div>
                                <div className="break-words">{message.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Input form */}
                <div className="p-3 border-t">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Escribe un mensaje..."
                        />
                        <button
                            type="submit"
                            disabled={!connected}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
    
}

export default page;
