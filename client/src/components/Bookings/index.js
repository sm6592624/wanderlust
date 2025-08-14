import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button, Typography, Container } from '@material-ui/core';
import _ from 'lodash';

import './Bookings.css';
import { UserContext } from '../../utils/Context/user';
import { getBookings } from '../../api/user';
import BookingCard from './BookingCard';
import Loading from '../../utils/Comp/Loading';
import ErrorDisplay from '../../utils/Comp/ErrorDisplay';
import AdvtBanner from '../../utils/Comp/AdvtBanner';

const Bookings = ({ setIsModalOpen, advtData }) => {
    const user = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const [deletedBookingID, setDeletedBookingID] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user bookings from API
    const loadUserBookings = useCallback(async (currentUser) => {
        if (!currentUser) return;
        
        try {
            setLoading(true);
            setError(null);
            const result = await getBookings(currentUser);
            if (result && result.data) {
                setBookings(result.data);
            } else {
                setBookings([]);
            }
        } catch (err) {
            console.error('Bookings fetch error:', err);
            setError(err.message || 'Could not load your bookings');
        } finally {
            setLoading(false);
        }
    }, []);

    // Retry loading bookings
    const retryLoadBookings = useCallback(() => {
        if (user.user) {
            loadUserBookings(user.user);
        }
    }, [user.user, loadUserBookings]);

    useEffect(() => {
        if (!user.user) {
            setIsModalOpen(true);
            setLoading(false);
        } else {
            loadUserBookings(user.user);
        }
    }, [user.user, setIsModalOpen, loadUserBookings]);

    useEffect(() => {
        if (deletedBookingID) {
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== deletedBookingID)
            );
        }
    }, [deletedBookingID]);

    return (
        <div className="bookings">
            <div className="bookings__header">
                <h1>My Bookings</h1>
            </div>
            
            {user.user ? (
                <Container className="bookings__cards">
                    {loading ? (
                        <Loading message="Loading your bookings..." />
                    ) : error ? (
                        <ErrorDisplay 
                            error={error} 
                            onRetry={retryLoadBookings}
                            title="Failed to load bookings"
                        />
                    ) : bookings.length > 0 ? (
                        _.orderBy(
                            bookings,
                            [(booking) => booking.serviceBooked?.startDate],
                            ['asc']
                        ).map((bookingData) => (
                            <BookingCard
                                key={bookingData._id}
                                bookingData={bookingData}
                                setDeletedBookingID={setDeletedBookingID}
                            />
                        ))
                    ) : (
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            style={{ 
                                margin: '100px 0', 
                                textAlign: 'center',
                                padding: '2rem'
                            }}
                        >
                            You have no bookings yet! Browse our packages to get started.
                        </Typography>
                    )}

                    {advtData && (
                        <AdvtBanner image={advtData.image} link={advtData.link} />
                    )}
                </Container>
            ) : (
                <div className="bookings__notLoggedIn">
                    <div className="bookings__notLoggedInContentWrapper">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                            aria-label="Login to view bookings"
                        >
                            Login First
                        </Button>
                        <Typography variant="body2" color="textSecondary">
                            Login to see your bookings.
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bookings
