import { useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import './BL_Registration.css';

function BL_Registration() {

  const leftCloud = useRef<HTMLImageElement>(null);
  const rightCloud = useRef<HTMLImageElement>(null);

  const formLogin = useRef<HTMLFormElement>(null);

  const subm = useRef<HTMLInputElement>(null);

  const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<{username:string, password:string, email:string, phone:string}>()
    const onSubmit: SubmitHandler<{username:string, password:string, email:string, phone:string}> = (data) => {
        console.log(data);

        const requestOptions:RequestInit = {
            credentials: 'omit', 
            method:'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body:JSON.stringify({ username: data.username, password:data.password, email: data.email, phone:data.phone })
        };

        fetch('https://172.24.3.142:3000/api/users/login', requestOptions)
            .then(async (response) => {
                const jsonObj = await response.json();

                if(jsonObj != "-1"){
                  localStorage.setItem("token", jsonObj.token);
                  login();
                  alert("server response: "+jsonObj.token);
                }else{
                  alert("invalid username or password");
                }
            })
            .catch(err => {
                console.log(err);                
            });
    }



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
                
                <form ref={formLogin} onSubmit={handleSubmit(onSubmit)} style={{margin:"20px"}}>
                  
                  <input id="username" type="text" {...register("username", 
                      {
                          required: "Username field is required",
                      })} 
                  />
                  {
                      errors.username &&
                      <div>
                          {errors.username.message}
                      </div>
                  }

                  <input id="message" {...register("password", {required: "Password field is required"})}/>
                  {
                      errors.password &&
                      <div>
                          {errors.password.message}
                      </div>
                  }     
                  
                  <input id="email" {...register("email", 
                    {
                        required: "E-mail field is required", 
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email is not valid"
                        }
                    }
                  )}/>
                  {
                      errors.password &&
                      <div>
                          {errors.password.message}
                      </div>
                  }     
                  
                  <input id="phone" {...register("phone", {required: "Phone field is required"})}/>
                  {
                      errors.password &&
                      <div>
                          {errors.password.message}
                      </div>
                  }     
                  <input type="submit" ref={subm} value="" hidden />                       
                </form>

                <p style={{color:"#5986FF", textAlign:"right", marginRight: "25px", marginTop:"-20px"}}>Forgot the password?</p>

                <div style={{flex:"1"}}>

                </div>

                <div className='D_LoginButton' onClick={() => subm.current?.click()}>
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

export default BL_Registration
