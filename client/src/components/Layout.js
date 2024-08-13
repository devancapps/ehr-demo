import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="app-container">
    <Navbar />
    <main className="main-content">{children}</main>
  </div>
);

export default Layout;