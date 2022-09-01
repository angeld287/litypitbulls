export interface IError {
    error?: undefined | IValidationError | Array<IValidationError>;
}

export interface IValidationError {
    value?: string;
    message: string;
    param?: string;
    location?: string;
    error?: boolean
}

export interface IBase extends IError {
    message?: string;
}