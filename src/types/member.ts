import Permission from "./permissions";

export default interface Member {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    role_id: string;
    bio: string;
    permission: Permission[];
}