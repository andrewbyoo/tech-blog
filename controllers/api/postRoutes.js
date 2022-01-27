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

module.exports = router;
