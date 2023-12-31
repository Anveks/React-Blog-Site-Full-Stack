import express, { Request, Response, NextFunction } from "express";
import { CredentialsModel } from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import authService from "../5-services/auth-service";
import cyber from "../4-utils/cyber";

const router = express.Router();

// login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {      
      const credentials = new CredentialsModel(request.body);
      const token = await authService.login(credentials);
      const user = cyber.decodeToken(token);
      response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

// register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const profilePictureFile = request.files?.profilePicture;    

    const userData = {
      ...request.body,
      profilePicture: profilePictureFile,
    };  
    const user = new UserModel(userData);
    const token = await authService.register(user);
    response.status(201).json(token);
  }
  catch(err: any) {
      next(err);
  }
});

export default router;