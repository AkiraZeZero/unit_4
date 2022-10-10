import {User} from "../models/user";
import {Post} from "../models/posts";

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: {privateStatus: false},
        include: [{
          model: User,
          required: true,
          attributes: [`username`]
        }]
      })
      res.status(200).send(posts)
    } catch (error) {
      console.log("ERROR with getting All Posts")
      console.log(error)
      res.sendStatus(400)
    }
  },
  getCurrentUserPosts: async (req, res) => {
    try {
      const {userId} = req.params
      const posts = await Post.findAll({
        where: {userId: userId},
        include: [{
          model: User,
          required: true,
          attributes: [`username`]
        }]
      })
      res.status(200).send(posts)

    } catch (error) {
      console.log("ERROR getting Current User Post")
      console.log(error)
      res.sendStatus(400)
    }
  },
  addPost: async (req, res) => {
    try {
      const {title, content, status, userId} = req.body
      await Post.create({title, content, privateStatus: status, userId})
      res.sendStatus(200)

    } catch (error) {
      console.log("ERROR with post")
      console.log(error)
      res.sendStatus(400)
    }
  },
  editPost: async (req, res) => {
    try {
      const {status} = req.body
      const {id} = req.params
      await Post.update({privateStatus: status}, {
        where: {id: +id}
      })
      res.sendStatus(200)
    } catch (error) {
      console.log("ERROR editing post")
      console.log(error)
      res.sendStatus(400)
    }
  },
  deletePost: async (req, res) => {
    try {
      const {id} = req.params
      await Post.destroy({where: {id: +id}})
      res.sendStatus(200)
    } catch (error) {
      console.log("ERROR deleting post")
      console.log(error)
      res.sendStatus(400)
    }
    console.log("delete post");
  },
};
