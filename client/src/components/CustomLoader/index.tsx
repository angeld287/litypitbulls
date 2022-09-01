import { Spin } from 'antd';
import React from 'react';
import './styles.css';

const CustomLoader: React.FC = () => (
    <div className="loader">
        <Spin size="large" />
    </div>
);

export default CustomLoader;
