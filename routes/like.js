const express =require("express"),
    router = express.Router(),
    like = require("../controller/like")
router.get('/get/:commentid', like.get_like)
router.post('/add', like.add_like)
router.delete('/remove', like.remove_like)

module.exports = router