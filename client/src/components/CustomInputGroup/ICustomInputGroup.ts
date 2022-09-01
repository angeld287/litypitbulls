import { InputProps } from "antd";

export interface ICustomInputGroup extends InputProps {
    name: string;
    label: string;
    defaultValue: string;
    disabled: boolean;
}