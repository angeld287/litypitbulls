import { SelectProps } from "antd";

export interface ICustomSelect extends SelectProps {
    dataTestId?: string;
    items: Array<ISelectOptions>;
    getItemsNextToken: Function;
    name: string;
}

export interface ISelectOptions {
    id: string;
    name: string;
}