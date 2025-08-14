import React from 'react';
import { CircularProgress, Box, Typography } from '@material-ui/core';
import './Loading.css';

const Loading = ({ 
  message = 'Loading...', 
  size = 60, 
  variant = 'indeterminate',
  fullPage = false,
  color = 'secondary'
}) => {
  const containerClass = fullPage ? 'loading loading--fullpage' : 'loading';
  
  return (
    <Box 
      className={containerClass}
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      aria-live="polite"
      aria-busy="true"
    >
      <CircularProgress 
        size={size} 
        variant={variant}
        color={color}
        style={{ color: '#dc3545' }}
        aria-label="Loading"
      />
      {message && (
        <Typography 
          variant="body2" 
          className="loading__message"
          role="status"
          style={{ marginTop: '1rem', textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
