export interface LogListenerRegexRequest{
    pattern?:string;
    explanation?:string;
}
export interface LogListenerRegexResponse{
    pattern?:string;
    explanation?:string;
    creDate?:Date;
    creUser?:string;
}
