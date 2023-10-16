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
  public profilePicture: File;
  public profilePictureUrl: string;
}

export default UserModel;