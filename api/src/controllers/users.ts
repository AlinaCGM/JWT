import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import UserServices from "../services/user";
import User from "../models/User";

export const getUserByIdController = async (
  request: Request,
  response: Response
) => {
  {
    try {
      const userId = await UserServices.getUserById(request.params.userId);
      if (!userId) {
        response.json({ message: `No user with id ${request.params.userId}` });
        return;
      }
      response.json(userId?.email);
    } catch (error) {
      console.log(error);
    }
  }
};
export const createUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const newProduct = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      age: request.body.age,
      email: request.body.email,
      password: request.body.password,
    });
    const product = await UserServices.createUser(newProduct);
    response.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const newInformation = request.body;
    const userId = request.params.userId;
    const newUser = await UserServices.updateUserById(userId, newInformation);
    response.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const logInWithPasswordController = async (
  request: Request,
  response: Response
) => {
  try {
    const userData = await UserServices.findUserByEmail(request.body.email);
    if (!userData) {
      response.json({ message: `cant find user ${request.body.email}` });
      return;
    }
    const token = jwt.sign(
      {
        email: request.body.email,
        _id: userData._id,
        firstName: userData.firstName,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    response.json({ userData, token });
  } catch (error) {
    console.log(error);
  }
};
