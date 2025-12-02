import api from "./api"


type GenerateTripDataType = {
    destination: string;
    noOfDays: string;
    budget: string;
    travelers: string;
}

export const generateTrip = async (data: GenerateTripDataType) => {
    const res = await api.post('/trips/generate', data)
    return res.data
}

export const saveTrip = async (data: any) => {
    const res = await api.post('/trips/save', data)
    return res.data
}

export const getMyTrips = async (page: number, limit: number) => {
    const res = await api.get(`/trips/mytrips?page=${page}&limit=${limit}`)
    return res.data
}

export const deleteTrip = async (id: string) => {
    const res = await api.delete(`/trips/delete/${id}`)
    return res.data
}

export const getTripById = async (id: string) => {
    const res = await api.get(`/trips/viewtrip/${id}`)
    return res.data
}

export const getImage = async (query: string) => {
    const res = await api.post('/trips/getimage', { query: query })
    return res.data
}

export const getWeather = async (location: string) => {
    const res = await api.post('/trips/get_weather', { location: location })
    return res.data
}

export const getAllTrips = async () => {
    const res = await api.get('/trips/all_trips')
    return res.data
}
