import './App.css'
import './FriendController'
import FriendController from './FriendController'

function App()
{
  const friendController = new FriendController();
  function test_GetFriendList()
  {
    friendController.GetFriendList(Number(8)).then((result) => {
      console.log(result);
    });
  }

  function test_EndFrienship()
  {
    friendController.EndFrienship(Number(8), Number(9)).then((result) => {
      console.log(result);
    });
  }

  function test_GetFriendInvitationList()
  {
    friendController.GetFriendInvitationList(Number(8)).then((result) => {
      console.log(result);
    });
  }

  function test_SendFriendInvitation()
  {
    friendController.SendFriendInvitation(Number(9), Number(8)).then((result) => {
      console.log(result);
    });
  }

  function test_AcceptFriendInvitation()
  {
    friendController.AcceptFriendInvitation(Number(8), Number(9)).then((result) => {
      console.log(result);
    });
  }

  function test_DeclineFriendInvitation()
  {
    friendController.DeclineFriendInvitation(Number(8), Number(9)).then((result) => {
      console.log(result);
    });
  }

  function test_TestDatabaseConnection()
  {
    friendController.TestDatabaseConnnection().then((result) => {
      console.log(result);
    });
  }

  return (
    <>  
      <main style={{ fontFamily: 'Arial'}}>
        <h1>Spanko</h1>
        <h2>Friend Management</h2>
        <h3>Function Test</h3>
        
        <hr />

        
        <button onClick={test_GetFriendList}>Show User_8 Friendlist</button>
        <br/>
        <br/>
        <button onClick={test_EndFrienship}>End Frienship Between User_8 and User_9</button>
        <br/>
        <br/>
        <button onClick={test_GetFriendList}>Show User_8 Friendlist</button>
        <br/>
        <br/>
        <button onClick={test_SendFriendInvitation}>User_9 invites User_8 to Friendlist</button>
        <br/>
        <br/>
        <button onClick={test_GetFriendInvitationList}>Show User_8 Friend Invitation List</button>
        <br/>
        <br/>
        <button onClick={test_DeclineFriendInvitation}>User_8 Declines Friend Inivitation From User_9</button>
        <br/>
        <br/>
        <button onClick={test_SendFriendInvitation}>User_9 invites User_8 to Friendlist</button>
        <br/>
        <br/>
        <button onClick={test_GetFriendInvitationList}>Show User_8 Friend Invitation List</button>
        <br/>
        <br/>
        <button onClick={test_AcceptFriendInvitation}>User_8 Accepts Friend Invitation from User_9</button>
        <br/>
        <br/>
        <button onClick={test_GetFriendList}>Show User_8 Friendlist</button>
        <br/>
        <br/>
        <hr />
        <hr />
        <button onClick={test_TestDatabaseConnection}>Trigger TestDatabaseConnection Action</button>
        <hr />
        <hr />
      </main>
    </>
  )
}

export default App
