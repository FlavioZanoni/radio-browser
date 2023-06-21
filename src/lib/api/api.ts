import { axiosInstance } from "./axiosInstance"

import { RadioStation } from "./types"

export const getRadioStations = async (searchParam: string, page: number) => {
  const response = await axiosInstance.get<RadioStation[]>(
    `stations/search?name=${searchParam}&limit=10&offset=${page}`
  )
  return response.data || []
}
