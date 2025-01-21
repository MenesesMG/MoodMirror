# MoodMirror

**MoodMirror** is a web application for facial expression recognition, leveraging the **Residual Masking Network** (RMN) for emotion detection. Initially a school project on **Google Colab**, the project has evolved into a fully deployed web app, built with **React** (frontend) and **Flask** (backend), styled with **Tailwind CSS**.

## Features

- **Facial Expression Detection**: Upload an image to detect facial expressions.
- **Real-Time Analysis**: Powered by **Residual Masking Network** for accurate results.
- **Modern UI**: Built with **React** and styled using **Tailwind CSS**.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask
- **Facial Expression Detection**: Residual Masking Network
- **Deployment**: Docker, Railway

## Live Demo

Try the app live: [MoodMirror](https://moodmirror-production.up.railway.app/)

## Installation

### Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies and run the frontend:

   ```bash
   npm install
   npm run dev
   ```

### Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Run the backend:

   ```bash
   python app.py
   ```


## Acknowledgments

- **Residual Masking Network (RMN)** for facial expression recognition:  
  **Pham, L., Vu, T. H., & Tran, T. A. (2021).** Facial Expression Recognition Using Residual Masking Network. *Proceedings of the 2020 25th International Conference on Pattern Recognition (ICPR)*, 4513–4519. IEEE.  
  [GitHub Repository](https://github.com/phamquiluan/ResidualMaskingNetwork)  
  Thank you to the authors for making their research available.

## Project Origin and Evolution

MoodMirror started as a school experiment on **Google Colab**, aiming to explore the capabilities of deep learning models for emotion detection. Motivated by the promising results, it was transformed into a web app to make the functionality more accessible to users. 

The app uses **Residual Masking Network**, a state-of-the-art model designed for facial expression recognition, making it both innovative and practical.
