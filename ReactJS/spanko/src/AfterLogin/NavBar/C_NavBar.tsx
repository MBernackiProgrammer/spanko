import { useRef, useState, useEffect } from 'react';
import './C_NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import { useForm, type SubmitHandler } from "react-hook-form";

let isSleeping = false;
let interval:any;

export default function C_NavBar({ children }: { children: React.ReactNode }) {
  const cl1Ref = useRef<HTMLImageElement>(null);
  const cl2Ref = useRef<HTMLImageElement>(null);
  const cl3Ref = useRef<HTMLImageElement>(null);
  const rangData = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLImageElement>(null);

  const cln1Ref = useRef<HTMLImageElement>(null);
  const cln2Ref = useRef<HTMLImageElement>(null);

  const [timerText, setText] = useState<string>('Start sleep');

  const onSubmit: SubmitHandler<{username:string, password:string}> = (data) => {

    //Szykuje header do rządania 
    const requestOptions:RequestInit = {
        credentials: 'omit', 
        method:'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body:JSON.stringify(
          { 
            username: data.username, 
            password:data.password 
          }
        )
    };
    
    //Wysyła rządanie na serwer 
    fetch('https://172.24.3.142:3001/api/history', requestOptions)
    .then(async (response) => {
        //Tutaj można się odwołać do objektu z danymi 
        const jsonObj = await response.json();
    })
    .catch(err => {
        //Zwraca błąd 
        console.log(err);                
    });
  }
    
  function toogle()
  {
    console.log(isSleeping);
    if(!isSleeping)
    {
      isSleeping = true;
      startSpanko();
    }
    else
    {
      isSleeping = false;
      endSpanko();
    }
    console.log(isSleeping);
  }

  function endSpanko()
  {
    clearInterval(interval);

    setText("Start sleep");

    if (cl1Ref.current) {
      cl1Ref.current.style.bottom = "0px";
      cl1Ref.current.style.opacity = "1";
    }

    if(cl2Ref.current)
    {
      cl2Ref.current.style.bottom = "0px";
      cl2Ref.current.style.opacity = "1";
    }

    if(cl3Ref.current)
    {
      cl3Ref.current.style.bottom = "0px";
      cl3Ref.current.style.opacity = "1";
    }

    if(cln1Ref.current)
    {
      cln1Ref.current.style.bottom = "0px";

      setTimeout(()=>{
        if(cln1Ref.current)
        {
          cln1Ref.current.style.bottom = "-500px";
        }
      })
      cln1Ref.current.style.opacity = "0";
    }

    if(cln2Ref.current)
    {
      //cln2Ref.current.style.bottom = "-500px";
      cln2Ref.current.style.opacity = "0";
    }

    if(rangData.current)
    {
      rangData.current.style.opacity = "1";
    }

    if(starsRef.current)
    {
      starsRef.current.style.opacity = "0";
      starsRef.current.style.top = "-120px";
    }

    document.documentElement.style.setProperty('--main-bg-color', "#D9D9D9");
  }

  function startSpanko() {
    if (cl1Ref.current) {
      cl1Ref.current.style.bottom = "-500px";
      cl1Ref.current.style.opacity = "0";
    }

    let x = 0;

    setText("SPANKO STARTS");
    
    interval = setInterval(()=>{
      if(isSleeping)
      {
        x++;

        const hours = Math.floor(x / 3600)
        .toString()
        .padStart(2, '0');

        const minutes = Math.floor((x % 3600) / 60)
          .toString()
          .padStart(2, '0');

        const seconds = (x % 60).toString().padStart(2, '0');

        setText(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000)

    if(cl2Ref.current)
    {
      cl2Ref.current.style.bottom = "-500px";
      cl2Ref.current.style.opacity = "0";
    }

    if(cl3Ref.current)
    {
      cl3Ref.current.style.bottom = "-500px";
      cl3Ref.current.style.opacity = "0";
    }

    if(cln1Ref.current)
    {
      cln1Ref.current.style.bottom = "-500px";

      setTimeout(()=>{
        if(cln1Ref.current)
        {
          cln1Ref.current.style.bottom = "0px";
        }
      })
      cln1Ref.current.style.opacity = "1";
    }

    if(cln2Ref.current)
    {
      //cln2Ref.current.style.bottom = "-500px";
      cln2Ref.current.style.opacity = "1";
    }

    if(rangData.current)
    {
      rangData.current.style.opacity = "0";
    }

    if(starsRef.current)
    {
      starsRef.current.style.opacity = "1";
      starsRef.current.style.top = "120px";
    }

    document.documentElement.style.setProperty('--main-bg-color', "#181C36");
  }

  return (
    <>
      <div className='C_NavBar_D_MainFrame'>
        <div className='D_MainPage'>
          <div className='D_MainInFrame'>
            <img src='./gwiazdki.png' className='D_Stars' ref={starsRef}/>

            <div className='D_LogoSpace'>
              <img src='./logo.png'/>
            </div>

            <div className='D_TopLogoBoxHolder'>
              <div className='D_TopLogoBox'>

              </div>
            </div>

            <div className='D_StartSpanko'>
              <img src='./cloud.png' className='IMG_Cloud_V3' ref={cl3Ref}/>
              <img src='./cloud2.png' className='IMG_Cloud_V2' ref={cl2Ref}/>
              <img src='./cloud3.png' className='IMG_Cloud_V1' ref={cl1Ref}/>

              <img src='./gornachmura.png' className='IMG_Cloud_V2_Night' ref={cln2Ref}/>
              <img src='./dolnachmura.png' className='IMG_Cloud_V1_Night' ref={cln1Ref}/>
              

              <div className='D_LastStats' ref={rangData}>
                <div className='D_LastStats_SubFrame'>
                  <div className='D_LastStatsHolder'>
                    <p className='P_LastStatsTopText'>last spanko</p>
                    <p className='P_LastStatsTimes'>2h</p>
                  </div>

                  <div className='D_LastStatsHolder'>
                    <p className='P_LastStatsTopText'>longest spanko</p>
                    <p className='P_LastStatsTimes'>6h</p>
                  </div>
                </div>

                <div className='D_LastStatsHolder'>
                  <p className='P_LastStatsTimes' style={{ fontWeight: '600', fontSize: '60px' }}>1</p>
                  <p className='P_LastStatsTopText'>your ranking</p>
                </div>
              
              </div>
            </div>
          </div>
          
          <div className='D_ButtonHolder'>
            <div className='D_StartSpanko_Button' onClick={toogle}>
                <div>
                  <p className='P_StartSleep'>{timerText}</p>
                  <p></p>
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
