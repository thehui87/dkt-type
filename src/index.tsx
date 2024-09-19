import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { store, persistor } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './context/themeContext';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeContextProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </ThemeContextProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
