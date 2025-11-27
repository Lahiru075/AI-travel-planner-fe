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