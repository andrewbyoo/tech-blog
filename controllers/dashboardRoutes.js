const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({ where: { user_id: req.session.userId } });
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, { include: { model: Comment, include: { model: User, attributes: { exclude: 'password' } } } });
    const post = dbPostData.get({ plain: true });
    res.render('user-post', { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

router.get('/post/:id/edit', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, { where: { user_id: req.session.userId } });
    const post = dbPostData.get({ plain: true });
    res.render('edit-post', { ...post, loggedIn: req.session.loggedIn })
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

module.exports = router;
