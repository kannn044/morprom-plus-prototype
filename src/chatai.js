import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatAI() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://10.1.0.101:8080/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-oss:20b',
                    messages: [{ role: 'user', content: input }],
                    stream: false,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiMessage = data?.choices?.[0]?.message?.content || data?.message?.content || 'No response received';
            setMessages([...newMessages, { role: 'assistant', content: aiMessage }]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I am having trouble connecting.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400 min-h-screen">
            <div className="max-w-md mx-auto min-h-screen shadow-2xl backdrop-blur-sm bg-white/10 flex flex-col">
                <header className="flex items-center justify-between p-3 sm:p-4 md:p-6 text-white flex-shrink-0">
                    <button onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold">AI Chat</h1>
                    <div className="w-6"></div>
                </header>

                <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs sm:max-w-sm ${msg.role === 'user' ? 'bg-white/30 text-white' : 'bg-white/10 text-white'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="p-3 rounded-lg max-w-xs sm:max-w-sm bg-white/10 text-white">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="p-3 sm:p-4 md:p-6 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                            className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-1.5 sm:py-2 px-4 text-xs sm:text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition disabled:opacity-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default ChatAI;
