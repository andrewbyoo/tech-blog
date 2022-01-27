const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({ include: [{ model: User, attributes: { exclude: 'password' } }] });
    const posts = dbPostData.map(post => post.get({ plain: true }));
    console.log(posts)
    res.status(200).json(posts)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.userId
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, { include: [{ model: User, attributes: { exclude: 'password' } }] });
    const post = dbPostData.get({ plain: true });
    res.status(200).json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.update({ post_content: req.body.post_content }, { where: { id: req.params.id } });
    res.status(200).json(editPost)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    (!deletePost)
      ? res.status(404).json({ message: 'No post found with this id!' })
      : res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
