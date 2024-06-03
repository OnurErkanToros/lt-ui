export interface ServerRequest{
    name?:string;
    url?:string;
    username?:string;
    password?:string;
    port?:number;
    remoteFilePath:string;
    fileName?:string;
}
export interface ServerResponse{
    name?:string;
    url?:string;
    username?:string;
    password?:string;
    port?:number;
    remoteFilePath:string;
    fileName?:string;
    creDate?:Date;
    creUser?:string;
}
