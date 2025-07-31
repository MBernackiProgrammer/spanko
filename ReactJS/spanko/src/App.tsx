import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import C_NavBar from './AfterLogin/NavBar/C_NavBar';
import AL_MainPage from './AfterLogin/MainPage/AL_MainPage';
import AL_Profile from './AfterLogin/Profile/AL_MainPage';


function App() {
  return (
    <C_NavBar>
      <Router>
        <Routes>
          <Route path="/" element={<AL_MainPage />} />
          <Route path="/profile" element={<AL_Profile />} />
        </Routes>
      </Router>
    </C_NavBar>
    
  );
}
