import axios from 'axios';

const API_KEY = 'tAIdURDipgqWJHApslZW';
const API_URL = 'https://detect.roboflow.com/tooth-disease/1';

export const detectDentalDisease = async (image) => {
    try {
        const response = await axios({
            method: 'POST',
            url: API_URL,
            params: {
                api_key: API_KEY,
            },
            data: image,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error detecting dental disease:', error);
        throw error;
    }
};

export const detectDentalDiseaseFromURL = async (imageURL) => {
    try {
        const response = await axios({
            method: 'POST',
            url: API_URL,
            params: {
                api_key: API_KEY,
                image: imageURL,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error detecting dental disease:', error);
        throw error;
    }
};
