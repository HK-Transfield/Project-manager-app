import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CreateProjectForm from './CreateProjectForm'; 

export default class Header extends React.Component {
  render() {
    return (
      <header className="display-header">
        <h1 className="App-title">{this.props.title}</h1>
        <DisplayModal/>
      </header>
    );
  }
}

const DisplayModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return(
        <div>
            <Button variant='dark' onClick={handleShowModal}>
                Create New Project
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                    <CreateProjectForm/>
            </Modal>
        </div>
    );
}
