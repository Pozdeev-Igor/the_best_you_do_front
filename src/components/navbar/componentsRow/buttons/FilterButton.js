import React from 'react';
import {MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle} from "mdb-react-ui-kit";
import Icon from "@mdi/react";
import {mdiFilter} from "@mdi/js";

const FilterButton = () => {
    return (
        <MDBCol className='mt-5' lg='1' md='1' sm='6'>
            <MDBDropdown group className='shadow-0 mb-6  d-flex justify-content-center'
                         style={{marginTop: '-8px'}}>
                <MDBDropdownToggle color='white' className='d-flex align-items-start'>
                    <Icon path={mdiFilter} size={1} color='white' style={{opacity: '0.7'}}/>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem link>Action</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBCol>
    );
};

export default FilterButton;