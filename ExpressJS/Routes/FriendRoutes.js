const express = require('express')
const FriendController = require('./../Controllers/FriendController')
const router = express.Router()

router.get('/get_friend_list/:userid', FriendController.GetFriendList)
router.delete('/end_friendship', FriendController.EndFriendship)

router.get('/get_friend_invitation_list', FriendController.GetFriendInvitationList)
router.put('/send_friend_invitation', FriendController.SendFriendInvitation)
router.put('/accept_friend_invitation', FriendController.AcceptFriendInvitation)
router.delete('/decline_friend_invitation', FriendController.DeclineFriendInvitation)

// Test Endpoints
router.get('/test_db_connection', FriendController.TestDatabaseConnnection)

module.exports = router