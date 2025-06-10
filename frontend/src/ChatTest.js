// src/ChatTest.js
import React, { useState, useEffect, useRef } from 'react';

function ChatTest() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Адрес WebSocket сервера — меняй, если у тебя другой порт или путь
    ws.current = new WebSocket('ws://192.168.0.103:8000/ws/chat/testroom/');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((msgs) => [...msgs, data.message]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    ws.current.send(JSON.stringify({ message: input }));
    setInput('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Тест WebSocket чата</h2>
      <div style={{
        border: '1px solid gray',
        padding: 10,
        height: 200,
        overflowY: 'auto',
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        fontFamily: 'monospace',
      }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Введите сообщение"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ padding: 8, width: '70%', marginRight: 10 }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px' }}>Отправить</button>
    </div>
  );
}

export default ChatTest;
