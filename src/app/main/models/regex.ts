export interface LogListenerRegexRequest {
    pattern?: string;
    explanation?: string;
}
export interface LogListenerRegexResponse {
    id?: number;
    pattern?: string;
    explanation?: string;
    creDate?: Date;
    creUser?: string;
}
