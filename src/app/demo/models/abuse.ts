export interface AbuseCheckRequest{
    maxAgeInDays?:number;
    ipAddress?:string;
}
export interface AbuseCheckResponse{
    ipAddress?: string;
    ipVersion?: number;
    isPublic?: boolean;
    isWhitelisted?: boolean;
    abuseConfidenceScore?: number;
    countryCode?: string;
    countryName?: string;
    usageType?: string;
    isp?: string;
    domain?: string;
    isTor?: string;
    totalReports?: number;
    numDistinctUsers?: number;
    lastReportedAt?: Date;
}
export interface AbuseBlackListResponse {
    id?: number;
    ipAddress?: string;
    lastReportedAt?: Date;
    countryCode?: string;
}
export interface AbuseDbKeyRequest{
    abuseKey?:string;
}
export interface AbuseDbKeyResponse{
    abuseKey?:string;
    createdAt?:Date;
    isActive?:boolean;
}
