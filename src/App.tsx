import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import EditPhotoPage from './pages/EditPhotoPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/photos/:id" element={<PhotoDetailPage />} />
          <Route path="/edit/:id" element={<EditPhotoPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;