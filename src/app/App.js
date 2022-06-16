import React, { 
  Suspense, 
  lazy
} from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import 
  WaitingScreenCustom 
from './components/WaitingScreenCustom';

const Home = lazy(() => import('./routes/Home'));
const Login = lazy(() => import('./routes/Login'));
const Register = lazy(() => import('./routes/Register'));
const Test = lazy(() => import('./components/WaitingScreenCustom'))

function App() {
  return (
    <Router>
      <Suspense fallback={<WaitingScreenCustom sizeIcon={64} />}>
        <Routes>
          <Route path="/test" element={<Test sizeIcon='64px' />} />
          <Route path="/login" element={<Login title="Đăng nhập | Lobo" />} />
          <Route path="/register" element={<Register title="Đăng ký | Lobo" />} />
          <Route path="/*" element={<Home title="Trang chủ | Lobo" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
