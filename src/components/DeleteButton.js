import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect, useDispatch } from 'react-redux';

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