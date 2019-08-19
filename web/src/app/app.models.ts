export interface User{
    userId: string;
    userName: string;
    created?: Date;
    friendId?: string;
}

export interface Exception{
    userId: string;
    userName: string;
    friendId: string;
    friendName: string;
}