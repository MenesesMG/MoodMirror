import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { createPortal } from 'react-dom';

export const GallerySection = ({ processedImages, selectedEmotion }) => {
    const [images, setImages] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        if (processedImages && processedImages.length > 0) {
            const newImages = processedImages.map((image, index) => ({
                url: image.url,
                name: image.filename,
            }));
            setImages(newImages);
        }
    }, [processedImages]);

    const handleBulkDownload = async () => {
        const zip = new JSZip();
        const folder = zip.folder("images");

        for (const image of images) {
            const response = await fetch(image.url);
            const blob = await response.blob();
            folder.file(image.name, blob);
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "images.zip");
        });
    };

    const filterImagesByEmotion = (images, emotion) => {
        if (emotion === 'All Items') {
            return images;
        }
        return images.filter(image => image.name.toLowerCase().includes(emotion.toLowerCase()));
    };

    const filteredImages = filterImagesByEmotion(images, selectedEmotion);

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    const toggleExpand = (index) => {
        setExpanded(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const truncateFilename = (filename, maxLength = 15) => {
        return filename.length > maxLength ? filename.substring(0, maxLength) + '...' : filename;
    };

    return (
        <div className="p-4 relative">
            <div className="flex justify-end mb-4 items-center h-[20px]">
                <div className="relative">
                    <svg 
                        onClick={() => setDropdownOpen(!dropdownOpen)} 
                        className="h-6 w-6 text-gray-500 hover:cursor-pointer" 
                        width="24" height="24" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >  
                        <path stroke="none" d="M0 0h24v24H0z"/>  
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                            <a 
                                href="#" 
                                onClick={handleBulkDownload} 
                                className="font-bold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                </svg>
                                Download All
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative h-[600px]">
                <Scrollbars 
                    autoHide 
                    autoHideTimeout={1000} 
                    autoHideDuration={200} 
                    style={{ height: '100%' }} 
                    renderThumbVertical={props => <div {...props} className="scrollbar-thumb" />}
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-16 pr-3 pb-20">
                        {filteredImages.length === 0 ? (
                            <div className="col-span-4 text-center text-gray-500">
                                Nothing found
                            </div>
                        ) : (
                            filteredImages.map((image, index) => (
                                <div key={index} className="relative flex flex-col items-center group">
                                    <img
                                        src={image.url}
                                        alt={`Gallery image ${index + 1}`}
                                        loading="lazy"
                                        className="w-[100px] h-[80px] sm:w-[120px] sm:h-[100px] md:w-[150px] md:h-[130px] lg:w-[180px] lg:h-[150px] object-cover rounded-lg hover:scale-105 hover:cursor-pointer duration-300"
                                        onClick={() => openModal(image.url)}
                                    />
                                    <p 
                                        className="mt-3 pt-4 text-sm italic text-gray-400 uppercase subpixel-antialiased hover:cursor-pointer" 
                                        onClick={() => toggleExpand(index)}
                                        title={image.name.length > 15 ? "Click to expand" : ""}
                                        style={{ margin: '0 5px' }}
                                    >
                                        {expanded[index] ? image.name : truncateFilename(image.name)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </Scrollbars>
            </div>

            {isModalOpen && createPortal(
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div className="relative">
                        <button
                            onClick={closeModal}
                            className="bg-black opacity-80 p-[5px] pr-[10px] pl-[10px] pb-[8px] rounded absolute right-2 top-2 text-white text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="md:max-w-full md:max-h-full lg:max-w-[800px] lg:max-h-[800px] object-contain"                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
