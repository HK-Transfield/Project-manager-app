import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/CreateProjectForm.css';
import '../css/DisplayModal.css';
import CreateProjectForm from './CreateProjectForm';
// https://stackoverflow.com/questions/56107329/react-how-to-close-a-modal-from-child-opened-from-parent-component
 /**
  * Uses a bootstrap modal to display a create project form.
  * This can be opened with a button
  * 
  * @returns The DOM containing the modal and form 
  */
const CreateProjectModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    // https://www.pluralsight.com/guides/how-to-open-and-close-react-bootstrap-modal-programmatically
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