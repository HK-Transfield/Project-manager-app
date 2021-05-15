import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { connect, useDispatch } from 'react-redux';
import '../css/Searchbar.css';

const Searchbar = () => {
    
    const dispatch = useDispatch();

    const filterByIinput = (event) => {
        let input = event.target.value;
        dispatch({
            type: 'FILTER_BY_VALUE',
            payload: input
        });
    }

    const sortByInput = (event) => {
        let sortOrder = event.endsWith('asc') ? 'asc' : 'desc';
        let sortField = event.startsWith('projectName') ? 'projectName' : 'start_date';
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

                {/*|| Filter projects */}
                <DropdownButton
                    variant='secondary'
                    title='Sort By...'
                    onSelect={(event) => sortByInput(event)}
                >
                    <Dropdown.Item eventKey='projectName-asc' >Project Names, Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey='projectName-desc'>Project Names, Descending</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item eventKey='start_date-asc'>Start Date, Ascending</Dropdown.Item>
                    <Dropdown.Item eventKey='start_date-desc'>Start Date, Descending</Dropdown.Item>
                </DropdownButton>
            </InputGroup.Prepend>

            {/*|| Search bar */}
            <Form.Control
                onChange={(event) => filterByIinput(event)}
                className='test'
                placeholder='Search for a project...'
            />
        </InputGroup>
    );
}
export default connect(null)(Searchbar);