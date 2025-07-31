var DBConnection = require('./../DBConnection')

exports.TestDatabaseConnnection = (req, res) =>
{
    var query = 'select * from public.user';
    DBConnection.any(query)
    .then((data) => {
    res.json({
        title : `Success.`,
        message : `Operation done succesfully.`,
        query_result : data,
    })})
    .catch((error) => {
    res.json({
        title : `Error.`,
        error_message : error,
    })});
}

exports.GetFriendList = (req, res) => 
{
    var userid = req.params['userid'];
    var query = `SELECT user_one_id, user_two_id FROM public.friendlist WHERE user_one_id = ${userid} OR user_two_id = ${userid}`

    DBConnection.any(query)
    .then((data) =>{
        res.json({
            title : `Success`, 
            message : `Operation done succesfully.`,
            data : data,
        })
    })
    .catch((error) =>{
        res.json({
            title : 'Error',
            data : error,
        })
    })
}

exports.EndFriendship = (req, res) => 
{
    var input = req.body;
    var userid = input.userid;
    var userid_to_delete = input.userid_to_delete;

    var query = `DELETE FROM friendlist WHERE user_one_id = ${userid} AND user_two_id = ${userid_to_delete}  OR user_one_id = ${userid_to_delete} AND user_two_id = ${userid}`

    DBConnection.any(query)
    .then((data) =>{
        res.json({
            title : `Success`,
            message : `Operation done succesfully.`,
            deleted_userid : userid_to_delete,
            data : data,
        })
    })
    .catch((error) =>{
        res.json({
            title : 'Error',
            data : error,
        })
    })
}

exports.GetFriendInvitationList = (req, res) =>
{
    var userid = req.headers['userid'];
    var query = `SELECT user_one_id, user_two_id FROM friendinvitations WHERE user_one_id = ${userid} OR user_two_id = ${userid}`

    DBConnection.any(query)
    .then((data) =>{
        res.json({
            title : `Success`, 
            message : `Operation done succesfully.`,
            data : data,
        })
    })
    .catch((error) =>{
        res.json({
            title : 'Error',
            data : error,
        })
    })
}

exports.SendFriendInvitation = (req, res) => 
{
    var input = req.body;
    var userid = input.userid;
    var user_id_to_add = input.user_id_to_add;
    var query = `INSERT INTO friendinvitations (user_one_id, user_two_id) VALUES (${userid}, ${user_id_to_add})`

    DBConnection.any(query)
    .then((data) =>{
        res.json({
            title : `Success`,
            message : `Operation done succesfully.`,
            invited_userid : user_id_to_add,
            data : data,
        })
    })
    .catch((error) =>{
        res.json({
            title : 'Error',
            data : error,
        })
    })
}

exports.AcceptFriendInvitation = (req, res) => 
{
    var input = req.body;
    var userid = input.userid;
    var userid_to_accept = input.userid_to_accept;

    var query_1 = `DELETE FROM friendinvitations WHERE user_one_id = ${userid} AND user_two_id = ${userid_to_accept}  OR user_one_id = ${userid_to_accept} AND user_two_id = ${userid}`
    DBConnection.any(query_1)
    .then(() =>{
        var query_2 = `INSERT INTO friendinvitations (user_one_id, user_two_id) VALUES (${userid}, ${user_id_to_add})`
        DBConnection.any(query_2)
        .then((data) =>{
            res.json({
                title : "Success",
                message : `Operation done succesfully.`,
                userid_who_invited : userid_to_accept,
                data : data
            })
        })
        .catch((error) =>{
            res.json({
                title : 'Error',
                data : error,
            })
        })
    })
    .catch((error) =>{
        res.json({
            title : 'Error',
            data : error,
        })
    })
}

exports.DeclineFriendInvitation = (req, res) => 
{
    var input = req.body;
    var userid = input.userid;
    var userid_to_decline = input.userid_to_decline;
    var query = `DELETE FROM friendinvitations WHERE user_one_id = ${userid} AND user_two_id = ${userid_to_decline}  OR user_one_id = ${userid_to_decline} AND user_two_id = ${userid}`

    DBConnection.any(query)
    .then((data) =>{
        res.json({
            title : `Success`,
            message : `Operation done succesfully.`,
            userid_who_invited : userid_to_decline,
            data : data
        })
    })
    .catch((error) =>{
        res.json({
            title : 'Error',
            data : error,
        })
    })
}