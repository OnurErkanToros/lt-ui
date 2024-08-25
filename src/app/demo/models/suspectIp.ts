export interface AllSuspectIpResponse{
    id?:number;
    ipAddress?:string;
    comeBy?:string;
    comeAt?:Date;
    banned?:boolean;
}
export interface AllSuspectIpRequest{
    ipAddress?:string;
}
export interface SuspectIpResponse{
    ip?:string;
    host?:string;
    line?:string;
    accessForbiddenNumber?:number;
    isBanned?:boolean;
    pattern?:string;
    createdAt?:Date;
    banDate?:Date;
    banBy?:string;
}
