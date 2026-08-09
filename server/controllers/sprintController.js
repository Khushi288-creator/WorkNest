const Sprint = require('../models/Sprint');

const createSprint = async (req, res) => {
    try {
        const { name, goal, projectId, startDate, endDate } = req.body
        const userId = req.user.id;
        const newSprint = await Sprint.create({
           name,
           goal,
           project: projectId,
           startDate,
           endDate,
           createdBy: userId 
        });
        res.status(201).json({
            message: "Sprint created successfully",
            sprint: newSprint
        });

    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

const getSprintsByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const sprint = await Sprint.find({ project: projectId });
        res.status(200).json({ sprint });
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

module.exports = { createSprint, getSprintsByProject};