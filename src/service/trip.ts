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

export const getMyTrips = async () => {
    const res = await api.get('/trips/mytrips')
    return res.data
}

export const deleteTrip = async (id: string) => {
    const res = await api.delete(`/trips/delete/${id}`)
    return res.data
}