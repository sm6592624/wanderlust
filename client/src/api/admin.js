import apiClient, { createAuthHeaders } from './apiClient'

// Get all services from the backend
export const getServices = () => 
    apiClient.get('/admin/service/get-services')

// Fetch individual service details
export const getService = (serviceID) =>
    apiClient.get(`/admin/service/get-service/${serviceID}`)

// Handle admin login
export const adminLogin = (adminDetails) =>
    apiClient.post('/admin/login', adminDetails)

// Add new service (admin only)
export const addService = (serviceDetails, adminToken) =>
    apiClient.post('/admin/service/add', serviceDetails, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Remove a service
export const deleteService = (adminToken, serviceID) =>
    apiClient.delete(`/admin/service/delete-service/${serviceID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Get all bookings for admin dashboard
export const getBookings = (adminToken) =>
    apiClient.get('/admin/get-bookings', {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Fetch user enquiries
export const getEnquiries = (adminToken) =>
    apiClient.get('/admin/get-enquiries', {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Delete an enquiry
export const deleteEnquiry = (adminToken, enquiryID) =>
    apiClient.delete(`/admin/delete-enquiry/${enquiryID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Get trending destinations
export const getTrending = () => 
    apiClient.get('/admin/service/get-trending')

// Add carousel image
export const addCarousel = (carouselDetails, adminToken) =>
    apiClient.post('/admin/add-carousel', carouselDetails, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

// Get homepage carousel images
export const getCarousel = () => 
    apiClient.get('/admin/get-carousel')

export const deleteCarousel = (adminToken, carouselID) =>
    apiClient.delete(`/admin/delete-carousel/${carouselID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const addAdvtBanner = (advtData, adminToken) =>
    apiClient.post('/admin/advt', advtData, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const getAdvtBanner = () => 
    apiClient.get('/admin/advt')

export const deleteAdvtBanner = (adminToken, advtID) =>
    apiClient.delete(`/admin/advt/${advtID}`, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const addDestination = (destinationDetails, adminToken) =>
    apiClient.post('/admin/create-own', destinationDetails, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const getDestinations = () => 
    apiClient.get('/admin/create-own')

export const getPrices = () => 
    apiClient.get('/admin/create-own/price')

export const updatePrices = (prices, adminToken) =>
    apiClient.post('/admin/create-own/price', prices, {
        headers: createAuthHeaders(adminToken, 'admin'),
    })

export const getCustoms = (adminToken) =>
    apiClient.get('/admin/create-own/custom', {
        headers: createAuthHeaders(adminToken, 'admin'),
    })
