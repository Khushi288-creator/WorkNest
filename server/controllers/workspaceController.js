const Workspace = require('../models/Workspace');

const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;
    const ownerId = req.user.id;
    const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newWorkspace = await Workspace.create({
        name,
        owner: ownerId,
        members: [{ user: ownerId, role: "owner"}],
        inviteCode
    });
  
    res.status(201).json({
      message: "Workspace created successfully",
      workspace: newWorkspace
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getMyWorkspaces = async (req, res) => {
  try {
    const userId = req.user.id;

    const workspaces = await Workspace.find({ "members.user": userId });

    res.status(200).json({ workspaces });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { createWorkspace, getMyWorkspaces };