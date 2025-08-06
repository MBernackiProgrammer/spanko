import { useEffect, useState } from 'react';
import './AL_Profile.css';

export default function AL_Profile() {

  let [userDat, setDataa ] = useState({})
  useEffect(() =>{
    fetch("https://172.24.3.142:3000/api/users/getCurrentAccount", {headers: {'Authorization': localStorage.getItem("token") ?  localStorage.getItem("token")! : "" }})
    .then((data) => {

    })
    .catch((err)=>{
      console.log(err)
    })
  })


  return (
    <>
      <div className='AL_MainPage_D_MainFrame'>
        <p className='P_Ranking'>Profile</p>
        <hr className='HR_Ranking'/>
        <table>
          <tr>
            <td>Username</td>
            <td><b></b></td>
          </tr>
        </table>
      </div>
    </>
  )
}
