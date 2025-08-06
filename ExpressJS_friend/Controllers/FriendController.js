var DBConnection = require('./../Shared/DBConnection')
const jwt = require('jsonwebtoken')
const Static = require("./../Shared/Static")

function UserCheck(input)
{
    // var query = `SELECT id FROM public.user WHERE id = ${input}`
    var query = `SELECT CASE WHEN user_one_id=${input} THEN user_two_id WHEN user_two_id=${input} THEN user_one_id END AS user_${input}_friend WHERE user_one_id=${input} OR user_two_id=${input}`

    return DBConnection.any(query).then((data)=>{
        if(data != null)
        {
            return true
        }
        else
        {
            return false
        }
    }).catch((error)=>{
        console.log("Error in UserCheck.")
        console.log(error)

        return "Check API console."
    })
}

const activeSession = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  
    if (token == null)
    {
        return res.sendStatus(401); 
    }
    else
    {
        return jwt.verify(token, Static.key , (error, user) =>{
            console.log("Error in activeSession.");
            console.log(error);
            if(error)
            {
                return;
            }
            console.log(user);
            req.user = user;
            return;
        })
    }

}

exports.GetAllFromFriendsList = async (req, res) => 
{   
    activeSession(req, res).then(()=>{
        if(req.user)
        {
            var userID = req.user.account_id;
            if(UserCheck(userID))
            {
                // var query = `SELECT user_one_id, user_two_id FROM friendlist WHERE user_one_id = ${userID} OR user_two_id = ${userID}`
                var query = `SELECT CASE WHEN user_one_id=${input} THEN user_two_id WHEN user_two_id=${input} THEN user_one_id END AS user_${input}_friend FROM friendlist WHERE user_one_id=${input} OR user_two_id=${input}`
                DBConnection.any(query).then((data)=>{
                    if(data.length == 0)
                    {
                        res.json({
                            success : true,
                            friends_to_show : false,
                            data : data,
                        })
                    }
                    else
                    {
                        res.json({
                            success : true,
                            friends_to_show : true,
                            data : data,
                        })
                    }
                }).catch((error) =>{
                    res.json({
                        success : false,
                        error : error,
                        message : "Error. Query ended with an error."
                    })
                })
            }
            else
            {
                res.json({
                    success : false,
                    message : "Failure. User might not exist exist.",
                    user_check_output : UserCheck(userID)
                })
            }
        }
        else
        {
            res.json({
                success : false,
                message : "Failure. Session is not valid."
            })
        }
    }).catch((error)=>{
        res.json({
            success : false,
            error : error,
            message : "Error. Session check ended with an error."
        })
    })
}

exports.EndAFriendship = async (req, res) => 
{
    activeSession(req, res).then(()=>{
        if(req.user)
        {
            var userID = req.user.account_id;
            var userIDToEndFriendshipWith = req.body.user_id_to_end_friendship_with;
            if(UserCheck(userID) && UserCheck(userIDToEndFriendshipWith))
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
                                data : data,
                            })
                        }).catch((error)=>{
                            res.json({
                                success : false,
                                error : error,
                                message : "Error in the second query.",
                            })
                        })
                    }
                    else
                    {
                        res.json({
                            success : false,
                            data : data,
                            message : "Failure. They weren't friends.",
                        })
                    }
                }).catch((error)=>{
                    res.json({
                        success : false,
                        error : error,
                        message : "Error in the first query.",
                    })
                })
            }
            else
            {
                res.json({
                    success : false,
                    message : "Failure. One of the users might not exist exist.",
                    user_check_output_1 : UserCheck(userID),
                    user_check_output_2 : UserCheck(userIDToEndFriendshipWith),
                })
            }
        }
        else
        {
            res.json({
                success : false,
                message : "Failure. Session is not valid."
            })
        }
    }).catch((error)=>{
        res.json({
            success : false,
            error : error,
            message : "Error. Session check ended with an error."
        })
    })
}

exports.GetAllFromFriendInvitationsList = async (req, res) =>
{   
    activeSession(req, res).then(()=>{
        if(req.user)
        {
            var userID = req.user.account_id;
            if(UserCheck(userID))
            {
                var query = `SELECT CASE WHEN user_one_id=${input} THEN user_two_id WHEN user_two_id=${input} THEN user_one_id END AS user_${input}_friend FROM friendlist_invitations WHERE user_one_id=${input} OR user_two_id=${input}`
                DBConnection.any(query).then((data)=>{
                    if(data.length == 0)
                    {
                        res.json({
                            success : true,
                            friends_to_show : false,
                            data : data,
                        })
                    }
                    else
                    {
                        res.json({
                            success : true,
                            friends_to_show : true,
                            data : data,
                        })
                    }
                }).catch((error) =>{
                    res.json({
                        success : false,
                        error : error,
                        message : "Error. Query ended with a failure.",
                    })
                })
            }
            else
            {
                res.json({
                    success : false,
                    message : "Failure. User might not exist exist.",
                    user_check_output : UserCheck(userID)
                })
            }
        }
        else
        {
            res.json({
                success : false,
                message : "Failure. Session is not valid."
            })
        }
    }).catch((error)=>{
        res.json({
            success : false,
            error : error,
            message : "Error. Session check ended with an error."
        })
    })
}

