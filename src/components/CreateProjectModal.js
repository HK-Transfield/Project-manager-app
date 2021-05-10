import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/CreateProjectForm.css';
import '../css/DisplayModal.css';

const initialState = {
    isValid: false,
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
            errors['descriptionError'] = "Please enter a description of your project.";

        // date validations
        if(!fields['start_date']) 
            errors['startDateError'] = "Please enter a start date for your project.";

        if(!fields['end_date']) 
            errors['endDateError'] = "Please enter an end date for your project.";
        
        // make sure that the end date is not before the start date
        if((new Date(fields['end_date']).getTime() < new Date(fields['start_date']).getTime()))
            errors['endDateError'] = "End date cannot be before the start date.";   

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
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault(); // cancels Event (Stops HTML Default Form Submit)
            event.stopPropagation(); // prevents Event Bubbling To Parent Elements
        }

        this.setState({isValid: this.validate()});

        if(this.state.isValid) {
            event.preventDefault();
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
                <Form noValidate validated={this.state.isValid} onSubmit={this.handleSubmit}>
                    <Form.Group controlId='formProjectDetails'>

                        {/*|| Project name validation */}
                        <Form.Control 
                            required
                            name='projectName'
                            type='text'
                            placeholder='Project Name' 
                            value={this.state.fields['projectName']}
                            onChange={this.handleChange}
                            isInvalid={!!this.state.errors['projectNameError']}
                        />
                        <FormControl.Feedback type="invalid">
                            {this.state.errors['projectNameError']}
                        </FormControl.Feedback>
                        <br/>
                        
                        {/*|| Project identifier validation */}
                        <Form.Control 
                            required
                            name='projectIdentifier'
                            type='text'
                            placeholder='Project ID' 
                            value={this.state.fields['projectIdentifier']}
                            onChange={this.handleChange}
                            isInvalid={!!this.state.errors['projectIdentifierError']}
                        />
                         <FormControl.Feedback type="invalid">
                            {this.state.errors['projectIdentifierError']}
                        </FormControl.Feedback>
                        <br/>
                        
                        {/*|| Project description validation */}
                        <Form.Control 
                            required
                            name='description'
                            as='textarea'
                            placeholder='Project Description'
                            onChange={this.handleChange} 
                            isInvalid={!!this.state.errors['descriptionError']}
                        />
                        <FormControl.Feedback type="invalid">
                            {this.state.errors['descriptionError']}
                        </FormControl.Feedback>
                    </Form.Group>

                        
                    <Form.Group controlId='formProjectDates'>

                        {/*|| Project start date validation*/}
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control 
                            required
                            name='start_date'
                            type='date' 
                            placeholder='dd/mm/yyyy' 
                            value={this.state.fields['start_date']}
                            onChange={this.handleChange}
                            isInvalid={!!this.state.errors['startDateError']}
                        />
                        <FormControl.Feedback type="invalid">
                            {this.state.errors['startDateError']}
                        </FormControl.Feedback>
                        <br/>
                        
                        {/*|| Project end date validation*/}
                        <Form.Label>End Date</Form.Label>
                        <Form.Control 
                            required
                            name='end_date'
                            type='date' 
                            placeholder='dd/mm/yyyy'
                            value={this.state.fields['end_date']}
                            onChange={this.handleChange}
                            isInvalid={!!this.state.errors['endDateError']}
                        />
                        <FormControl.Feedback type="invalid">
                            {this.state.errors['endDateError']}
                        </FormControl.Feedback>
                    </Form.Group>
                    <Button 
                        className='btn-submit-project' 
                        variant='dark' 
                        type='submit' 
                        block
                    >
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