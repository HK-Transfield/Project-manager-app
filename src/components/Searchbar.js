import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect, useDispatch } from 'react-redux';
import '../css/Searchbar.css';

/**
 * This component will allow the user to either search through
 * their projects or sort their projects in either ascending
 * or descending order. It uses react-bootstrap for its 
 * design.
 * 
 * @param {object} props.filterOption1 
 * @param {object} props.filterOption2 
 * 
 * @returns The DOM of the search bar and dropdown menu.
 * 
 * @author Harmon Transfield
 */
const Searchbar = ({filterOption1, filterOption2}) => {
    
    const dispatch = useDispatch();

    /**
     * It will filter the current list of projects every time the 
     * user enters a new character into the search control.
     * 
     * @param {event} event The user input.
     */
    const filterByIinput = (event) => {
        let input = event.target.value;

        dispatch({
            type: 'FILTER_BY_VALUE',
            payload: input
        });
    }

    /**
     * Sort all the user's projects in either ascending or descending order.
     * 
     * @param {event} event  The user clicks on one of the dropdown options.
     */
    const sortByInput = (event) => {
        // determine what the user wants to sort
        let sortOrder = event.endsWith('asc') ? 'asc' : 'desc';
        let sortField = event.startsWith(filterOption1.className) ? filterOption1.className : filterOption2.className;
        
        dispatch({
            type: 'SORT_PROJECTS',
            payload: {
                order: sortOrder,
                field: sortField
            }
        });
    }
    
    return(
        <InputGroup className='searchbar'>
            <InputGroup.Prepend>

                {/* controls to filter projects */}
                <DropdownButton
                    variant='secondary'
                    title='Sort By...'
                    onSelect={(event) => sortByInput(event)}
                >
                    {/* filter project names in ascending or descending order */}
                    <Dropdown.Item eventKey={`${filterOption1.className}-asc`} >{filterOption1.name}, Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey={`${filterOption1.className}-desc`}>{filterOption1.name}, Descending</Dropdown.Item>
                    <Dropdown.Divider/>
                    {/* filter start date in ascending or descending order */}
                    <Dropdown.Item eventKey={`${filterOption2.className}-asc`} >{filterOption2.name}, Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey={`${filterOption2.className}-desc`}>{filterOption2.name}, Descending</Dropdown.Item>
                </DropdownButton>
            </InputGroup.Prepend>

            {/* control to search all projects */}
            <Form.Control
                onChange={(event) => filterByIinput(event)}
                className='test'
                placeholder='Search for a project...'
            />
        </InputGroup>
    );
}
export default connect(null)(Searchbar);