import api from "./api"

export const getStats = async () => {
    const res = await api.get('/admin/dashboard_stats')
    return res.data
}
