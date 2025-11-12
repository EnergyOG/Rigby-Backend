class PostController {
  async newPost(req, res) {
    try {
      const { img, title, name, author } = req.body;
      await postModel.create({img, title, name, author});
    } catch (err) {
      res.status(400).send({
        message: "New Post was not created!",
        error: err.message,
      });
    }
  }
}
const postController = new PostController();
export default postController;
