import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Notfound from './NotFound.jsx'
import Auth from './Auth.jsx';
import { AuthProvider } from './AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)