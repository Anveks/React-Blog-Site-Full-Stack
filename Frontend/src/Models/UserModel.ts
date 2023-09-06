import RoleModel from "./RoleModel";

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
}

export default UserModel;