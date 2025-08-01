const express = require('express')
const FriendController = require('./../Controllers/FriendController')
const router = express.Router()

router.get('/get_all_from_friends_list/:user_id', FriendController.GetAllFromFriendsList)
router.delete('/end_a_friendship', FriendController.EndAFriendship)

router.get('/get_all_from_friend_invitations_list/:user_id', FriendController.GetAllFromFriendInvitationsList)
router.put('/send_an_invitation_to_friends_list', FriendController.SendAnInvitationToFriendslist)
router.put('/accept_friend_list_invitation', FriendController.AcceptFriendListInvitation)
router.delete('/decline_friend_list_invitation', FriendController.DeclineFriendListInvitation)

module.exports = router