import Joi from "joi";
import RoleModel from "./role-model";

export class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public email: string;
  public roleId: RoleModel
  public registrationDate: string;
  public isBanned: boolean;
  public isOnline: boolean;
  public profileImage: string;
  public profileImageUrl: string;

  public constructor(user: UserModel){
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.roleId = user.roleId;
    this.registrationDate = user.registrationDate;
    this.isBanned = user.isBanned;
    this.isOnline = user.isOnline;
    this.profileImage = user.profileImage;
    this.profileImageUrl = user.profileImageUrl;
  }

  // post validation
  public static postValidation = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(60),
    lastName: Joi.string().required().min(2).max(60),
    username: Joi.string().required(),
    password: Joi.string().required().min(4).max(1024),
    email: Joi.string().email().required().min(7).max(100),
    roleId: Joi.number().optional(),
    registrationDate: Joi.string().allow(""),
    isBanned: Joi.number(),
    isOnline: Joi.number(),
    profileImage: Joi.string(),
    profileImageUrl: Joi.string()
    
});

  public postValidation(): string {
    const result = UserModel.postValidation.validate(this);
    return result.error?.message;
  }
}

export default UserModel;