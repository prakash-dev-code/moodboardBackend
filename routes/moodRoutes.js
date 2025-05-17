const express = require("express");
const router = express.Router();

const {
  getMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood,
} = require("../controllers/moodController");


const { authenticateToken } = require("../middleware/authMiddleware");
console.log("authenticateToken is", authenticateToken);

// Protect all routes
router.use(authenticateToken);

// Routes
router.get("/", getMoods);
router.get("/:id", getMoodById);
router.post("/", createMood);
router.put("/:id", updateMood);
router.delete("/:id", deleteMood);

module.exports = router;
