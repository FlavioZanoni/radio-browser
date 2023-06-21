import { axiosInstance } from "./axiosInstance"

import { RadioStation } from "./types"

export const getRadioStations = async () => {
  const response = await axiosInstance.get<RadioStation[]>("/stations/")
  return response.data
}
