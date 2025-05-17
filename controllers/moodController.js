const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all moods for logged-in user
const getMoods = async (req, res) => {
  try {
    const moods = await prisma.mood.findMany({ where: { userId: req.userId } });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: "Error fetching moods", error: err });
  }
};

// Get a single mood
const getMoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const mood = await prisma.mood.findFirst({
      where: { id: Number(id), userId: req.userId },
    });

    if (!mood) return res.status(404).json({ message: "Mood not found" });

    res.json(mood);
  } catch (err) {
    res.status(500).json({ message: "Error fetching mood", error: err });
  }
};

// Create mood
const createMood = async (req, res) => {
  const { emoji, moodTitle, moodDescription } = req.body;

  try {
    const newMood = await prisma.mood.create({
      data: {
        emoji,
        moodTitle,
        moodDescription,
        userId: req.userId,
      },
    });

    res.status(201).json({ message: "Mood created", data: newMood });
  } catch (err) {
    res.status(500).json({ message: "Error creating mood", error: err });
  }
};

// Update mood
const updateMood = async (req, res) => {
  const { id } = req.params;
  const { emoji, moodTitle, moodDescription } = req.body;

  try {
    const mood = await prisma.mood.findFirst({
      where: { id: Number(id), userId: req.userId },
    });

    if (!mood) return res.status(404).json({ message: "Mood not found" });

    const updated = await prisma.mood.update({
      where: { id: Number(id) },
      data: { emoji, moodTitle, moodDescription },
    });

    res.json({ message: "Mood updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating mood", error: err });
  }
};

// Delete mood
const deleteMood = async (req, res) => {
  const { id } = req.params;

  try {
    const mood = await prisma.mood.findFirst({
      where: { id: Number(id), userId: req.userId },
    });

    if (!mood) return res.status(404).json({ message: "Mood not found" });

    await prisma.mood.delete({ where: { id: Number(id) } });

    res.json({ message: "Mood deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting mood", error: err });
  }
};

module.exports = {
  getMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood,
};
