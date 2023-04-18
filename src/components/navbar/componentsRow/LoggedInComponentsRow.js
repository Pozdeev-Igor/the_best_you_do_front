import React from 'react';
import HomeButton from "./buttons/HomeButton";
import CreateNewButton from "./buttons/CreateNewButton";
import OurTeamButton from "./buttons/OurTeamButton";
import FilterButton from "./buttons/FilterButton";
import SearchForm from "./forms/SearchForm";
import NotificationDropDown from "./buttons/NotificationDropDown";
import UsernameButton from "./buttons/UsernameButton";
import {MDBRow} from "mdb-react-ui-kit";

const LoggedInComponentsRow = ({user}) => {
    return (
        <MDBRow className='d-flex justify-content-evenly'>
            <HomeButton/>
            <CreateNewButton/>
            <OurTeamButton/>
            <FilterButton/>
            <SearchForm/>
            <NotificationDropDown/>
            <UsernameButton user = {user}/>
        </MDBRow>
    );
};

export default LoggedInComponentsRow;