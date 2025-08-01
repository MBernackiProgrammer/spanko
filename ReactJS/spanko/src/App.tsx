import { FriendController } from './Development/FriendController'

function App()
{
    const friendController = new FriendController()

    function GetAllFromFriendsList(userID : number)
    {
        friendController.GetAllFromFriendsList(userID).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    }

    function EndAFriendship(userID : number , userIDToEndFriendshipWith : number)
    {
        friendController.EndAFriendship(userID , userIDToEndFriendshipWith).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    }

    function GetAllFromFriendInvitationsList(userID : number)
    {
        friendController.GetAllFromFriendInvitationsList(userID).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    }

    function SendAnInvitationToFriendslist(userID : number , userIDToInvite : number)
    {
        friendController.SendAnInvitationToFriendslist(userID, userIDToInvite).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    }

    function AcceptFriendListInvitation(userID : number , userIDToAccept : number)
    {
        friendController.AcceptFriendListInvitation(userID , userIDToAccept).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    }

    function DeclineFriendListInvitation(userID : number , userIDToDecline :  number)
    {
        friendController.DeclineFriendListInvitation(userID , userIDToDecline).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    }

    return(
        <>
            <h1 style={{textAlign : "center"}}>FriendController Test Page</h1>

            <hr />

            <section style={{width : "100%" , textAlign : "center" , display : "flex" , flexDirection : "column" , gap : "1rem" , paddingTop : "1rem"}}>

              <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => GetAllFromFriendsList(8)}>GetAllFromFriendsList(8)</button>

              <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => EndAFriendship(8,11)}>EndAFriendship(8,11)</button>
              
              <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => SendAnInvitationToFriendslist(11,8)}>SendAnInvitationToFriendslist(11,8)</button>

              <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => GetAllFromFriendInvitationsList(8)}>GetAllFromFriendInvitationsList(8)</button>

              <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => GetAllFromFriendInvitationsList(11)}>GetAllFromFriendInvitationsList(11)</button>

              <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => AcceptFriendListInvitation(8,11)}>AcceptFriendListInvitation(8,11)</button>

              <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => DeclineFriendListInvitation(8,11)}>DeclineFriendListInvitation(8,11)</button>

            </section>
        </>
    )
}


export default App