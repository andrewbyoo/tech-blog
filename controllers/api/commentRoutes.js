const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({ include: [{ model: Post }] });
    const comments = dbCommentData.map(comment => comment.get({ plain: true }));
    console.log(comments)
    res.status(200).json(comments)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});



module.exports = router;
