import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});

export const detectEmotion = async (imageFiles, onUploadProgress) => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
        formData.append('images', file);
    });

    const response = await api.post('/detect_emotion', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
    });

    return response.data;
};
