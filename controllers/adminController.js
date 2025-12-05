const Admin = require("../model/adminModel");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        status: "error",
        message: "Invalid username"
      });
    }

    // Plain password comparison
    if (password !== admin.password) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password"
      });
    }

    // Success response
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      userId: admin._id,
      username: admin.username,
      theme: admin.theme
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};



exports.updateTheme = async (req, res) => {
  try {
    const { userId, theme } = req.body;

    await Admin.findByIdAndUpdate(userId, { theme });

    return res.status(200).json({
      status: "success",
      message: "Theme updated successfully"
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};


exports.getTheme = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find admin by ID
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        status: "error",
        message: "Admin not found"
      });
    }

    // Send theme in response
    return res.status(200).json({
      status: "success",
      theme: admin.theme
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const { userId, language } = req.body;

    if (!language || !["en", "ta"].includes(language)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid language"
      });
    }

    await Admin.findByIdAndUpdate(userId, { language });

    return res.status(200).json({
      status: "success",
      message: "Language updated successfully"
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.getLanguage = async (req, res) => {
  try {
    const { userId } = req.params;

    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        status: "error",
        message: "Admin not found"
      });
    }

    return res.status(200).json({
      status: "success",
      language: admin.language
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

