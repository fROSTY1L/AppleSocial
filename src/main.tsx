import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Изменили импорт
import Home from './pages/Home';
import Auth from './pages/Auth';
import './app/i18n';
import './app/reset-antd.css';
import { AuthProvider } from './api/AuthProvider';
import { AuthHandler } from './shared/AuthHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <AuthHandler />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);