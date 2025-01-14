export interface ServerRequest {
    id?: number;
    name?: string;
    host?: string;
    username?: string;
    password?: string;
    port?: number;
    remoteFilePath?: string;
    fileName?: string;
    isActive?:boolean;
    isSFTP?:boolean;
}
export interface ServerResponse {
    id: number;
    name?: string;
    host?: string;
    username?: string;
    password?: string;
    port?: number;
    remoteFilePath: string;
    fileName?: string;
    createdAt?: Date;
    createdBy?: string;
    isActive?: boolean;
    isSFTP?:boolean;
}
