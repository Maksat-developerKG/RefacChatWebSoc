import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.0.103:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Пользователь успешно создан');
      } else {
        setMessage('❌ Ошибка: ' + JSON.stringify(data));
      }
    } catch (error) {
      setMessage('❌ Ошибка соединения с сервером');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя (необязательно)"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Зарегистрироваться
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
