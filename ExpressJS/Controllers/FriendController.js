exports.GetFriendList = (req, res) => 
{
    const userid = req.headers['userid'];

    console.log(`Input ID -> ${userid}`);

    res.json({message: "GetFriendList endpoint works.",});
}

exports.EndFriendship = (req, res) => 
{
    const input = req.body;

    console.log("Input. " +  JSON.stringify(input));

    res.json({message: "EndFriendship endpoint works.",});
}

exports.GetFriendInvitationList = (req, res) =>
{
    const userid = req.headers['userid'];

    console.log(`Input ID -> ${userid}`);

    res.json({message: "GetFriendRequestList endpoint works.",});
}

exports.SendFriendInvitation = (req, res) => 
{
    const input = req.body;

    console.log("Input. " +  JSON.stringify(input));

    res.json({message: "RequestFriendship endpoint works.",});
}

exports.AcceptFriendInvitation = (req, res) => 
{
    const input = req.body;

    console.log("Input. " +  JSON.stringify(input));

    res.json({message: "AcceptFriendInvitation endpoint works.",});
}

exports.DeclineFriendInvitation = (req, res) => 
{
    const input = req.body;

    console.log("Input. " +  JSON.stringify(input));

    res.json({message: "DeclineFriendInvitation endpoint works.",});
}