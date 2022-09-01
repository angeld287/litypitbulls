import { Content } from 'antd/lib/layout/layout';
import { MessageApi } from 'antd/lib/message';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICustomButton } from '../../components/CustomButton/ICustomButton';
import CustomForm from '../../components/CustomForm';
import { ICustomFields } from '../../components/CustomForm/ICustomForm';
import { setIsRegistering } from '../../features/userRegister/userRegisterSlice';
import { loginAsync } from '../../features/userSession/asyncThunks';
import { ICredentials } from '../../features/userSession/IUserSession';
import { selectUserSession } from '../../features/userSession/userSessionSlice';
import { IValidationError } from '../../interfaces/models/IBase';
import styles from './styles';

const Login: React.FC = () => {

    const session = useAppSelector(selectUserSession);
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState<MessageApi>()
    const [error, setError] = useState<IValidationError>()

    useEffect(() => {
        const login = () => {

            setError({
                message: '',
                error: false
            });

            if (!message)
                return

            let sessionError = session.error;
            if (sessionError) {
                if (!Array.isArray(sessionError)) {
                    setError({
                        message: sessionError.message,
                        error: true
                    })
                    return message.error(sessionError.message)
                }
                if (Array.isArray(sessionError)) {
                    setError({
                        message: sessionError[0].message,
                        error: true
                    })
                    return sessionError.forEach(e => {
                        message.error(e.message)
                    });
                }
            }

            message.success('Login Successfully!')
        }

        if (session.loginStatus === 'idle' && message) {
            login()
        } else if (session.loginStatus === 'failed') {
            setError({
                message: 'Internal Error',
                error: true
            })
        }

    }, [session.loginStatus, session.error, message]);

    const handleClicLoginButton = useCallback(
        (credentials: ICredentials, message: MessageApi) => {
            setMessage(message);
            dispatch(loginAsync(credentials))
        }
        , [dispatch]
    );

    const goToRegisterScreen = useCallback(
        () => {
            dispatch(setIsRegistering(true));
        },
        [dispatch]
    )

    let inputFields: Array<ICustomFields> = [
        {
            name: 'username',
            input: {
                name: 'username',
                label: 'Username',
                defaultValue: '',
                disabled: false,
                type: 'input',
            }
        },
        {
            name: 'password',
            input: {
                name: 'password',
                label: 'Password',
                defaultValue: '',
                disabled: false,
                type: 'password',
            }
        },
    ]

    let btns: Array<ICustomButton> = [
        {
            color: 'blue',
            _key: 'register_btn',
            children: 'Sign Up',
            htmlType: 'button',
            name: "register",
            onClick: goToRegisterScreen
        },
        {
            color: 'blue',
            _key: 'login_btn',
            children: 'Login',
            loading: session.loginStatus === 'pending',
            htmlType: 'submit',
            name: "login",
        },
    ]

    return (
        <>
            <Content style={styles.container}>
                <CustomForm error={error} onSubmit={handleClicLoginButton} fields={inputFields} buttons={btns} verticalButtons={false} loading={session.loginStatus === 'pending'} />
            </Content>
        </>
    );
};

export default Login;