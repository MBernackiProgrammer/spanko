var DBConnection = require('./../Shared/DBConnection')

function UserCheck(input)
{
    var query = `SELECT id FROM public.user WHERE id = ${input}`

    return DBConnection.any(query).then((data)=>{
        if(data != null)
        {
            return true
        }
        else
        {
            return false
        }
    }).catch((error)=>{console.log(error)})
}

const activeSession = async (req, res) => {
    if(!req.cookies || !req.cookies.expressSession)
    {
        return Promise.resolve(-1);
    }
    else
    {
        const token = req.cookies.expressSession.toString().substring(1, req.cookies.expressSession.toString().length-1);        
        const query = `SELECT * from public.session where session_token='${token}';`;
    
        return DBConnection.oneOrNone(query)
        .then((data) => {
            console.log('success');
    
            if(data)
            {
                return data;               
            }
            else
            {                
                res.clearCookie('expressSession', { httpOnly: true });
                return -1;
            }
        })
        .catch((error) => {
            console.log('ERROR', error)
            return -1;
        });
    }
}

exports.GetAllFromFriendsList = async (req, res) => 
{   
    if(!req.cookies || !req.cookies.expressSession)
    {
        res.json({
            success : false,
            input : req,
            title : "Cookie failure.",
            message : "There is a problem with Cookies.",
        })
    }
    else
    {
        var userID = req.params['user_id'];

        if(await UserCheck(userID))
        {
            var query = `SELECT user_one_id, user_two_id FROM friendlist WHERE user_one_id = ${userID} OR user_two_id = ${userID}`
            DBConnection.any(query).then((data)=>{
                if(data.length == 0)
                {
                    res.json({
                        success : true,
                        friends_to_show : false,
                        input : userID,
                        data : data,
                        title : "Success.",
                        message : "There are no friends to show.",
                    })
                }
                else
                {
                    res.json({
                        success : true,
                        friends_to_show : true,
                        data : data,
                        title : "Success.",
                        message : "There are friends to show.",
                    })
                }
            }).catch((error) =>{
                res.json({
                    success : false,
                    input : userID,
                    error : error,
                    title : "Error.",
                    message : "Operation ended with an error.",
                })
            })
        }
        else
        {
            res.json({
                success : false,
                input : userID,
                title : "Failure.",
                message : "User doesn't exist.",
            })
        }
    }
}

exports.EndAFriendship = async (req, res) => 
{
    if(!req.cookies || !req.cookies.expressSession)
    {
        res.json({
            success : false,
            input : req,
            title : "Cookie failure.",
            message : "There is a problem with Cookies.",
        })
    }
    else
    {
        var userID = req.body.user_id;
        var userIDToEndFriendshipWith = req.body.user_id_to_end_friendship_with;

        if(await UserCheck(userID) && await UserCheck(userIDToEndFriendshipWith))
        {
            var query_1 = `SELECT * FROM friendlist WHERE user_one_id = ${userID} AND user_two_id = ${userIDToEndFriendshipWith} OR user_one_id = ${userIDToEndFriendshipWith} AND user_two_id = ${userID}`

            DBConnection.any(query_1).then((data)=>{
                if(data.length > 0)
                {
                    var query_2 = `DELETE FROM friendlist WHERE user_one_id = ${userID} AND user_two_id = ${userIDToEndFriendshipWith}  OR user_one_id = ${userIDToEndFriendshipWith} AND user_two_id = ${userID}`

                    DBConnection.any(query_2).then((data)=>{
                        res.json({
                            success : true,
                            ended_friendship_with_user_id : userIDToEndFriendshipWith,
                            input: req.body,
                            data : data,
                            title : `Success.`,
                            message : `Friendship ended.`,
                        })
                    }).catch((error)=>{
                        res.json({
                            success : false,
                            input : req.body,
                            error : error,
                            title : "Error.",
                            message : "Operation ended with an error.",
                        })
                    })
                }
                else
                {
                    res.json({
                        success : false,
                        input : req.body,
                        title : "Failure",
                        message : "They weren't friends.",
                    })
                }
            }).catch((error)=>{
                res.json({
                    success : false,
                    input : req.body,
                    error : error,
                    title : "Error.",
                    message : "Operation ended with an error.",
                })
            })
        }
        else
        {
            res.json({
                success : false,
                input : req.body,
                title : "Failure.",
                message : "One of the Users doesn't exist.",
            }) 
        }
    }
}

exports.GetAllFromFriendInvitationsList = async (req, res) =>
{   
    if(!req.cookies || !req.cookies.expressSession)
    {
        res.json({
            success : false,
            input : req,
            title : "Cookie failure.",
            message : "There is a problem with Cookies.",
        })
    }
    else
    {
        var userID = req.params['user_id'];

        if(await UserCheck(userID))
        {
            var query = `SELECT user_one_id, user_two_id FROM friendlist_invitations WHERE user_one_id = ${userID} OR user_two_id = ${userID}`
            DBConnection.any(query).then((data)=>{
                if(data.length == 0)
                {
                    res.json({
                        success : true,
                        friends_to_show : false,
                        input : userID,
                        data : data,
                        title : "Success.",
                        message : "There are no friends list invites to show.",
                    })
                }
                else
                {
                    res.json({
                        success : true,
                        friends_to_show : true,
                        data : data,
                        title : "Success.",
                        message : "There are friend list invites to show.",
                    })
                }
            }).catch((error) =>{
                res.json({
                    success : false,
                    input : userID,
                    error : error,
                    title : "Error.",
                    message : "Operation ended with an error.",
                })
            })
        }
        else
        {
            res.json({
                success : false,
                input : userID,
                title : "Failure.",
                message : "User doesn't exist.",
            })
        }
    }
}

