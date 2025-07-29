const express = require('express')
const FriendController = require('./../Controllers/FriendController')
const router = express.Router()

router.get('/friend_get_list', FriendController.FriendGetList)
router.delete('/friend_delete', FriendController.FriendDelete)

router.get('/friend_request_get_list', FriendController.FriendRequestGetList)
router.put('/friend_request_add', FriendController.FriendRequestAdd)
router.delete('/friend_request_delete', FriendController.FriendRequestDelete)

module.exports = router