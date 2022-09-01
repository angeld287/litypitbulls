
import React, { memo } from 'react';

import { Form } from 'antd';
import { ICustomSelectForm } from './ICustomSelectForm';
import CustomSelect from '../CustomSelect';

const CustomSelectForm: React.FC<ICustomSelectForm> = ({ name, label, defaultValue, disabled, items, placeholder, getItemsNextToken }) => {
    return <Form.Item name={name} label={label} initialValue={defaultValue} >
        <CustomSelect id={'select_id_' + name}
            name={name}
            dataTestId={'select_id_' + name}
            key={'select_id_' + name}
            style={{ marginBottom: 10 }}
            items={items}
            placeholder={placeholder}
            getItemsNextToken={getItemsNextToken}
            disabled={disabled} />
    </Form.Item>;
}

export default memo(CustomSelectForm);