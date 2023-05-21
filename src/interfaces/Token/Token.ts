import { User } from "../../features/user/userInterfaces";

export interface AuthObject {
    token: string;
    user:User;
}