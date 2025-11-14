import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy Diana, tu asistente migratoria. ¿En qué te ayudo hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hay un error. Intenta de nuevo.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border z-50">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">Diana - Asistente Migratoria</div>
      <div className="h-96 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block p-3 rounded-lg max-w-xs ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-500">Escribiendo...</div>}
      </div>
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu duda..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Enviar
        </button>
      </div>
    </div>
  );
}
