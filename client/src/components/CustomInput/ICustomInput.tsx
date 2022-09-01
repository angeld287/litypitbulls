import { ChangeEventHandler } from "react";

export interface ICustomInput {
    dataTestId: string,
    onChange: ChangeEventHandler,
    value: string,
    label: string,
    readOnly: boolean,
    type: string
}