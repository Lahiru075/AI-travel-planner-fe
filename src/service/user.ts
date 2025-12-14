import api from "./api"

type RegisterDataType = {
    name: string,
    email: string,
    password: string
}

export const register = async (data: RegisterDataType) => {
    const res = await api.post("/users/register", data)
    return res.data
}

export const signin = async (data: any) => {
    const res = await api.post("/users/login", data)
    return res.data
}

export const getMyDetails = async () => {
    const res = await api.get('/users/getMyDetails')
    return res.data
}

export const refreshTokens = async (refreshToken: string) => {
    const res = await api.post('/users/refresh', { token: refreshToken })
    return res.data
}

export const googleAuth = async (token: string) => {
    const res = await api.post('/users/google_login', { token });
    return res.data
};

export const forgotPasswordRequest = async (email: string) => {
    return await api.post('/users/forgot-password', { email });
};

export const resetPasswordRequest = async (token: string, password: string) => {
    return await api.post(`/users/reset-password/${token}`, { password });
};

export const getAllUsers = async (page: number, limit: number) => {
    const res = await api.get(`/users/all_users?page=${page}&limit=${limit}`)
    return res.data
}

export const suspendUser = async (id: string) => {
    const res = await api.patch(`/users/suspend_user/${id}`)
    return res.data
}

export const activateUser = async (id: string) => {
    const res = await api.patch(`/users/activate_user/${id}`)
    return res.data
}
