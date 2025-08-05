const express=require('express');
const sleepController=require('../SleepController');

const router=express.Router();


router.get('/history', sleepController.history);
router.get('/stats', sleepController.stats);

router.post('/saveSleep', sleepController.saveSleep);

module.exports=router;