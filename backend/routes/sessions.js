const router = require('express').Router();
const Session = require('../models/Session');
const { authMiddleware } = require('../middleware/auth');

// 🟢 Public route: fetch only published sessions for the dashboard
router.get('/', async (req, res) => {
  const sessions = await Session.find({ status: 'published' });
  res.json(sessions);
});

// 🛡️ Apply auth middleware to all routes below
router.use(authMiddleware);

// 🔐 Fetch all sessions created by the authenticated user
router.get('/my', async (req, res) => {
  const sessions = await Session.find({ user_id: req.userId });
  res.json(sessions);
});

// 🔐 Fetch a single session by ID (must belong to user)
router.get('/my/:id', async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.userId });
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }
  res.json(session);
});

// 🔐 Save a draft or update an existing one — but do NOT overwrite published
router.post('/save-draft', async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  let session;

  if (id) {
    const existing = await Session.findOne({ _id: id, user_id: req.userId });

    if (!existing) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // ❌ Prevent overwriting published sessions
    if (existing.status === 'published') {
      return res.status(400).json({ message: 'Cannot update a published session' });
    }

    session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.userId },
      {
        title,
        tags,
        json_file_url,
        updated_at: new Date(),
      },
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
});

// 🔐 Publish a session (change status to 'published')
router.post('/publish', async (req, res) => {
  const { id } = req.body;
  console.log("Trying to publish session:", id, "by user:", req.userId);

  const session = await Session.findOneAndUpdate(
    { _id: id, user_id: req.userId },
    {
      status: 'published',
      updated_at: new Date(),
    },
    { new: true }
  );

  if (!session) {
    return res.status(404).json({ message: 'Session not found or unauthorized' });
  }

  console.log("Published session:", session._id);
  res.json(session);
});

module.exports = router;
