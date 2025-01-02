export interface SuspectIpResponse{
    ip?:string;
    host?:string;
    line?:string;
    accessForbiddenNumber?:number;
    pattern?:string;
    createdAt?:Date;
    status?:string;
    statusAt?:Date;
    statusBy?:string;
}
