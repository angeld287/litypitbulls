import { ButtonProps } from 'antd';
import { MouseEventHandler, ReactNode } from 'react'

export interface ICustomButton extends ButtonProps {
    color: string;
    _key: string;
    customStyle?: any;
}