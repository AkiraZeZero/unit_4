require('dotenv').config()

const express = require("express")
const cors = require("cors")

const {sequelize} = require("./util/database")
const {User} = require("./models/user")
const {Post} = require("./models/posts")
const {PORT} = process.env
const {login, register} = require("./controllers/auth")
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require("./controllers/posts")
const {isAuthenticated} = require("./middleware/isAuthenticated")

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

//  endpoints below
app.post("/register", register)
app.post("/login", login)
app.post("/posts", isAuthenticated, addPost)

app.get("/posts", getAllPosts)
app.get("/userposts/:userId", getCurrentUserPosts)

app.put("/posts/:id", isAuthenticated, editPost)

app.delete("posts/:id", isAuthenticated, deletePost)

sequelize.sync({ force: true })
.then(() => {
    app.listen(PORT, () => console.log(`server running on PORT 4005`))
})
.catch(err => console.log(err))



