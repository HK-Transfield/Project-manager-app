import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/CreateProjectForm.css';
import '../css/DisplayModal.css';
import CreateProjectForm from './CreateProjectForm';

 /**
  * Uses a bootstrap modal to display a create project form.
  * This can be opened with a button
  * 
  * @returns The DOM containing the modal and form 
  */
const CreateProjectModal = () => {
    // declare state using hooks
    const [showModal, setShowModal] = useState(false);

    // define functions to handle state
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return(
        <div>
            <Button  
                className='btn-show-modal'
                variant='outline-primary' 
                onClick={handleShowModal}
            >
                Create A New Project
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                    <CreateProjectForm/>
            </Modal>
        </div>
    );
}
  
  export default CreateProjectModal;