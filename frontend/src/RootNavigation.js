import { Routes, Route } from "react-router-dom";
import {
  Home,
  Explore,
  Auth,
  MyTrips,
  Profile,
  Weather,
  AroundMe,
  MyPlaces,
  ChangePassword,
  ContactUs,
  AboutUs,
} from "./pages";

function RootNavigation(props) {
  return (
    <div style={{minHeight:"100vh"}}>
    <Routes>
      <Route path="*" element={<Home {...props} />} />
      <Route path="/" element={<Home {...props} />} />
      <Route path="/login" element={<Auth {...props} />} />
      <Route path="/signup" element={<Auth {...props} />} />
      <Route path="/aboutus" element={<AboutUs {...props} />} />
      <Route path="/mytrips" element={<MyTrips {...props} />} />
      <Route path="/profile" element={<Profile {...props} />} />
      <Route path="/explore" element={<Explore {...props} />} />
      <Route path="/weather" element={<Weather {...props} />} />
      <Route path="/aroundme" element={<AroundMe {...props} />} />
      <Route path="/contactus" element={<ContactUs {...props} />} />
      <Route path="/trips/:id/places" element={<MyPlaces {...props} />} />
      <Route path="/changepassword" element={<ChangePassword {...props} />} />
      <Route path="/trips/share/:id/places" element={<MyPlaces {...props} />} />
    </Routes>
    </div>
  );
}

export default RootNavigation;
