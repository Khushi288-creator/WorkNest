const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const { name, description, workspaceId, priority, deadline } = req.body;
    const userId = req.user.id;

    const newProject = await Project.create({
      name,
      description,
      workspace: workspaceId,
      priority,
      deadline,
      createdBy: userId,
      members: [userId]
    });

    res.status(201).json({
      message: "Project created successfully",
      project: newProject
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getProjectsByWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const projects = await Project.find({ workspace: workspaceId });

    res.status(200).json({ projects });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { createProject, getProjectsByWorkspace  };