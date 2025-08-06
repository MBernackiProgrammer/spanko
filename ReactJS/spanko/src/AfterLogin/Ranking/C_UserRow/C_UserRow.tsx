import './C_UserRow.css';

type C_UserRowProps = {
  username: string;
  hours: string | number;
};

export default function C_UserRow({ username, hours }: C_UserRowProps) {
  return (
    <div className='C_UserRow_MainFrame'>
      <p className='C_UserRow_D_UserIcon'></p>
      <div className='C_UserRow_D_MiddleRow'>
        <p>{username}</p>
      </div>
      <p>{hours} points</p>
    </div>
  );
}
