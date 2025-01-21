import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Uploadpage from './pages/uploadpage';
import Gallerypagetest from './pages/gallerypagetest';

function App() {
    const [uploadedImages, setUploadedImages] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Uploadpage setUploadedImages={setUploadedImages} />} />
                <Route path="/gallerypagetest" element={<Gallerypagetest uploadedImages={uploadedImages} />} />
            </Routes>
        </Router>
    );
}

export default App;
