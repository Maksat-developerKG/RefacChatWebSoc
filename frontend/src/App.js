import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import ChatTest from './ChatTest'; // <-- импортируем новый компонент

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat-test" element={<ChatTest />} /> {/* добавляем маршрут */}
      </Routes>
    </Router>
  );
}

export default App;
