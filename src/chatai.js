import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { user } from './globals';

function ChatAI() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);

        return () => {
            window.removeEventListener('resize', setVH);
            window.removeEventListener('orientationchange', setVH);
        };
    }, []);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const systemPrompt = {
            role: "system",
            content: "คุณเป็นผู้เชี่ยวชาญด้านการแพทย์ สามารถวิเคราะห์อาการเจ็บป่วยได้อย่างแม่นยำ หากได้ข้อมูลไม่ครบไม่สามารถวินิจฉัยได้ให้ถามกลับเพิ่อขอรายละเอียดเพิ่มเติม กรุณาตอบให้สั้นๆไม่เกิน 500 ตัวอักษรให้ได้ใจความเป็นภาษาไทยเท่านั้น"
        };

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://ai.moph.go.th/ollama/api/v1/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-oss:20b',
                    messages: [systemPrompt, ...newMessages],
                    stream: false,
                    options: {
                        num_predict: 500
                    }
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
         <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
                <div className="max-w-md mx-auto shadow-2xl backdrop-blur-sm bg-white/10 flex flex-col" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
                    <header className="flex items-center justify-between p-3 sm:p-4 md:p-6 text-white flex-shrink-0 sticky top-0 z-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400">
                        <button onClick={() => navigate(-1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-lg sm:text-xl font-bold">คุยกับ AI</h1>
                        <div className="w-6"></div>
                    </header>

                <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end space-x-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'assistant' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                            )}
                            <div className={`p-3 rounded-2xl max-w-xs sm:max-w-sm shadow-lg ${msg.role === 'user' ? 'bg-emerald-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shadow-lg overflow-hidden">
                                    {user.picture ? (
                                        <img src={process.env.PUBLIC_URL + user.picture} alt="User" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end space-x-2 justify-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div className="p-3 rounded-2xl rounded-bl-none max-w-xs sm:max-w-sm bg-white text-gray-800 shadow-lg">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="p-3 sm:p-4 md:p-6 flex-shrink-0 bg-white border-t">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                            className="w-full bg-gray-100 border border-gray-300 rounded-full py-1.5 sm:py-2 px-4 text-xs sm:text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-emerald-500 rounded-full p-2 text-white font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition disabled:opacity-50"
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