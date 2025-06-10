import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const email = localStorage.getItem('user_email');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/login'); // Если не авторизован — перекидываем на страницу входа
    }
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Добро пожаловать{email ? `, ${email}` : ''}!</h2>
      <p>Это главная страница вашего проекта.</p>
      <button onClick={handleLogout} style={{ padding: 10, marginTop: 20 }}>
        Выйти
      </button>
    </div>
  );
}

export default Home;
