const{builtinModules} = require("module")
const express =require("express"),
    router = express.Router(),
    review = require("../controller/review")

router.get('/create',review.create_review)
router.get('/get',review.get_review)

module.exports = router