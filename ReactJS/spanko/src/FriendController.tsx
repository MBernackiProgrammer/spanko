export class FriendController
{
    async GetFriendList(userID : bigint):Promise<string>
    {
        try
        {
            const response = await fetch(`http://localhost:3000/friend/get_friend_list?userid=${userID}`, {
                method: 'GET',
            })

            const returnData = await response.json()
            console.log('GetFriendList:', returnData.message)

            return "GetFriendList works.";
        }
        catch (error)
        {
            alert('DEVELOPMENT ERROR | Check console | Remove this alert in futere')
            console.error('Error in GetFriendList:', error);
            return "GetFriendList doesn't work.";
        }
    }

    async EndFrienship(userID : bigint, userIDToEndFriendshipWith : bigint):Promise<string>
    {
        try
        {

            const response = await fetch('http://localhost:3000/friend/end_friendship', {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userID,
                    userid_to_delete: userIDToEndFriendshipWith,
                })
            })

            const returnData = await response.json()
            console.log('EndFriendship:', returnData.message)

            return "EndFriendship works.";
        }
        catch (error)
        {
            alert('DEVELOPMENT ERROR | Check console | Remove this alert in futere')
            console.error('Error in EndFriendship:', error);
            return "EndFriendship doesn't work.";
        }
    }

    async GetFriendInvitationList(userID : bigint):Promise<string>
    {
        try
        {
            const response = await fetch(`http://localhost:3000/friend/get_friend_invitation_list?userid=${userID}`, {
                method: 'GET',
            })

            const returnData = await response.json()
            console.log('GetFriendInvitationList:', returnData.message)

            return "GetFriendInvitationList works.";
        }
        catch (error)
        {
            alert('DEVELOPMENT ERROR | Check console | Remove this alert in futere')
            console.error('Error in GetFriendInvitationList:', error);
            return "GetFriendInvitationList doesn't work.";
        }
    }

    async SendFriendInvitation(userID : bigint, userIDToInvite : bigint):Promise<string>
    {
        try
        {
            const response = await fetch('http://localhost:3000/friend/send_friend_invitation', {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userID,
                    user_id_to_add: userIDToInvite,
                })
            })

            const returnData = await response.json()
            console.log('SendFriendInvitation:', returnData.message)

            return "SendFriendInvitation works.";
        }
        catch (error)
        {
            alert('DEVELOPMENT ERROR | Check console | Remove this alert in futere')
            console.error('Error in SendFriendInvitation:', error);
            return "SendFriendInvitation doesn't work.";
        }
    }

    async AcceptFriendInvitation(userID : bigint, userIDToAccept : bigint):Promise<string>
    {
        try
        {
            const response = await fetch('http://localhost:3000/friend/accept_friend_invitation', {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userID,
                    userid_to_accept: userIDToAccept,
                })
            })

            const returnData = await response.json()
            console.log('AcceptFriendInvitation:', returnData.message)

            return "AcceptFriendInvitation works.";
        }
        catch (error)
        {
            alert('DEVELOPMENT ERROR | Check console | Remove this alert in futere')
            console.error('Error in AcceptFriendInvitation:', error);
            return "AcceptFriendInvitation doesn't work.";
        }
    }

    async DeclineFriendInvitation(userID : bigint, userIDToDecline : bigint):Promise<string>
    {
        try
        {
            const response = await fetch('http://localhost:3000/friend/decline_friend_invitation', {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userID,
                    userid_to_delete: userIDToDecline,
                })
            })

            const returnData = await response.json()
            console.log('DeclineFriendInvitation:', returnData.message)

            return "DeclineFriendInvitation works.";
        }
        catch (error)
        {
            alert('DEVELOPMENT ERROR | Check console | Remove this alert in futere')
            console.error('Error in DeclineFriendInvitation:', error);
            return "DeclineFriendInvitation doesn't work.";
        }
    }
}

export default FriendController;