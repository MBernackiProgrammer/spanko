import { useRef, useState } from 'react';
import '../../AfterLogin/NavBar/C_NavBar.css'
import './BL_Login.css'
import { useForm, type SubmitHandler } from 'react-hook-form';
import { accountsAPI } from '../../SharedElements/DomainsAPI/DomainsAPI';



function BL_Login() {
  const leftCloud = useRef<HTMLImageElement>(null);
  const rightCloud = useRef<HTMLImageElement>(null);

  const [registerForm, setRegisterForm] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const formLogin = useRef<HTMLFormElement>(null);

  const subm = useRef<HTMLInputElement>(null);

  const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<{username:string, password:string}>()
    const onSubmit: SubmitHandler<{username:string, password:string}> = (data) => {
        console.log(data);

        const requestOptions:RequestInit = {
            credentials: 'omit', 
            method:'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body:JSON.stringify({ username: data.username, password:data.password })
        };

        if(registerForm){

          requestOptions.body = JSON.stringify({ username: data.username, password:data.password, email:email, phone:phone });
          fetch(accountsAPI+'/api/users/create', requestOptions)
              .then(() => {
  
                  alert("successfully created account");
              })
              .catch(err => {
                  console.log(err);    
                  alert("an error occurred")      
              });

        }else{

          fetch(accountsAPI+'/api/users/login', requestOptions)
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

  let changeForm;
  let title;
  let buttonTitle;
  let registerInputs;
  if(registerForm){
    changeForm = <p style={{color:"#5986FF", textAlign:"right", marginRight: "25px", marginTop:"10px", cursor:"pointer"}} onClick={() => setRegisterForm(!registerForm)}>Log in</p>;
    title = "Register";
    buttonTitle = "Register";
    registerInputs = 
    <>
      <input type="text" placeholder='Your e-mail address' name="email" id="email" onChange={(event)=>{ setEmail(event.target.value) }}/>
      <input type="text" name="phone" placeholder='Your phone number' id="phone" onChange={(event)=>{ setPhone(event.target.value) }}/>
    </>
  }else{
    changeForm = <p style={{color:"#5986FF", textAlign:"right", marginRight: "25px", marginTop:"10px", cursor:"pointer"}} onClick={() => setRegisterForm(!registerForm)}>Create account</p>;
    title = "Log into";
    buttonTitle = "Log in";
    registerInputs = <></>
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
                  <p style={{color:"#5986FF", fontSize:"1em", textAlign:"center"}}>
                    {title} your account
                  </p>
                </div>
                
                <form method='post' ref={formLogin} onSubmit={handleSubmit(onSubmit)} style={{margin:"20px"}}>
                  
                  <input id="username" placeholder='Username' type="text" {...register("username", 
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

                  <input type='password' id="password" placeholder='Password' {...register("password", {required: "Message field is required"})}/>
                  {
                      errors.password &&
                      <div>
                          {errors.password.message}
                      </div>
                  }     

                  {registerInputs}
                  
                  <input type="submit" ref={subm} value="" hidden />                       
                </form>

                <p style={{color:"#5986FF", textAlign:"right", marginRight: "25px", marginTop:"-20px"}}>Forgot the password?</p>
                {changeForm}

                <div style={{flex:"1"}}>

                </div>

                <div className='D_LoginButton' onClick={() => subm.current?.click()}>
                  <p>{buttonTitle}</p>
                </div>

                <div>
                  
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
