import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateProjectForm from './CreateProjectForm';
import '../css/CreateProjectButton.css';

 /**
  * Uses a bootstrap modal to display a create project form.
  * This can be opened with a button
  * 
  * @returns The DOM of the button and modal
  * 
  * @author Harmon Transfield
  */
const CreateProjectButton = () => {

    // declare state using hooks
    const [showModal, setShowModal] = useState(false);

    return(
        <div>
            <Button  
                className='btn-show-modal'
                variant='outline-primary' 
                onClick={() => setShowModal(true)}
            >
                Create A New Project
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} closeButton>
                   <Modal.Header closeButton/>
                   <CreateProjectForm/>
            </Modal>
        </div>
    );
}
  
export default CreateProjectButton;