// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';
import AuthProvider from './context/AuthContext';
import PdfProvider from './context/PdfContext';

const App = () => {
  return (
    <AuthProvider>
      <PdfProvider>
        <Router>
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </PdfProvider>
    </AuthProvider>
  );
};

export default App;
