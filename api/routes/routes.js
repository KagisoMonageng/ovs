const express = require("express");
const main = require("../controllers/main");

const router = express.Router();

router.get('/',(req,res)=>{
res.send("Hello, world!");
});

router.post('/opt',main.addOpt)
router.post('/sign',main.sign)
router.post('/vote/:id/:opt_vote',main.vote)




module.exports = router;