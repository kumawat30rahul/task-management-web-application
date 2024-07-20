const express = require("express");
const UserRouteHandler = require("../handlers/userRouteHandler");

const userRouter = express.Router();

//register user
userRouter.post("/register", UserRouteHandler.createUser);

//login user
userRouter.post("/login", UserRouteHandler.loginUser);

module.exports = userRouter;
