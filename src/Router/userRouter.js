import express from "express"
import { getUser, getuserprofile } from "../Controller/userController.js"


const user = express.Router()

user.route("/getuser").post(getUser)
user.route("/getuserprofile").post(getuserprofile)







export default user