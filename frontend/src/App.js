import "./App.css";
import { useState, useEffect } from "react";
import RootNavigation from "./RootNavigation";
import { Footer, NavBar } from "./components";
import { getUserWS } from "./services/authWs";
import {index} from "./components/Footer/index";


function App() {
  const [user, setUser] = useState(null);

  const verifyUser = async () => {
    const response = await getUserWS();
    if (response) {
      setUser(response.data.user);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const authenticate = async (user) => {
    setUser(user);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <div className="App">
      <NavBar {...{ user, authenticate, handleLogout }} />
      <RootNavigation {...{ user, authenticate, handleLogout }} />
      <footer className="footer">
      <div className="container">
        
        <p id='footer-text'>Copyright &copy; 2024 ItineraryPlanner All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
}

export default App;
