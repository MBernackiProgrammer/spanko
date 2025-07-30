import './C_NavBar.css';

export default function C_NavBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='C_NavBar_D_MainFrame'>
        <div className='D_Content'>
          {children}
        </div>

        <div className='D_NavBar'>
          <div className='D_NavBar_Center'>
            <div className='D_NavBar_Box'>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
