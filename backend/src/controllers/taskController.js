import Task from "../models/Task.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      emoji: req.body.emoji,
      userId: req.userId,
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// READ
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// UPDATE
export const updateTask = async (req, res) => {
  try {
    const updates = {};

    if (typeof req.body.completed === "boolean") {
      updates.completed = req.body.completed;
    }

    if (req.body.emoji) {
      updates.emoji = req.body.emoji;
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(task);
  } catch {
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
