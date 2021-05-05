import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CreateProjectForm from './CreateProjectForm';
import '../css/DisplayModal.css';

const DisplayModal = () => {
    const [showModal, setShowModal] = useState(false);

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

export default DisplayModal;