export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Add more utility functions as needed