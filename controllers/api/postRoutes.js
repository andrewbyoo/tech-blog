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

router.put('/:id', async (req, res) => {
  try {
    await Post.update({ post_content: req.body.post_content }, { where: { id: req.params.id } });
    res.status(200).json(req.body)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;
