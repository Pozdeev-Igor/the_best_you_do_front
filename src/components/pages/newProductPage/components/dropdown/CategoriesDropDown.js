import React, {useEffect, useState} from 'react';
import ajax from "../../../../utils/FetchService";
import {Dropdown} from "semantic-ui-react";

const CategoriesDropDown = () => {

const [options, setOptions] = useState([]);

    useEffect(() => {
        ajax('/api/auth/categories', "GET").then(response => {
           setOptions(response.map(res => ({
                key: res.id,
                value: res.id,
                text: res.name
            })));
        })
    }, [])

    return (
        <Dropdown
            placeholder='Выберите категорию'
            fluid
            search
            selection
            options={options}
        />
    );
};

export default CategoriesDropDown;