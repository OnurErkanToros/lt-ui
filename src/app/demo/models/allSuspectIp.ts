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
