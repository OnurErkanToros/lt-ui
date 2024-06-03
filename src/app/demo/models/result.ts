export interface Result{
    success?:boolean;
    message?:string;
}
export interface DataResult<T> extends Result{
    data?:T;
}
