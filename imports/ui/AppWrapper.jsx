import React from 'react';
import { App } from './App.jsx';
import { BrowserRouter } from "react-router-dom";

export const AppWrapper = () => {
  return (
    <BrowserRouter>
        <App />
    </BrowserRouter>
  );
};