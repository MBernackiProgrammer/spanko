import { useRef } from 'react';
import '../../AfterLogin/NavBar/C_NavBar.css'
import './BL_Login.css'



function BL_Login() {
  const leftCloud = useRef<HTMLImageElement>(null);
  const rightCloud = useRef<HTMLImageElement>(null);

  function login()
  {
    if(leftCloud.current)
    {
      leftCloud.current.style.marginLeft = "-500px";
      leftCloud.current.style.opacity = "0";
    }

    if(rightCloud.current)
    {
      rightCloud.current.style.marginLeft = "500px";
      rightCloud.current.style.opacity = "0";
    }

    
    setTimeout(()=>{
      localStorage.setItem("token", "test");
      location.reload();
    }, 500);
  }

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
              <img src='./chmureklewy.png' className='D_CloudeLogin_01' ref={leftCloud}/>
              <img src='./chmurekprawy.png' className='D_CloudeLogin_02' ref={rightCloud}/>

              <div className='D_LoginPanel'>
                <div style={{margin:"20px"}}>
                  <h1 style={{color:"#5986FF", fontSize:"4em", textAlign:"center"}}>Hello</h1>
                  <p style={{color:"#5986FF", fontSize:"1em", textAlign:"center"}}>Login into your account</p>
                </div>
                
                <div style={{margin:"20px"}}>
                  <input type='text' style={{color:"#5986FF"}}/>
                  <input type='text' style={{color:"#5986FF"}}/>
                </div>

                <p style={{color:"#5986FF", textAlign:"right", marginRight: "25px", marginTop:"-20px"}}>Forgot the password?</p>

                <div style={{flex:"1"}}>

                </div>

                <div className='D_LoginButton' onClick={login}>
                  <p>Log In</p>
                </div>
              </div>

              <div className='D_BottomBox'>

              </div>
             </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BL_Login
