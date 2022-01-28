const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({ include: [{ model: User, attributes: { exclude: 'password' }  }] });
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    res.render('general-post', { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

module.exports = router;
