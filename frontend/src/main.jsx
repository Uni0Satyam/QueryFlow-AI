import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx';
import Notfound from './landingpage/error/NotFound.jsx'
import Auth from './landingpage/authentication/Auth.jsx';
import Protected from './Protected.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/" element={<Protected />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)