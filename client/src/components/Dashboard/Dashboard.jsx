import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { GallerySection } from './GallerySection';

export const Dashboard = ({ processedImages }) => {
    const [images, setProcessedImages] = useState(processedImages);
    const [selectedEmotion, setSelectedEmotion] = useState('All Items');

    useEffect(() => {
        fetch('http://localhost:5000/get_processed_images')
            .then((response) => response.json())
            .then((data) => {
                setProcessedImages(data);
                console.log('Processed Images:', data);
            })
            .catch((error) => console.error('Error fetching processed images:', error));
    }, []);

    return (
        <div className="bg-transparent lg:bg-white pb-4 rounded-tr-3xl rounded-br-3xl p-4 lg:p-14 lg:pr-20 lg:pl-20 overflow-hidden h-full">
            <div className="card-header">
                <div className="card-header-name flex flex-col lg:flex-row justify-between items-start lg:items-center">
                    <h1 className="font-bold text-2xl lg:text-4xl text-gray-600 mb-3">Images</h1>
                </div>
                <Navigation onSelectEmotion={setSelectedEmotion} />
            </div>
            <div className="card-gallery-section overflow-y-auto h-full">
                <GallerySection processedImages={images} selectedEmotion={selectedEmotion} />
            </div>
        </div>
    );
};
