import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect, useDispatch } from 'react-redux';

/**
 * This button will delete a project by dispatching a 
 * DELETE_PROJECT to the reducer.
 * 
 * @param {string} props.projectIdentifier
 *  
 * @returns the DOM for the bootstrap button
 * 
 * @author Harmon Transfield
 */
const DeleteButton = ({projectIdentifier}) => {
    const dispatch = useDispatch();

    return(
        <Button 
            variant='danger' 
            onClick={
                () => dispatch({
                    type: 'DELETE_PROJECT',
                    payload: projectIdentifier
                })
            }
        >
            X
        </Button>
    );
}
export default connect(null)(DeleteButton);