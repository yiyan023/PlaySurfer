import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</AuthProvider>
	</BrowserRouter>
  </React.StrictMode>,
)
