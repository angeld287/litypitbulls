import React, { memo } from 'react';

import { Input, Form } from 'antd';
import { ICustomInputGroup } from './ICustomInputGroup';

const CustomInputGroup: React.FC<ICustomInputGroup> = ({ name, label, defaultValue, disabled, type }) => {
    return <Form.Item name={name} label={label} initialValue={defaultValue} ><Input type={type} placeholder={"Type your " + label} disabled={disabled} /></Form.Item>;
}

export default memo(CustomInputGroup);