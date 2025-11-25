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