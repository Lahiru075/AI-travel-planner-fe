import api from "./api"

export const getStats = async () => {
    const res = await api.get('/admin/dashboard_stats')
    return res.data
}

export const getAllUsers = async () => {
    const res = await api.get('/admin/all_users')
    return res.data
}


export const getAllTrips = async () => {
    const res = await api.get('/admin/all_trips')
    return res.data
}


export const suspendUser = async (id: string) => {
    const res = await api.patch(`/admin/suspend_user/${id}`)
    return res.data
}


export const activateUser = async (id: string) => {
    const res = await api.patch(`/admin/activate_user/${id}`)
    return res.data
}


export const deleteTrip = async (id: string) => {
    const res = await api.delete(`/admin/delete/${id}`)
    return res.data
}