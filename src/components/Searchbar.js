import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../css/Searchbar.css';

const Searchbar = ({keyword, setKeyword}) => {
    return(
        <InputGroup className='searchbar'>
            <InputGroup.Prepend>
                <DropdownButton
                    variant='secondary'
                    title='Sort By...'
                >
                    <Dropdown.Item>Name</Dropdown.Item>
                    <Dropdown.Item>Start Date</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item>Ascending</Dropdown.Item>
                    <Dropdown.Item>Descending</Dropdown.Item>
                </DropdownButton>
            </InputGroup.Prepend>
            <Form.Control
               className='test'
                value={keyword}
                placeholder='Search for a project...'
            />
        </InputGroup>
    );
}
export default Searchbar;