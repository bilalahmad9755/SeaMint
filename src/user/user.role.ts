import { RolesBuilder } from "nest-access-control";

export enum UserRoles
{
    Admin = "Admin", 
    User = "User"
}

export const roles :  RolesBuilder = new RolesBuilder(); 