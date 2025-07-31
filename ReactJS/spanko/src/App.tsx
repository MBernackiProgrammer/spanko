import { BrowserRouter as Routes, Route, BrowserRouter } from 'react-router-dom';
import C_NavBar from './AfterLogin/NavBar/C_NavBar';
import AL_MainPage from './AfterLogin/MainPage/AL_MainPage';
import AL_Profile from './AfterLogin/Profile/AL_MainPage';
import AL_Ranking from './AfterLogin/Ranking/AL_Ranking';
import AL_Settings from './AfterLogin/Settings/AL_Settings';
import BL_Login from './BeforeLogin/Login/BL_Login';
import BL_Registration from './BeforeLogin/Registration/BL_Registration';
import AL_Friends from './AfterLogin/Friends/AL_Friends';


function App() {
  return (
    <BrowserRouter>
    <C_NavBar>
        <Routes>
          <Route path="/" element={<AL_MainPage />} />
          <Route path="/profile" element={<AL_Profile />} />
          <Route path="/rank" element={<AL_Ranking />} />
          <Route path="/settings" element={<AL_Settings />} />

          <Route path="/friends" element={<AL_Friends/>}></Route>

          <Route path="/login" element={<BL_Login />} />
          <Route path="/register" element={<BL_Registration />} />
        </Routes>
    </C_NavBar>
      </BrowserRouter>
    
  );
}

export default App;