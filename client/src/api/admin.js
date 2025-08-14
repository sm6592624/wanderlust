import apiClient, { createAuthHeaders } from './apiClient'
import { SERVER_ADMIN_URL } from '../constants/urls'

// Get all services from the backend
export const getServices = () => 
    apiClient.get(`${SERVER_ADMIN_URL}/service/get-services`)

// Fetch individual service details
export const getService = (serviceID) =>
    apiClient.get(`${SERVER_ADMIN_URL}/service/get-service/${serviceID}`)

// Handle admin login
export const adminLogin = (adminDetails) =>
    apiClient.post(`${SERVER_ADMIN_URL}/login`, adminDetails)

// Add new service (admin only)
export const addService = (serviceDetails, adminToken) =>
    apiClient.post(`${SERVER_ADMIN_URL}/service/add`, serviceDetails, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Remove a service
export const deleteService = (adminToken, serviceID) =>
    apiClient.delete(`${SERVER_ADMIN_URL}/service/delete-service/${serviceID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Get all bookings for admin dashboard
export const getBookings = (adminToken) =>
    apiClient.get(`${SERVER_ADMIN_URL}/get-bookings`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Fetch user enquiries
export const getEnquiries = (adminToken) =>
    apiClient.get(`${SERVER_ADMIN_URL}/get-enquiries`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Delete an enquiry
export const deleteEnquiry = (adminToken, enquiryID) =>
    apiClient.delete(`${SERVER_ADMIN_URL}/delete-enquiry/${enquiryID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Get trending destinations
export const getTrending = () => 
    apiClient.get(`${SERVER_ADMIN_URL}/service/get-trending`)

// Add carousel image
export const addCarousel = (carouselDetails, adminToken) =>
    apiClient.post(`${SERVER_ADMIN_URL}/add-carousel`, carouselDetails, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Get homepage carousel images
export const getCarousel = () => 
    apiClient.get(`${SERVER_ADMIN_URL}/get-carousel`)

export const deleteCarousel = (adminToken, carouselID) =>
    apiClient.delete(`${SERVER_ADMIN_URL}/delete-carousel/${carouselID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const addAdvtBanner = (advtData, adminToken) =>
    apiClient.post(`${SERVER_ADMIN_URL}/advt`, advtData, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const getAdvtBanner = () => 
    apiClient.get(`${SERVER_ADMIN_URL}/advt`)

export const deleteAdvtBanner = (adminToken, advtID) =>
    apiClient.delete(`${SERVER_ADMIN_URL}/advt/${advtID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const addDestination = (destinationDetails, adminToken) =>
    apiClient.post(`${SERVER_ADMIN_URL}/create-own`, destinationDetails, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const getDestinations = () => 
    apiClient.get(`${SERVER_ADMIN_URL}/create-own`)

export const getPrices = () => 
    apiClient.get(`${SERVER_ADMIN_URL}/create-own/price`)

export const updatePrices = (prices, adminToken) =>
    apiClient.post(`${SERVER_ADMIN_URL}/create-own/price`, prices, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const getCustoms = (adminToken) =>
    apiClient.get(`${SERVER_ADMIN_URL}/create-own/custom`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })
