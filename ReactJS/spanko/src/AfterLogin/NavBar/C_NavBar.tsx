import './C_NavBar.css';
import { Link, NavLink } from 'react-router-dom';

export default function C_NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='C_NavBar_D_MainFrame'>
        <div className='D_MainPage'>
          <div className='D_MainInFrame'>
            <div className='D_LogoSpace'>
              <img src='./logo.png'/>
            </div>

            <div className='D_TopLogoBoxHolder'>
              <div className='D_TopLogoBox'>

              </div>
            </div>

            <div className='D_StartSpanko'>
              <img src='./cloud3.png' className='IMG_Cloud_V1'/>
              <img src='./cloud2.png' className='IMG_Cloud_V2'/>
              <img src='./cloud.png' className='IMG_Cloud_V3'/>
            </div>
          </div>
          
          <div className='D_ButtonHolder'>
            <div className='D_StartSpanko_Button'>
                <div>
                  <p className='P_StartSleep'>Start sleep</p>
                </div>
              </div>
          </div>
        </div>

        <div className='D_NavBar'>
            <div className='D_ContentHolder'>
              <div className='D_Nav'>

                <NavLink className="D_NavHolder" to="/rank">
                  <div className='D_NavHolder'>
                    <img src="./rank.png" />
                  </div>
                </NavLink>

                <NavLink className="D_NavHolder"  to="/profile">
                  <div className='D_NavHolder'>
                    <img src='./profile.png'></img>
                  </div>
                </NavLink>

                <NavLink className="D_NavHolder"  to="/settings">
                  <div className='D_NavHolder'>
                    <img src='./settings.png'></img>
                  </div>
                </NavLink>
              </div>

              <div className='D_Content'>
                {children}
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
