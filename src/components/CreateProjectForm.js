import React from "react";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import '../css/CreateProjectForm.css';
import '../css/DisplayModal.css';

/**
 * Default state when the project manager loads.
 * No values are stored.
 * 
 * @returns The default state of the component.
 */
const initialState = () => {
    return  {
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
}


/**
 * The CreateProjectForm class will render a react-bootstrap form,
 * allowing the user to enter in a new project. It has validation
 * methods to ensure that the data input is correct and valid.
 * 
 * If the fields are all valid, the form will then dispatch a redux
 * action and store the project object into the store.
 * 
 * @author Harmon Transfield
 */
class CreateProjectForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState();
        this.projectFormRef = React.createRef();
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Checks that all form controls contain valid input.
     * 
     * @returns A boolean representing the validity of the form.
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
        if(Object.keys(errors).length > 0) {
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

        // update fields state with user input
        this.setState(
            {
                fields: { ...this.state.fields, [name]: value }
            }
        );
    }

    /**
     * When the form is submitted, it will call the this.validate function
     * and update the state if all fields are valid.
     * 
     * @param {event} event User clicks on the submit button 
     */
    handleSubmit = (event) => {
        event.preventDefault(); // cancels Event (Stops HTML Default Form Submit)
        
        const form = event.currentTarget;
        console.log('form validation: ' + this.validate())

        // update state to call bootstrap form validation
        this.setState({isValid: this.validate()});

        if (form.checkValidity() === false) {
            event.stopPropagation(); // prevents Event Bubbling To Parent Elements
        }  else {
            // store the new project
            this.props.dispatch({
                type: "ADD_PROJECT",
                payload: this.state.fields
            });

            // clear form
            this.handleReset();
        }
    }

    /**
     * Resets the forms to show no values in form controls.
     */
    handleReset = () => {
        this.projectFormRef.current.reset();
        this.setState({isValid: false});
    }

    render() {
        return(
           <div className='form-container'>
                <div className='form-header-container'>
                    <h1 className='form-header'>Create Project</h1>
                </div>
                <hr/>
                <Form 
                    noValidate 
                    validated={this.state.isValid} 
                    onSubmit={this.handleSubmit}
                    ref={this.projectFormRef}
                >
                    <Form.Group controlId='formProjectDetails'>

                        {/*|| Project name validation */}
                        <Form.Control 
                            required
                            name='projectName'
                            type='text'
                            placeholder='Project Name' 
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
                            onChange={this.handleChange}
                            isInvalid={!!this.state.errors['endDateError']}
                        />
                        <FormControl.Feedback type="invalid">
                            {this.state.errors['endDateError']}
                        </FormControl.Feedback>
                    </Form.Group>
                    <Button 
                        type='submit'
                        className='btn-submit-project' 
                        variant='dark' 
                        block
                    >
                        Create Project
                    </Button>
                </Form>
           </div>
        ); 
    }
}
export default connect(null)(CreateProjectForm);