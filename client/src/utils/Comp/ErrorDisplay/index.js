import React from 'react';
import { Typography, Button, Box, Paper } from '@material-ui/core';
import { Error as ErrorIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import './ErrorDisplay.css';

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  title = 'Something went wrong',
  showRetry = true,
  fullPage = false 
}) => {
  const containerClass = fullPage ? 'error-display error-display--fullpage' : 'error-display';
  
  return (
    <Paper 
      className={containerClass}
      elevation={2}
      aria-live="assertive"
      role="alert"
    >
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        p={3}
      >
        <ErrorIcon 
          color="error" 
          style={{ fontSize: 48, marginBottom: '1rem' }}
          aria-hidden="true"
        />
        
        <Typography 
          variant="h6" 
          color="error" 
          gutterBottom
          align="center"
        >
          {title}
        </Typography>
        
        {error && (
          <Typography 
            variant="body2" 
            color="textSecondary" 
            align="center"
            style={{ marginBottom: '1rem' }}
          >
            {typeof error === 'string' ? error : error.message || 'An unexpected error occurred'}
          </Typography>
        )}
        
        {showRetry && onRetry && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            aria-label="Retry the failed operation"
          >
            Try Again
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ErrorDisplay;
