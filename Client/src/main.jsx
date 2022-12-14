import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core';
import axios from 'axios';

axios.defaults.withCredentials = true

// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MantineProvider>
)
