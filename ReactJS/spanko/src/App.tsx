import './App.css'
import './FriendController'
import FriendController from './FriendController'

function App()
{
  const friendController = new FriendController();
  friendController.GetFriendList(BigInt(1)).then((result) => {
    console.log(result);
  });

  friendController.EndFrienship(BigInt(1), BigInt(2)).then((result) => {
    console.log(result);
  });

  friendController.GetFriendInvitationList(BigInt(1)).then((result) => {
    console.log(result);
  });

  friendController.SendFriendInvitation(BigInt(1), BigInt(2)).then((result) => {
    console.log(result);
  });

  friendController.AcceptFriendInvitation(BigInt(1), BigInt(2)).then((result) => {
    console.log(result);
  });

  friendController.DeclineFriendInvitation(BigInt(1), BigInt(2)).then((result) => {
    console.log(result);
  });

  return (
    <>  
      <main style={{ fontFamily: 'Arial'}}>
        <h1>Spanko</h1>
        <h2>Friend Management</h2>
        
        <hr />

      </main>
    </>
  )
}

export default App
