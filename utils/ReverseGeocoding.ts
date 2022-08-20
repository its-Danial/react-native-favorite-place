import axios from "axios";
import { LocationType } from "../models/Place";

export const getAddressFromCoordinates = async (locationCoordinates: LocationType) => {
  const response = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${locationCoordinates.latitude}&lon=${locationCoordinates.longitude}&apiKey=11f801bdef5a464fa7823ba19168a4f2`
  );

  const data = await response.data;

  const formattedAddress = data.features[0].properties.formatted;

  return formattedAddress;
};
