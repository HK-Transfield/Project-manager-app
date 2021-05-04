import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CreateProjectForm from './CreateProjectForm';

const DisplayModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return(
        <div>
            <Button variant='dark' onClick={handleShowModal}>
                Create A New Project
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                    <CreateProjectForm/>
            </Modal>
        </div>
    );
}

export default DisplayModal;