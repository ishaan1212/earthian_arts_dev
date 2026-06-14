import { validationResult } from "express-validator";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createToken } from "../utils/createToken.js";

function sendAuth(res, user, statusCode = 200) {
  const token = createToken(user);

  res.status(statusCode).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    throw new Error(errors.array()[0].msg);
  }

  const exists = await User.findOne({ email: req.body.email });
  if (exists) {
    res.status(409);
    throw new Error("Email is already registered");
  }

  const user = await User.create(req.body);
  sendAuth(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  sendAuth(res, user);
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
