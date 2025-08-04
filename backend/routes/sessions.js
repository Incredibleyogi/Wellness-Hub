const router = require('express').Router();
const Session = require('../models/Session');
const { authMiddleware } = require('../middleware/auth');

// 🟢 Public route: fetch all published sessions (for general explore page, if needed)
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sessions' });
  }
});

// 🛡️ Secure all routes below
router.use(authMiddleware);

// 🔐 Get all sessions (published + drafts) of logged-in user
router.get('/my', async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user sessions' });
  }
});

// 🔐 ✅ Get only *published* sessions of the logged-in user (used in dashboard)
router.get('/my/published', async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.userId, status: 'published' });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching published user sessions' });
  }
});

// 🔐 Get a single session by ID (only if owned by user)
router.get('/my/:id', async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.userId });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching session' });
  }
});

// 🔐 Save or update a draft session
router.post('/save-draft', async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  try {
    let session;

    if (id) {
      const existing = await Session.findOne({ _id: id, user_id: req.userId });
      if (!existing) return res.status(404).json({ message: 'Session not found' });
      if (existing.status === 'published') return res.status(400).json({ message: 'Cannot update published session' });

      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.userId },
        { title, tags, json_file_url, updated_at: new Date() },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.userId,
        title,
        tags,
        json_file_url,
        status: 'draft',
      });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error saving draft' });
  }
});

// 🔐 Publish a session
router.post('/publish', async (req, res) => {
  const { id } = req.body;

  try {
    const session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.userId },
      { status: 'published', updated_at: new Date() },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found or unauthorized' });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error publishing session' });
  }
});

module.exports = router;
