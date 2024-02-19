import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserTokenProvider from './Context/userToken';
import { QueryClient, QueryClientProvider } from 'react-query';


const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()


root.render(

    <QueryClientProvider client={queryClient}>
        <UserTokenProvider>
            <App />
        </UserTokenProvider>
    </QueryClientProvider>


);


reportWebVitals();
