const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({ include: [{ model: User }], where: User.id = req.session.userId });
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, { include: [{ model: User, attributes: { exclude: ['password'] } }], where: User.id = req.session.userId });
    const post = dbPostData.get({ plain: true });
    console.log(post)
    res.render('user-post', { ...post, loggedIn: req.session.loggedIn })
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

module.exports = router;
