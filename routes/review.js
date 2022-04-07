const{builtinModules} = require("module")
const express =require("express"),
    router = express.Router(),
    review = require("../controller/review")

router.post('/create', review.create_review)
router.get('/get/:userid/:movieid', review.get_review)


module.exports = router