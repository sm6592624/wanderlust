import apiClient from './apiClient'

export const sendPasswordResetRequest = (email) =>
    apiClient.post(`/password-reset/request-reset/${email}`)

export const updateNewPassword = (userID, token, newPassword) =>
    apiClient.post(`/password-reset/receive-new/${userID}/${token}`, {
        password: newPassword,
    })
