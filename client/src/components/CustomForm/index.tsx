import { Alert, Form, message } from 'antd';
import React, { useCallback, useMemo } from 'react';
import CustomButton from '../CustomButton';
import CustomInputGroup from '../CustomInputGroup';
import CustomSelectForm from '../CustomSelectForm';
import { ICustomForm } from './ICustomForm';

const CustomForm: React.FC<ICustomForm> = ({ onSubmit, fields, buttons, error }) => {

    const _buttons = useMemo(() => buttons.map(b => (
        <CustomButton customStyle={{ marginRight: 5 }} htmlType={b.htmlType} key={'btn_' + b.name} loading={b.loading} {...b} />
    )), [buttons])

    const submitForm = useCallback((e: any) => {
        return onSubmit(e, message)
    }, [onSubmit]);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={submitForm}
            autoComplete="off"
        >
            {fields.map(
                _ => {
                    return <div key={'form_' + _.name} >
                        {_.input &&
                            <CustomInputGroup type={_.input.type} disabled={_.input.disabled} defaultValue={_.input.defaultValue} name={_.input.name} label={_.input.label} />
                        }
                        {_.select &&
                            <CustomSelectForm id={'select_id_' + _.name}
                                label={_.select.label}
                                defaultValue={_.select.defaultValue}
                                name={_.select.name}
                                dataTestId={'select_id_' + _.name}
                                key={'select_id_' + _.name}
                                style={{ marginBottom: 10 }}
                                items={_.select.items}
                                placeholder={_.select.placeholder}
                                getItemsNextToken={_.select.getItemsNextToken}
                                disabled={_.select.disabled} />
                        }
                    </div>
                }
            )}
            <div style={{ textAlign: 'right' }}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    {_buttons}
                </Form.Item>
            </div>
            {
                error && error.error &&
                (
                    <div style={{ textAlign: 'right' }}>
                        <Alert message={error.message} type="error" />
                    </div>
                )
            }

        </Form>
    );
};

export default React.memo(CustomForm);