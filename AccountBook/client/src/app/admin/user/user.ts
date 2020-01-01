export class User {
    id: number;
    userName: string;
    name: string;
    password: string;
    emailId: string;
    salt: string;
    createdBy: string;
    updatedBy: string;
    access_token: string;
    isLocked: boolean;
    lastLoginTime: Date;
    selectedRoles: number[];
    roles: string;
    latestLoginTime: Date;
    branchId: number;
    roleId: any;
}