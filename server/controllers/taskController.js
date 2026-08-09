const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignee, priority, dueDate } = req.body;
        const userId = req.user.id;

         const newTask = await Task.create({
            title,
            description,
            project: projectId,
            assignee,
            priority,
            dueDate,
            createdBy: userId
        });

        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId });

        res.status(200).json({ tasks });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });

    }
}

module.exports = { createTask, getTasksByProject }