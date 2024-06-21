import axios from "axios";

const ipGeo = process.env.REACT_APP_GEO_API;
const baseURL = "https://api.ipbase.com/v2/info?apikey=ipb_live_4loO8MynUklzJSOXxppmQZacV9znh8L8eRElvOF4";

export const geoLocationData = async () => {
  try {
    const { data } = await axios.get(baseURL + ipGeo);
    return data;
  } catch (error) {
    return error;
  }
};
