import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Buffer } from "buffer"; 
import { Toaster } from 'react-hot-toast';
import './i18n';

window.Buffer = Buffer;

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};


ReactDOM.render(
  <React.StrictMode>
    
    <Router>
    <Toaster 
      position="top-right"
      toastOptions={{
        style:{
          borderRadius: '10px',
          background: '#1f2937',
          color: '#fff',
        }
      }}
      />
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)