exports.SendAnInvitationToFriendslist = async (req, res) => 
{
    activeSession(req, res).then(()=>{
        if(req.user)
        {
            var userID = req.user.account_id;
            var userIDToInvite = req.body.user_id_to_invite;
            if(UserCheck(userID) && UserCheck(userIDToInvite))
            {
                var query_1 = `SELECT * FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToInvite} OR user_one_id = ${userIDToInvite} AND user_two_id = ${userID}`
                DBConnection.any(query_1).then((data)=>{
                    if(data.length > 0)
                    {
                        res.json({
                            success : false,
                            data : data,
                            message : "Failure. An invite has alredy been sent.",
                        })
                    }
                    else
                    {
                        var query_2 = `INSERT INTO friendlist_invitations (user_one_id, user_two_id) VALUES (${userID}, ${userIDToInvite})`
                        DBConnection.any(query_2).then((data)=>{
                            res.json({
                                success : true,
                                data : data,
                            })
                        }).catch((error) =>{
                            res.json({
                                success : false,
                                error : error,
                                message : "Error. Query 2 ended with an error.",
                            })
                        })
                    }
                }).catch((error) =>{
                    res.json({
                        success : false,
                        error : error,
                        message : "Error. Query 1 ended with an error.",
                    })
                })
            }
            else
            {
                res.json({
                    success : false,
                    message : "Failure. One of the users might not exist exist.",
                    user_check_output_1 : UserCheck(userID),
                    user_check_output_2 : UserCheck(userIDToEndFriendshipWith),
                })
            }   
        }
        else
        {
            res.json({
                success : false,
                message : "Failure. Session is not valid."
            })
        }
    }).catch((error)=>{
        res.json({
            success : false,
            error : error,
            message : "Error. Session check ended with an error."
        })
    })
}

exports.AcceptFriendListInvitation = async (req, res) => 
{
    activeSession(req, res).then(()=>{
        if(req.user)
        {
            var userID = req.user.account_id;
            var userIDToAccept = req.body.userid_to_accept;
            if(UserCheck(userID) && UserCheck(userIDToAccept))
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
                                })
                            }).catch((error)=>{
                                res.json({
                                    success : false,
                                    error : error,
                                    message : "Error. Query 3 ended with an error.",
                                })
                            })
                        }).catch((error)=>{
                            res.json({
                                success : false,
                                error : error,
                                message : "Error. Query 2 ended with an error.",
                            })
                        })
                    }
                    else
                    {
                        res.json({
                            success : false,
                            error : error,
                            title : "Failure.",
                        })
                    }
                }).catch((error)=>{
                    res.json({
                        success : false,
                        error : error,
                        message : "Error. Query 1 ended with an error.",
                    })
                })
            }
        }
        else
        {
            res.json({
                success : false,
                message : "Failure. Session is not valid."
            })
        }
    }).catch((error)=>{
        res.json({
            success : false,
            error : error,
            message : "Error. Session check ended with an error."
        })
    })
}

exports.DeclineFriendListInvitation = async (req, res) => 
{
    activeSession(req, res).then(()=>{
        if(req.user)
        {
            var userID = req.user.account_id;
            var userIDToDecline = req.body.userid_to_decline;
            if(UserCheck(userID) && UserCheck(userIDToDecline))
            {
                var query_1 = `SELECT * FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToDecline}  OR user_one_id = ${userIDToDecline} AND user_two_id = ${userID}`
                DBConnection.any(query_1).then((data)=>{
                    if(data.length > 0)
                    {
                        var query_2 = `DELETE FROM friendlist_invitations WHERE user_one_id = ${userID} AND user_two_id = ${userIDToDecline}  OR user_one_id = ${userIDToDecline} AND user_two_id = ${userID}`
                        DBConnection.any(query_2).then((data)=>{
                            res.json({
                                success : true,
                                data : data,
                                title : "Success.",
                                message : "Declined the invitation.",
                            })
                        }).catch((error)=>{
                            res.json({
                                success : false,
                                error : error,
                                message : "Error. Query 2 ended with an error.",
                            })
                        })
                    }
                    else
                    {
                        res.json({
                            success : false,
                            data : data,
                            title : "Failure.",
                            message : "There wasn't an invite.",
                        })
                    }
                }).catch((error)=>{
                    res.json({
                        message : "Error. Query 1 ended with an error.",
                        error : error,
                    })
                })
            }
        }
        else
        {
            res.json({
                success : false,
                message : "Failure. Session is not valid."
            })
        }
    }).catch((error)=>{
        res.json({
            success : false,
            error : error,
            message : "Error. Session check ended with an error."
        })
    })
}