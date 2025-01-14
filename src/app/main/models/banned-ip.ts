export interface BannedIpResponse {
    id?: number;
    ip?: string;
    ipType?: string;
    createdAt?: Date;
    createdBy?: string;
}

export interface BanIpRequest {
    ip?: string;
    ipType?: string;
}
