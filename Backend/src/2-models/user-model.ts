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

  public constructor(user: UserModel){
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.email = user.email;
    this.roleId = user.roleId;
  }

  // post validation
  public static postValidation = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(60),
    lastName: Joi.string().required().min(2).max(60),
    password: Joi.string().required().min(4).max(1024),
    email: Joi.string().email().required().min(7).max(100),
    roleId: Joi.number().optional()
});

  public postValidation(): string {
    const result = UserModel.postValidation.validate(this);
    return result.error?.message;
  }
}

export default UserModel;