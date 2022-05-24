import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaitingScreenCustom from './components/WaitingScreenCustom';

const Home = lazy(() => import('./routes/Home'));
const Login = lazy(() => import('./routes/Login'));
const Register = lazy(() => import('./routes/Register'));
const Profile = lazy(() => import('./routes/Profile'));

function App() {
  

  return (
    <Router>
      <Suspense fallback={<WaitingScreenCustom sizeIcon={64} />}>
        <Routes>
          <Route path="/" element={<Home title="Trang chủ | Lobo" />} />
          <Route path="/:id" element={<Profile />} />
          <Route path="/login" element={<Login title="Đăng nhập | Lobo" />} />
          <Route path="/register" element={<Register title="Đăng ký | Lobo" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
