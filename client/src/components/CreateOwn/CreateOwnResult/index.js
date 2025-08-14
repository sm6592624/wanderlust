
import React, { useEffect, useState } from 'react';
import { Typography, Divider, CircularProgress } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import './CreateOwnResult.css';
import ModalComp from '../../../utils/Comp/ModalComp';

// Helper for safe date rendering
const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
        return new Date(date).toDateString();
    } catch {
        return 'N/A';
    }
};

const CreateOwnResult = ({
    isResultOpen,
    setIsResultOpen,
    summary: { createdCustom },
}) => {
    const [totalEstimate, setTotalEstimate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Defensive total calculation
    const calculateTotal = (custom) => {
        if (!custom) return 0;
        let total = 0;
        try {
            total += custom?.destination?.price || 0;
            total += custom?.reachTransport?.price || 0;
            total += custom?.spotTransport?.price || 0;
            total += custom?.stay?.price || 0;
            total += custom?.food?.price || 0;
            if (Array.isArray(custom?.activities)) {
                custom.activities.forEach((activity) => {
                    total += activity?.price || 0;
                });
            }
            return total;
        } catch (e) {
            setError('Error calculating total cost.');
            return 0;
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            setTotalEstimate(calculateTotal(createdCustom));
            setError(null);
        } catch (e) {
            setError('Error loading summary.');
        }
        setLoading(false);
    }, [createdCustom]);

    // Loading state
    if (loading) {
        return (
            <ModalComp isModalOpen={isResultOpen} setIsModalOpen={setIsResultOpen}>
                <div className="createOwnResult" aria-busy="true" aria-label="Loading summary">
                    <CircularProgress />
                    <Typography variant="body1">Loading summary...</Typography>
                </div>
            </ModalComp>
        );
    }

    // Error state
    if (error) {
        return (
            <ModalComp isModalOpen={isResultOpen} setIsModalOpen={setIsResultOpen}>
                <div className="createOwnResult" aria-live="assertive">
                    <Typography variant="h6" color="error">{error}</Typography>
                </div>
            </ModalComp>
        );
    }

    // No data state
    if (!createdCustom) {
        return (
            <ModalComp isModalOpen={isResultOpen} setIsModalOpen={setIsResultOpen}>
                <div className="createOwnResult">
                    <Typography variant="h6">No summary available.</Typography>
                </div>
            </ModalComp>
        );
    }

    // Main summary rendering
    return (
        <ModalComp isModalOpen={isResultOpen} setIsModalOpen={setIsResultOpen}>
            <div className="createOwnResult" aria-label="Trip summary">
                <Typography variant="h4">Summary</Typography>
                <Divider light={true} className="createOwnResult__divider" />

                {/* Destination */}
                <div className="createOwnResult__group">
                    <Typography variant="h5">
                        Destination: <strong>{createdCustom?.destination?.name || 'N/A'}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.destination?.price || 0}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                {/* Attraction Spots */}
                <div className="createOWnResult__listWrapper">
                    <Typography variant="body1">Attraction Spots:</Typography>
                    <ul>
                        {(createdCustom?.destination?.spots || []).map((spot, index) => (
                            <li key={index}>{spot}</li>
                        ))}
                    </ul>
                </div>

                {/* Dates */}
                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Start Date: <strong>{formatDate(createdCustom?.duration?.start)}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        End Date: <strong>{formatDate(createdCustom?.duration?.end)}</strong>
                    </Typography>
                </div>

                {/* Cities */}
                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Start City: <strong>{createdCustom?.startCity || 'N/A'}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        End City: <strong>{createdCustom?.endCity || 'N/A'}</strong>
                    </Typography>
                </div>

                {/* Reach Assistance */}
                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        You will Reach: <strong>{createdCustom?.reachAssistance || 'N/A'}</strong>
                    </Typography>
                    {createdCustom?.reachAssistance === 'withUs' && (
                        <>
                            <span></span>
                            <Typography variant="body1">
                                <strong>
                                    {createdCustom?.reachTransport?.mode || 'N/A'} ---{' '}
                                    <NumberFormat
                                        value={createdCustom?.reachTransport?.price || 0}
                                        prefix={'INR '}
                                        thousandSeparator={true}
                                        displayType={'text'}
                                    />
                                </strong>
                            </Typography>
                        </>
                    )}
                </div>

                {/* Spot Transport */}
                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Mode of Transport at Vacation Spot:{' '}
                        <strong>{createdCustom?.spotTransport?.mode || 'N/A'}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.spotTransport?.price || 0}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                {/* Stay Preference */}
                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Stay Preference: <strong>{createdCustom?.stay?.preference || 'N/A'}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.stay?.price || 0}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                {/* Food Preference */}
                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Food Preference: <strong>{createdCustom?.food?.preference || 'N/A'}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.food?.price || 0}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                {/* Activities */}
                <div className="createOWnResult__actListWrapper">
                    <Typography variant="body1">Activities:</Typography>
                    <ul>
                        {(createdCustom?.activities || []).map((activity) => (
                            <li key={activity._id || activity.name}>
                                <span>
                                    <strong>{activity.name || 'N/A'}</strong>
                                </span>
                                <span></span>
                                <span>
                                    <strong>
                                        <NumberFormat
                                            value={activity.price || 0}
                                            prefix={'INR '}
                                            thousandSeparator={true}
                                            displayType={'text'}
                                        />
                                    </strong>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Estimated Cost */}
                <div className="createOwnResult__group">
                    <Typography variant="h4">Estimated Cost:</Typography>
                    <span></span>
                    <Typography variant="h4">
                        <strong>
                            <NumberFormat
                                value={totalEstimate}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>
            </div>
        </ModalComp>
    );
}

export default CreateOwnResult
