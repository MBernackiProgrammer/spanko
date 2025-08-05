export class FriendController
{
    async GetAllFromFriendsList(userID : number):Promise<string>
    {
        try
        {
            const response = await fetch(`http://localhost:3000/friend/get_all_from_friends_list/${userID}`, {
                method: 'GET',
            })
            return await response.json()
        }
        catch (error)
        {
            console.log("Error.")
            console.error(error)
            return "Error.";
        }
    }

    async EndAFriendship(userID : number, userIDToEndFriendshipWith : number):Promise<string>
    {
        try
        {

            const response = await fetch('http://localhost:3000/friend/end_a_friendship', {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userID,
                    user_id_to_end_friendship_with: userIDToEndFriendshipWith,
                })
            })
            return await response.json()
        }
        catch (error)
        {
            console.log("Error.")
            console.error(error)
            return "Error.";
        }
    }

    async GetAllFromFriendInvitationsList(userID : number):Promise<string>
    {
        try
        {
            const response = await fetch(`http://localhost:3000/friend/get_all_from_friend_invitations_list/${userID}`, {
                method: 'GET',
            })
            return await response.json()
        }
        catch (error)
        {
            console.log("Error.")
            console.error(error)
            return "Error.";
        }
    }

    async SendAnInvitationToFriendslist(userID : number, userIDToInvite : number):Promise<string>
    {
        try
        {
            const response = await fetch('http://localhost:3000/friend/send_an_invitation_to_friends_list', {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userID,
                    user_id_to_invite: userIDToInvite,
                })
            })
            return await response.json()
        }
        catch (error)
        {
            console.log("Error.")
            console.error(error)
            return "Error.";
        }
    }

    async AcceptFriendListInvitation(userID : number, userIDToAccept : number):Promise<string>
    {
        try
        {
            const response = await fetch('http://localhost:3000/friend/accept_friend_list_invitation', {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userID,
                    userid_to_accept: userIDToAccept,
                })
            })
            return await response.json()
        }
        catch (error)
        {
            console.log("Error.")
            console.error(error)
            return "Error.";
        }
    }

    async DeclineFriendListInvitation(userID : number, userIDToDecline : number):Promise<string>
    {
        try
        {
            const response = await fetch('http://localhost:3000/friend/decline_friend_list_invitation', {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userID,
                    userid_to_decline: userIDToDecline,
                })
            })
            return await response.json()
        }
        catch (error)
        {
            console.log("Error.")
            console.error(error)
            return "Error.";
        }
    }
}

export default FriendController;