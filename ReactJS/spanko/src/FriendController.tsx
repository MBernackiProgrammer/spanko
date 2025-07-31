export class FriendController
{
    async GetFriendList(userID : number):Promise<string>
    {
        try
        {
            const response = await fetch(`http://localhost:3000/friend/get_friend_list/${userID}`, {
                method: 'GET',
            })
            const returnJSON = await response.json()
            console.log(returnJSON);
            return `Endpoint works`;
        }
        catch (error)
        {
            alert('Check console')
            return `GetFriendList: ${error}`;
        }
    }

    async EndFrienship(userID : number, userIDToEndFriendshipWith : number):Promise<string>
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
            const returnJSON = await response.json()
            console.log(returnJSON);
            return `Endpoint works`;
        }
        catch (error)
        {
            alert('Check console')
            return `EndFriendship: ${error}`;
        }
    }

    async GetFriendInvitationList(userID : number):Promise<string>
    {
        try
        {
            const response = await fetch(`http://localhost:3000/friend/get_friend_invitation_list?userid=${userID}`, {
                method: 'GET',
            })
            const returnJSON = await response.json()
            console.log(returnJSON);
            return `Endpoint works`;
        }
        catch (error)
        {
            alert('Check console')
            return `GetFriendInvitationList: ${error}`;
        }
    }

    async SendFriendInvitation(userID : number, userIDToInvite : number):Promise<string>
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
            const returnJSON = await response.json()
            console.log(returnJSON);
            return `Endpoint works`;
        }
        catch (error)
        {
            alert('Check console')
            return `SendFriendInvitation: ${error}`;
        }
    }

    async AcceptFriendInvitation(userID : number, userIDToAccept : number):Promise<string>
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
            const returnJSON = await response.json()
            console.log(returnJSON);
            return `Endpoint works`;
        }
        catch (error)
        {
            alert('Check console')
            return `AcceptFriendInvitation: ${error}`;
        }
    }

    async DeclineFriendInvitation(userID : number, userIDToDecline : number):Promise<string>
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
                    userid_to_decline: userIDToDecline,
                })
            })
            const returnJSON = await response.json()
            console.log(returnJSON);
            return `Endpoint works`;
        }
        catch (error)
        {
            alert('Check console')
            return `DeclineFriendInvitation: ${error}`;
        }
    }

    async TestDatabaseConnnection():Promise<string>
    {
        try
        {
            const response = await fetch(`http://localhost:3000/friend/test_db_connection`, {
                method: 'GET',
            })
            const returnJSON = await response.json()
            console.log(returnJSON);
            return `Endpoint works`;
        }
        catch (error)
        {
            alert('Check console')
            return `TestDatabaseConnnection: ${error}`;
        }
    }
}

export default FriendController;