import { useState } from 'react';
import { FriendController } from './Development/FriendController'
import ProfilePictureController from './Development/ProfilePictureController';

function App()
{
    const friendController = new FriendController()
    // function GetAllFromFriendsList(userID : number)
    // {
    //     friendController.GetAllFromFriendsList(userID).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    // }
    // function EndAFriendship(userID : number , userIDToEndFriendshipWith : number)
    // {
    //     friendController.EndAFriendship(userID , userIDToEndFriendshipWith).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    // }
    // function GetAllFromFriendInvitationsList(userID : number)
    // {
    //     friendController.GetAllFromFriendInvitationsList(userID).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    // }
    // function SendAnInvitationToFriendslist(userID : number , userIDToInvite : number)
    // {
    //     friendController.SendAnInvitationToFriendslist(userID, userIDToInvite).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    // }
    // function AcceptFriendListInvitation(userID : number , userIDToAccept : number)
    // {
    //     friendController.AcceptFriendListInvitation(userID , userIDToAccept).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    // }
    // function DeclineFriendListInvitation(userID : number , userIDToDecline :  number)
    // {
    //     friendController.DeclineFriendListInvitation(userID , userIDToDecline).then((result) => {console.log(result)}).catch((error) => {console.error(error)})
    // }


    // const profilePictureController = new ProfilePictureController()
    // const Upload = async () => 
    // {
    //     var imageInput = document.getElementById('imageInput') as HTMLInputElement;
    //     var file = imageInput?.files?.[0];
    //     var input = document.getElementById("userID") as HTMLInputElement
    //     console.log(input.value)
    //     var userID = parseInt(input?.value)
    //     console.log(userID)
    //     if(!file)
    //     {
    //         alert("File wasn't provided.")
    //         return;
    //     }
    //     else
    //     {  
    //         if(!userID)
    //         {
    //             alert("no user id")
    //             return
    //         }
    //         else
    //         {
    //             var response = await profilePictureController.UploadImage(file, userID)
    //             if(!response)
    //             {
    //                 alert("problem")
    //             }
    //             else
    //             {
    //                 alert("ok")
    //             }
    //         }
    //     }   
    // }

    // const [imageDownloaded , setIfDownloaded] = useState<true | null>(null)
    // const [imageURL , setImageURL] = useState<string | undefined>(undefined)
    // const Download = async () =>
    // {
    //     var input = document.getElementById("userID") as HTMLInputElement
    //     var userID = parseInt(input?.value)
    //     if(!userID)
    //     {
    //         alert("ID wasn't provided.")
    //         return
    //     }
    //     else
    //     {
    //         var response = await profilePictureController.DownloadImage(userID)
    //         setImageURL(URL.createObjectURL(response))
    //         setIfDownloaded(true)
    //     }
    // }



    return(
        <>
            <h1 style={{textAlign : "center"}}>Controller Test Page</h1>

            <hr />

            <section style={{width : "100%" , textAlign : "center" , display : "flex" , flexDirection : "column" , gap : "1rem" , paddingTop : "1rem"}}>

                {/*
                <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => GetAllFromFriendsList(8)}>GetAllFromFriendsList(8)</button>
                <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => EndAFriendship(8,11)}>EndAFriendship(8,11)</button>
                <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => SendAnInvitationToFriendslist(11,8)}>SendAnInvitationToFriendslist(11,8)</button>
                <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => GetAllFromFriendInvitationsList(8)}>GetAllFromFriendInvitationsList(8)</button>
                <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => GetAllFromFriendInvitationsList(11)}>GetAllFromFriendInvitationsList(11)</button>
                <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => AcceptFriendListInvitation(8,11)}>AcceptFriendListInvitation(8,11)</button>
                <button style={{paddingTop : "1rem" , paddingBottom : "1rem"}} onClick={() => DeclineFriendListInvitation(8,11)}>DeclineFriendListInvitation(8,11)</button>
                */}

                {/* <input type="file" accept="image/*" id='imageInput'/>
                <input type="number" id='userIDtoUpload' onChange={getUploadUserID}/>
                <button onClick={Upload}>Upload</button>
                <br />
                <input type="number" id='userIDtoDownload'/>
                <button onClick={Download}>DownloadTheImage</button>
                {imageDownloaded && <img src={imageURL} alt='nie działa' style={{maxWidth : "300px"}}/>} */}

            </section>
        </>
    )
}


export default App