exports.SendAnInvitationToFriendslist = async (req, res) => 
{
    if(!req.cookies || !req.cookies.expressSession)
    {
        res.json({
            success : false,
            input : req,
            title : "Cookie failure.",
            message : "There is a problem with Cookies.",
        })
    }
    else
    {
        var userID = req.body.user_id;
        var userIDToInvite = req.body.user_id_to_invite;

        if(await UserCheck(userID) && await UserCheck(userIDToInvite))
        {
            var query_1 = `SELECT * FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToInvite} OR user_one_id = ${userIDToInvite} AND user_two_id = ${userID}`
            DBConnection.any(query_1).then((data)=>{
                if(data.length > 0)
                {
                    res.json({
                        success : false,
                        input : req.body,
                        data : data,
                        title : "Failure.",
                        message : "An invite has alredy been sent.",
                    })
                }
                else
                {
                    var query_2 = `INSERT INTO friendlist_invitations (user_one_id, user_two_id) VALUES (${userID}, ${userIDToInvite})`
                    DBConnection.any(query_2).then((data)=>{
                        res.json({
                            success : true,
                            input : req.body,
                            data : data,
                            title : "Success.",
                            message : "Invite sent."
                        })
                    }).catch((error) =>{
                        res.json({
                            success : false,
                            input : req.body,
                            error : error,
                            title : "Error.",
                            message : "Operation ended with an error.",
                        })
                    })
                }
            })
        }
        else
        {
            res.json({
                success : false,
                input : req.body,
                title : "Failure.",
                message : "One of the Users doesn't exist.",
            })
        }   
    }
}

exports.AcceptFriendListInvitation = async (req, res) => 
{
    if(!req.cookies || !req.cookies.expressSession)
    {
        res.json({
            success : false,
            input : req,
            title : "Cookie failure.",
            message : "There is a problem with Cookies.",
        })
    }
    else
    {
        var userID = req.body.user_id;
        var userIDToAccept = req.body.userid_to_accept;
        if(await UserCheck(userID) && await UserCheck(userIDToAccept))
        {
            var query_1 = `SELECT * FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToAccept}  OR user_one_id = ${userIDToAccept} AND user_two_id = ${userID}`
            DBConnection.any(query_1).then((data)=>{
                if(data.length > 0)
                {
                    var query_2 = `DELETE FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToAccept}  OR user_one_id = ${userIDToAccept} AND user_two_id = ${userID}`
                    DBConnection.any(query_2).then((data)=>{
                        var query_3 = `INSERT INTO friendlist (user_one_id, user_two_id) VALUES (${userID}, ${userIDToAccept})`
                        DBConnection.any(query_3).then((data)=>{
                            res.json({
                                success : true,
                                data : data,
                                input : req.body,
                                title : "Success.",
                                message : "Accepted the invitation.",
                            })
                        }).catch((error)=>{
                            res.json({
                                success : false,
                                input : req.body,
                                error : error,
                                title : "Failure.",
                                message : "Operation ended with a failure.",
                            })
                        })
                    }).catch((error)=>{
                        res.json({
                            success : false,
                            input : req.body,
                            error : error,
                            title : "Error.",
                            message : "Operation ended with a failure.",
                        })
                    })
                }
                else
                {
                    res.json({
                        success : false,
                        input : req.body,
                        error : error,
                        title : "Failure.",
                    })
                }
            }).catch((error)=>{
                res.json({
                    success : false,
                    input : req.body,
                    error : error,
                    title : "Error",
                    message : "Operation ended with an error.",
                })
            })
        }
    }
}

exports.DeclineFriendListInvitation = async (req, res) => 
{
    if(!req.cookies || !req.cookies.expressSession)
    {
        res.json({
            success : false,
            input : req,
            title : "Cookie failure.",
            message : "There is a problem with Cookies.",
        })
    }
    else
    {
        var userID = req.body.user_id;
        var userIDToDecline = req.body.userid_to_decline;
        if(await UserCheck(userID) && await UserCheck(userIDToDecline))
        {
            var query_1 = `SELECT * FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToDecline}  OR user_one_id = ${userIDToDecline} AND user_two_id = ${userID}`
            DBConnection.any(query_1).then((data)=>{
                if(data.length > 0)
                {
                    var query_2 = `DELETE FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToDecline}  OR user_one_id = ${userIDToDecline} AND user_two_id = ${userID}`
                    DBConnection.any(query_2).then((data)=>{
                        res.json({
                            success : true,
                            input : req.body,
                            data : data,
                            title : "Success.",
                            message : "Declined the invitation.",
                        })
                    }).catch((error)=>{
                        res.json({
                            success : false,
                            input : req.body,
                            error : error,
                            title : "Error.",
                            message : "Operation ended with a failure.",
                        })
                    })
                }
                else
                {
                    res.json({
                        success : false,
                        input : req.body,
                        data : data,
                        title : "Failure.",
                        message : "There wasn't an invite.",
                    })
                }
            }).catch((error)=>{
                res.json({
                    title : "Error",
                    message : "Operation ended with an error.",
                    error : error,
                })
            })
        }
    }
}