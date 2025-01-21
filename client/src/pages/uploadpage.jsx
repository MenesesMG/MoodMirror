import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import moodmirrorLogo from '../assets/moodmirror-logo.png';
import { detectEmotion } from '../services/api';
import ClearImagesOnLoad from './ClearImagesOnLoad';  
import videoBg from '../assets/videoBg.mp4';

// Remove the Socket.IO import and initialization
// import io from 'socket.io-client';
// const socket = io('http://127.0.0.1:5000');

function Uploadpage({ setUploadedImages }) {
    const [images, setImages] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [totalSize, setTotalSize] = useState(0); 
    const [uploadedSize, setUploadedSize] = useState(0); 
    const [loading, setLoading] = useState(false); 
    const [headerVisible, setHeaderVisible] = useState(false); 
    const [uploadAreaVisible, setUploadAreaVisible] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize EventSource for SSE
        const eventSource = new EventSource('http://127.0.0.1:5000/progress');

        eventSource.onmessage = (event) => {
            const progress = event.data;
            setUploadProgress(progress);
        };

        eventSource.onerror = (error) => {
            console.error('Error with event source:', error);
        };

        // Clean up EventSource when component unmounts
        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        setHeaderVisible(true);

        const timer = setTimeout(() => {
            setUploadAreaVisible(true); 
        }, 2000); 

        return () => clearTimeout(timer); 
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        setImages(files);
        setTotalSize(totalSize);
    
        detectEmotions(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = Array.from(e.dataTransfer.files);
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        setImages(files);
        setTotalSize(totalSize);
        detectEmotions(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const detectEmotions = async (files) => {
        setLoading(true); 
        try {
            const response = await detectEmotion(files, (progressEvent) => {
                const { loaded, total } = progressEvent;
                const percentage = Math.round((loaded * 100) / total);
                setUploadProgress(percentage); 
                setUploadedSize(loaded); 
            });

            console.log('Response from detectEmotion:', response);
            const { results, errors } = response;

            if (results && results.length > 0) {
                setUploadedImages(results);
                navigate('/gallerypagetest');
            } else {
                console.error('No valid results:', errors);
                alert('No valid images were processed.');
            }
        } catch (error) {
            console.error('Error during emotion detection:', error);
            alert("An error occurred while detecting emotions. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    const formatSize = (size) => {
        return size < 1024 ? `${size} B` 
             : size < 1048576 ? `${(size / 1024).toFixed(2)} KB`
             : `${(size / 1048576).toFixed(2)} MB`;
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
                <source src={videoBg} type="video/mp4" />
            </video>
            <div className="relative z-10 w-full p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center">
                <ClearImagesOnLoad />
                <header className={`flex flex-col items-center justify-center text-center ${headerVisible ? 'fade-in' : ''}`}>
                    <div className="header-description font-normal text-base text-gray-500 m-[48px] mt-[80px] w-full max-w-lg">
                        <p className='font-semibold text-gray-700 subpixel-antialiased'>A tool designed for emotion detection through facial recognition.</p>
                    </div>
                    <div className="header-log hover:cursor-pointer">
                        <picture>
                            <source media="(max-width: 627px)" srcSet={moodmirrorLogo}/>
                            <img src={moodmirrorLogo} alt="MoodMirror Logo" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" />
                        </picture>
                    </div>
                    <p className='font-medium text-gray-700 subpixel-antialiased mt-[20px]'>Unmask Emotions Effortlessly.</p>
                    <p className='font-normal text-sm text-gray-500 subpixel-antialiased mt-[10px] -mb-[30px]'>Upload images below*</p>
                </header>
                {headerVisible && (
                    <div className={`uploadcard-container flex flex-col items-center ${uploadAreaVisible ? 'fade-in' : 'hidden'}`}>
                        <div className="uploadcard bg-white p-6 rounded-3xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] text-center w-full m-[80px] max-w-lg">
                            <div className="uploadcard-header mb-8">
                                <h1 className="text-2xl font-bold m-[20px]">Upload your Files</h1>
                                <p className="font-light text-sm italic text-gray-500">Files should be JPG, or PNG.</p>
                            </div>
                            <div className={`animate-pulse uploadcard-upload-area h-[271px] flex flex-col items-center justify-center gap-2 mx-auto border-dashed border-2 ${dragging ? 'border-red-400 bg-red-50' : 'border-orange-200'} rounded-lg`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}>
                                <div className="uploadcard-icon">
                                    <svg className="h-12 w-12 text-red-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                        <polyline points="7 9 12 4 17 9" />
                                        <line x1="12" y1="4" x2="12" y2="16" />
                                    </svg>
                                </div>
                                <div className="upload-description text-sm font-light text-gray-500">
                                    {images.length > 0 ? (
                                        <p>{images.length} files ready to process</p>
                                    ) : (
                                        <p>Drag & Drop your files here</p>
                                    )}
                                </div>
                                <button onClick={() => document.getElementById('file-input').click()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg">Browse Files</button>
                                <input type="file" id="file-input" accept="image/png, image/jpeg" multiple onChange={handleImageChange} className="hidden" />
                            </div>
                            {images.length > 0 && (
                                <>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">{formatSize(uploadedSize)} / {formatSize(totalSize)}</p>
                                    <p className='mb-1 text-gray-500 font-bold'>Images processing..</p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Uploadpage;
