import React, { useState, useMemo } from 'react';
import { Select } from "antd";
import { ICustomSelect } from './ICustomSelect';
import { DefaultOptionType } from 'antd/lib/select';


const CustomSelect: React.FC<ICustomSelect> = ({ id, dataTestId, items, onChange, defaultValue, getItemsNextToken, placeholder, disabled }) => {
    const [loading, setLoading] = useState(false);

    const options = items !== undefined ? items.map(_ => { return <Select.Option key={_.id}>{_.name}</Select.Option> }) : [];

    const onScroll: React.UIEventHandler<HTMLDivElement> = async (event) => {
        const target = event.target as HTMLInputElement

        if (!target)
            return

        if (!loading && getItemsNextToken !== undefined && Math.round(target.scrollTop + target.offsetHeight) === target.scrollHeight) {
            setLoading(true);
            await getItemsNextToken();
            setLoading(false);
        }
    }

    const onSearch: ((value: string) => void) = async (e) => {
        var filteredItems = items.filter(_ => _.name.toLowerCase().indexOf(e.toLowerCase()) !== -1).length
        if (!loading && getItemsNextToken !== undefined && filteredItems < 4) {
            setLoading(true);
            await getItemsNextToken();
            setLoading(false);
        }
    }

    const _dvalue = useMemo(() => typeof defaultValue === "string" ? defaultValue : () => {
        if (typeof defaultValue === "object" && defaultValue !== null) {
            if (defaultValue.items !== undefined && defaultValue.items.length > 0) {
                const obj = defaultValue.items[0];
                const field = Object.keys(obj).find(_ => obj[_] !== null && obj[_].id !== undefined);
                return field !== undefined ? obj[field].id : null
            } else {
                return defaultValue.id;
            }

        } else {
            return null;
        }
    }, [defaultValue]);

    const filterSort: ((optionA: DefaultOptionType, optionB: DefaultOptionType) => number) = (optionA, optionB) => {

        if (!optionA || !optionB)
            return 0

        if (!optionA.value || !optionB.value)
            return 0

        return (optionA.children !== undefined && optionB.children !== undefined) ?
            optionA.value.toString().toLowerCase().localeCompare(optionB.value.toString().toLowerCase())
            : 0
    }

    return <Select
        id={id}
        data-testid={dataTestId}
        loading={loading}
        showSearch
        onSearch={onSearch}
        style={{ width: '100%' }}
        placeholder={placeholder}
        defaultValue={_dvalue !== undefined && _dvalue !== "" ? _dvalue : null}
        defaultActiveFirstOption={false}
        onChange={onChange}
        optionFilterProp="children"
        disabled={disabled}
        onPopupScroll={onScroll}
        filterOption={(input, option) => {
            if (!option)
                return false

            if (!option.value)
                return false

            return option.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
        filterSort={filterSort}
    >
        {!loading ? options : [...options, <Select.Option key="loading">Loading...</Select.Option>]}
    </Select>;
}

export default CustomSelect;