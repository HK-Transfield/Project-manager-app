import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/CreateProjectForm.css';
import '../css/DisplayModal.css';

const initialState = {
    fields: {
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: ""
    },
    errors: {}
}

class CreateProjectForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    /**
     * Checks that all form controls contain valid input.
     * 
     * @returns A boolean representing whether or not the form is valid.
     */
    validate = () => {
        let fields = this.state.fields;
        let errors = {};

        // projectName validation
        if(!fields['projectName']) 
            errors['projectNameError'] = "Project name cannot be blank.";

        // project ID validation
        if(!fields['projectIdentifier']) 
            errors['projectIdentifierError'] = "Project ID cannot be blank.";

        // description validation
        if(!fields['description']) 
            errors['descriptionError'] = "Please enter a description of your project."

        // date validations
        if(!fields['start_date']) 
            errors['startDateError'] = "Please enter a start date for your project."

        if(!fields['end_date']) 
            errors['endDateError'] = "Please enter an end date for your project."

        // there are errors in the form
        if(errors) {
            this.setState({errors});
            return false;
        }
        return true;
    }

    /**
     * Updates the component's field state to contain the input of the user.
     * 
     * @param {event} event The user inputting data into the form.
     */
    handleChange = (event) => {  
        const {name, value} = event.target;

        this.setState(prevState => {
            prevState.fields[name] = value;
            return {
               fields: prevState.fields
            };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validate();

        if(isValid) {
            this.setState(initialState);
        }
    }

    render() {
        return(
           <div className='form-container'>
                <div className='form-header-container'>
                    <h1 className='form-header'>Create Project</h1>
                </div>
                <hr/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='formProjectDetails'>
                            <Form.Control 
                                name='projectName'
                                type='text'
                                placeholder='Project Name' 
                                value={this.state.fields['projectName']}
                                onChange={this.handleChange}
                            />
                            <span>
                                {this.state.errors['projectNameError']}
                            </span>
                            <Form.Control 
                                name='projectIdentifier'
                                type='text'
                                placeholder='Project ID' 
                                value={this.state.fields['projectIdentifier']}
                                onChange={this.handleChange}
                            />
                            <Form.Control 
                                name='description'
                                as='textarea'
                                placeholder='Project Description'
                                onChange={this.handleChange} 
                            />
                    </Form.Group>

                    <Form.Group controlId='formProjectDates'>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control 
                            name='start_date'
                            type="date" 
                            placeholder='dd/mm/yyyy' 
                            value={this.state.fields['start_date']}
                            onChange={this.handleChange}
                            />
                        <Form.Label>End Date</Form.Label>
                        <Form.Control 
                            name='end_date'
                            type="date" 
                            placeholder='dd/mm/yyyy'
                            value={this.state.fields['end_date']}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button 
                        className='btn-submit-project' 
                        variant='dark' 
                        type="submit" 
                    block>
                        Create Project
                    </Button>
                </Form>
           </div>
        ); 
    }
}

 /**
  * Uses a bootstrap modal to display a create project form.
  * This can be opened with a button
  * 
  * @returns The DOM containing the modal and form 
  */
const DisplayProjectForm = () => {
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

export default DisplayProjectForm;