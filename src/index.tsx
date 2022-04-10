// Import
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/style.css';

// Start application
const container = document.getElementById('root') as (Element | DocumentFragment);
const root = createRoot(container);
root.render(<App />);

// Report web vitals
reportWebVitals();
