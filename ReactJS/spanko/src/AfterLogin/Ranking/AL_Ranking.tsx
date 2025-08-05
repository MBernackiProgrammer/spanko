import './AL_Ranking.css';
import C_UserRow from './C_UserRow/C_UserRow';

export default function AL_Ranking() {
  return (
    <>
      <div className='AL_MainPage_D_MainFrame'>
        <p className='P_Ranking'>Ranking</p>
        <hr className='HR_Ranking'/>

        <C_UserRow></C_UserRow>
        <C_UserRow></C_UserRow>
        <C_UserRow></C_UserRow>
        <C_UserRow></C_UserRow>
        <C_UserRow></C_UserRow>
      </div>
    </>
  )
}
