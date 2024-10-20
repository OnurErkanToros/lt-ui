export interface BannedIpResponse{
    id?:number;
    ip?:string;
    ipType?:string;
    transferred?:boolean;
    transferredAt?:Date;
    transferredBy?:string;
    createdAt?:Date;
    createdBy?:string;
}

export interface BanIpRequest{
    ip?:string
}