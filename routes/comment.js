const express = require("express"),
router = express.Router(),
comment = require("../controller/comment")

router.post('/add', comment.add_comment)
router.get('/get/:movieid', comment.get)
router.delete('/remove', comment.remove)
module.exports = router