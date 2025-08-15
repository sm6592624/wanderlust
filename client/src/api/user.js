import apiClient, { createAuthHeaders } from './apiClient'

// User registration API call
export const userRegister = (userDetails) =>
    apiClient.post('/user/register', userDetails)

// Handle user login
export const userLogin = (userDetails) =>
    apiClient.post('/user/login', userDetails)

// Book a service for user
export const bookService = (bookingDetails, serviceID, loggedInUser) =>
    apiClient.post(
        `/user/book/${serviceID}`,
        {
            ...bookingDetails,
            loggedInUser,
        },
        {
            headers: createAuthHeaders(loggedInUser.userToken, 'user'),
        }
    )

// Get user's bookings
export const getBookings = (loggedInUser) =>
    apiClient.post(
        '/user/get-bookings',
        {
            userID: loggedInUser.ID,
        },
        {
            headers: createAuthHeaders(loggedInUser.userToken, 'user'),
        }
    )

// Cancel a booking
export const deleteBooking = (bookingID, loggedInUser) =>
    apiClient.delete(`/user/delete-booking/${bookingID}`, {
        headers: createAuthHeaders(loggedInUser.userToken, 'user'),
    })

// Send contact enquiry
export const sendEnquiry = (enquiry) =>
    apiClient.post('/user/send-enquiry', enquiry)

// Create custom trip
export const createCustom = (customDetails, loggedInUser) =>
    apiClient.post(
        '/user/create-own',
        {
            customDetails,
        },
        {
            headers: createAuthHeaders(loggedInUser.userToken, 'user'),
        }
    )
