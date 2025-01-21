import React, { useEffect } from 'react';

const ClearImagesOnLoad = () => {
    useEffect(() => {
        const clearImagesAndStopProcesses = async () => {
            try {
                await fetch('http://127.0.0.1:5000/clear_images', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("Images cleared and processes stopped successfully.");
            } catch (error) {
                console.error("Failed to clear images and stop processes:", error);
            }
        };

        clearImagesAndStopProcesses();
    }, []);

    return null;
};

export default ClearImagesOnLoad;
