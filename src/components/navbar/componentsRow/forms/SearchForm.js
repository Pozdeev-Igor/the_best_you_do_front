import React from 'react';
import {MDBBtn, MDBCol} from "mdb-react-ui-kit";

const SearchForm = () => {
    return (
        <MDBCol className='mt-5' lg='4' md='3' sm='6' >
            <form className='d-flex input-group w-auto' style={{marginTop: '-8px'}}>
                <input
                    type='search'
                    className='form-control'
                    placeholder='Type query'
                    aria-label='Search'/>
                <MDBBtn color='primary'>Search</MDBBtn>
            </form>
        </MDBCol>
    );
};

export default SearchForm;