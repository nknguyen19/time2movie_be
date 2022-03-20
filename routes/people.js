const {builtinModules} = require("module")
const express=require("express")
const router = express.Router()
const people = require("../controller/people")

router.get("/create",people.create_people);
router.get('/get-people',people.get_people)

module.exports=router