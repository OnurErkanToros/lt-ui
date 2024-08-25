export interface ServerRequest{
    name?:string;
    url?:string;
    username?:string;
    password?:string;
    port?:number;
    remoteFilePath?:string;
    fileName?:string;
}
export interface ServerResponse{
    id:number;
    name?:string;
    url?:string;
    username?:string;
    password?:string;
    port?:number;
    remoteFilePath:string;
    fileName?:string;
    createdAt?:Date;
    createdBy?:string;
    active?:string;
}
