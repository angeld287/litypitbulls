import { AppstoreOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { logoutAsync } from '../../features/userSession/asyncThunks';
import { menuright } from './styles';

const items: MenuProps['items'] = [
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
    }
];

const session: MenuProps['items'] = [
    {
        label: 'Logout',
        key: 'lgout',
        icon: <LogoutOutlined />
    }
];


const Header: React.FC = () => {
    const [current, setCurrent] = useState('mail');
    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(logoutAsync())
    }


    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Menu onClick={logOut} mode="horizontal" items={session} style={menuright} />
        </>
    );
};

export default React.memo(Header);