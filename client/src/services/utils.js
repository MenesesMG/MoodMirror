// client/src/services/utils.js

/**
 * Process image files and create URL objects with names
 * @param {Array} files - Array of image files
 * @returns {Array} - Array of image objects with url and name properties
 */
export const processImageFiles = (files) => {
    return files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
  };
  
  /**
   * Count occurrences of facial expressions in image names
   * @param {Array} images - Array of image objects
   * @returns {Object} - Object with counts of each facial expression
   */
  export const countFacialExpressions = (images) => {
    const counts = {
      Angry: 0,
      Disgust: 0,
      Fear: 0,
      Happy: 0,
      Neutral: 0,
      Sad: 0,
      Surprise: 0,
    };
  
    images.forEach(image => {
      const expression = Object.keys(counts).find(key => image.name.toUpperCase().includes(key.toUpperCase()));
      if (expression) {
        counts[expression]++;
      }
    });
  
    return counts;
  };
  