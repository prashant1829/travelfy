import axios from "axios";

export const apiTravel = axios.create({
  baseURL: "https://travel-advisor.p.rapidapi.com",
});

apiTravel.defaults.headers.common["x-rapidapi-key"] =
'9818177461msh4da05e30234fec8p181250jsn9bea6be85df9';
apiTravel.defaults.headers.common["x-rapidapi-host"] =
  "travel-advisor.p.rapidapi.com";

export const getPlaces = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await apiTravel.get(`/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
