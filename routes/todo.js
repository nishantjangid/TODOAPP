const Task = require("../models/Todo");

const router = require("express").Router();

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a task by ID
router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
