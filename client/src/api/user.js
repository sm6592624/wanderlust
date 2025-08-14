import apiClient, { createAuthHeaders } from './apiClient'
import { SERVER_USER_URL } from '../constants/urls'

// User registration API call
export const userRegister = (userDetails) =>
    apiClient.post(`${SERVER_USER_URL}/register`, userDetails)

// Handle user login
export const userLogin = (userDetails) =>
    apiClient.post(`${SERVER_USER_URL}/login`, userDetails)

// Book a service for user
export const bookService = (bookingDetails, serviceID, loggedInUser) =>
    apiClient.post(
        `${SERVER_USER_URL}/book/${serviceID}`,
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
        `${SERVER_USER_URL}/get-bookings`,
        {
            userID: loggedInUser.ID,
        },
        {
            headers: createAuthHeaders(loggedInUser.userToken, 'user'),
        }
    )

// Cancel a booking
export const deleteBooking = (bookingID, loggedInUser) =>
    apiClient.delete(`${SERVER_USER_URL}/delete-booking/${bookingID}`, {
        headers: createAuthHeaders(loggedInUser.userToken, 'user'),
    })

// Send contact enquiry
export const sendEnquiry = (enquiry) =>
    apiClient.post(`${SERVER_USER_URL}/send-enquiry`, enquiry)

// Create custom trip
export const createCustom = (customDetails, loggedInUser) =>
    apiClient.post(
        `${SERVER_USER_URL}/create-own`,
        {
            customDetails,
        },
        {
            headers: createAuthHeaders(loggedInUser.userToken, 'user'),
        }
    )
