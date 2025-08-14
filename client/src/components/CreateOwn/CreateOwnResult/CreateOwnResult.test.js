import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateOwnResult from '../index';

// Mock ModalComp
jest.mock('../../../../utils/Comp/ModalComp', () => {
  return function MockModalComp({ children, isModalOpen }) {
    return isModalOpen ? <div data-testid="modal">{children}</div> : null;
  };
});

const mockSummary = {
  createdCustom: {
    destination: {
      name: 'Goa',
      price: 15000,
      spots: ['Beach', 'Fort', 'Church']
    },
    duration: {
      start: '2023-12-01',
      end: '2023-12-05'
    },
    startCity: 'Mumbai',
    endCity: 'Mumbai',
    reachAssistance: 'withUs',
    reachTransport: {
      mode: 'Flight',
      price: 8000
    },
    spotTransport: {
      mode: 'Taxi',
      price: 2000
    },
    stay: {
      preference: 'Hotel',
      price: 12000
    },
    food: {
      preference: 'Local',
      price: 5000
    },
    activities: [
      { _id: '1', name: 'Water Sports', price: 3000 },
      { _id: '2', name: 'Sightseeing', price: 2000 }
    ]
  }
};

describe('CreateOwnResult Component', () => {
  const defaultProps = {
    isResultOpen: true,
    setIsResultOpen: jest.fn(),
    summary: mockSummary
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<CreateOwnResult {...defaultProps} />);
    
    // Component shows loading initially
    expect(screen.getByText('Loading summary...')).toBeInTheDocument();
  });

  test('renders summary when data is available', async () => {
    render(<CreateOwnResult {...defaultProps} />);
    
    // Wait for loading to complete and summary to render
    await screen.findByText('Summary');
    
    expect(screen.getByText('Goa')).toBeInTheDocument();
    expect(screen.getByText('Mumbai')).toBeInTheDocument();
    expect(screen.getByText('Beach')).toBeInTheDocument();
    expect(screen.getByText('Water Sports')).toBeInTheDocument();
    expect(screen.getByText('INR 47,000')).toBeInTheDocument(); // Total estimate
  });

  test('renders error state when no data provided', async () => {
    const propsWithoutData = {
      ...defaultProps,
      summary: {}
    };
    
    render(<CreateOwnResult {...propsWithoutData} />);
    
    await screen.findByText('No summary available.');
  });

  test('handles missing optional fields gracefully', async () => {
    const incompleteData = {
      ...defaultProps,
      summary: {
        createdCustom: {
          destination: { name: 'Goa' },
          // Missing many fields
        }
      }
    };
    
    render(<CreateOwnResult {...incompleteData} />);
    
    await screen.findByText('Summary');
    expect(screen.getByText('Goa')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument(); // For missing fields
  });

  test('calculates total correctly with partial data', async () => {
    const partialData = {
      ...defaultProps,
      summary: {
        createdCustom: {
          destination: { name: 'Test', price: 1000 },
          stay: { preference: 'Hotel', price: 2000 }
          // Missing other price fields
        }
      }
    };
    
    render(<CreateOwnResult {...partialData} />);
    
    await screen.findByText('Summary');
    expect(screen.getByText('INR 3,000')).toBeInTheDocument(); // Only destination + stay
  });

  test('renders reach transport details only when reachAssistance is withUs', async () => {
    render(<CreateOwnResult {...defaultProps} />);
    
    await screen.findByText('Summary');
    expect(screen.getByText('Flight --- INR 8,000')).toBeInTheDocument();
  });

  test('does not render reach transport details when reachAssistance is not withUs', async () => {
    const propsWithoutTransport = {
      ...defaultProps,
      summary: {
        createdCustom: {
          ...mockSummary.createdCustom,
          reachAssistance: 'byOwn'
        }
      }
    };
    
    render(<CreateOwnResult {...propsWithoutTransport} />);
    
    await screen.findByText('Summary');
    expect(screen.queryByText('Flight --- INR 8,000')).not.toBeInTheDocument();
  });

  test('modal is not rendered when isResultOpen is false', () => {
    const closedModalProps = {
      ...defaultProps,
      isResultOpen: false
    };
    
    render(<CreateOwnResult {...closedModalProps} />);
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
