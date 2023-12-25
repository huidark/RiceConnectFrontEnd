// App.js
import "./App.css";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  //const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={user ? <Navigate to="/main" /> : <Landing />}
        /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
