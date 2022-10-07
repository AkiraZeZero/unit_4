require('dotenv').config()

const express = require("express")
const cors = require("cors")

const {PORT} = process.env
const {login, register} = require("./controllers/auth")
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require("./controllers/posts")
const {isAuthenticated} = require("./middleware/isAuthenticated")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/register", register)
app.post("/login", login)
app.post("/posts", isAuthenticated, addPost)

app.get("/posts", getAllPosts)
app.get("/userposts/:userId", getCurrentUserPosts)

app.put("/posts/:id", isAuthenticated, editPost)

app.delete("posts/:id", isAuthenticated, deletePost)






app.listen(PORT, () => console.log(`server running on PORT 5000 ${PORT}`))