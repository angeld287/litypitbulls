import { Button } from 'antd';
import React, { FC } from 'react'
import { ICustomButton } from './ICustomButton';

const CustomButton: FC<ICustomButton> = ({ color, type, _key, onClick, className, children, loading, htmlType }) => {
    return <Button
        style={{ color: color }}
        type={type}
        loading={loading}
        key={_key}
        onClick={onClick}
        className={className}
        htmlType={htmlType}
    >
        {children}
    </Button>
}

export default React.memo(CustomButton)