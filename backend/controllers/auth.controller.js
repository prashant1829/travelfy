const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;
const { createJWT, clearRes } = require('../utils/jwt');

// Signup Process
const signupProcess = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json({ errorMessage: "Email is required" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      errorMessage: "Password must be at least 6 characters long",
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ errorMessage: 'Username needs to be unique. The username you chose is already in use.' });
      } else {
        return res.status(400).json({ errorMessage: 'Email is already registered.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    const [header, payload, signature] = createJWT(newUser);

    res.cookie('headload', `${header}.${payload}`, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.cookie('signature', signature, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const clearUser = clearRes(newUser.toObject());
    res.status(201).json({ user: clearUser });
  } catch (error) {
    console.error("Signup Process Error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      const key = Object.keys(error.keyPattern)[0];
      if (key === 'username') {
        return res.status(400).json({
          errorMessage: 'Username needs to be unique. The username you chose is already in use.',
        });
      } else if (key === 'email') {
        return res.status(400).json({
          errorMessage: 'Email is already registered.',
        });
      }
    }
    return res.status(500).json({ errorMessage: 'Internal server error' });
  }
};


// Login Process
const loginProcess = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errorMessage: "Your credentials are wrong" });
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (match) {
      const [header, payload, signature] = createJWT(user);

      res.cookie("headload", `${header}.${payload}`, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.cookie("signature", signature, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      const newUser = clearRes(user.toObject());
      res.status(200).json({ user: newUser });
    } else {
      res.status(400).json({ errorMessage: "Your credentials are wrong" });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: "Username needs to be unique. The username you chose is already in use.",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Change password process
const changePasswordProcess = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword.length < 6) {
    return res.status(400).json({
      errorMessage: "Password must be at least 6 characters long",
    });
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "Your passwords don't match" });
  }

  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const match = await bcrypt.compareSync(oldPassword, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ errorMessage: "Your credentials are wrong" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.findByIdAndUpdate(_id, { password: hashedPassword });

    // Update JWT cookie
    const [header, payload, signature] = createJWT(user);

    res.cookie("headload", `${header}.${payload}`, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.cookie("signature", signature, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    const newUser = clearRes(user.toObject());
    res.status(200).json({ user: newUser });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: "Username needs to be unique. The username you chose is already in use.",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Update User Process
const updateUserProcess = async (req, res) => {
  const { email, username, ...rest } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ errorMessage: "User not found" });
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ errorMessage: "The username is already in use" });
      }
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ errorMessage: "Your email is already in use" });
      }
    }

    user = await User.findByIdAndUpdate(
      userId,
      { email, username, ...rest },
      { new: true }
    );

    const updatedUser = clearRes(user.toObject());
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update User Process Error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      const key = Object.keys(error.keyPattern)[0];
      if (key === 'username') {
        return res.status(400).json({
          errorMessage: 'The username is already in use.',
        });
      } else if (key === 'email') {
        return res.status(400).json({
          errorMessage: 'Your email is already in use.',
        });
      }
    }
    return res.status(500).json({ errorMessage: 'Internal server error' });
  }
};

// Logout Process
const logoutProcess = async (req, res) => {
  try {
    res.clearCookie("headload", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.clearCookie("signature", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ message: "You have been logged out" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Get User Logged
const getUserLogged = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const newUser = clearRes(user.toObject());
    res.status(200).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Export all controllers
module.exports = {
  signupProcess,
  loginProcess,
  logoutProcess,
  changePasswordProcess,
  updateUserProcess,
  getUserLogged
};

