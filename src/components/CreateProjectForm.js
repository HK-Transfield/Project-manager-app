import React, { useState, useRef, isValidElement } from "react";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect, useDispatch } from 'react-redux';
import '../css/CreateProjectForm.css';
import '../css/DisplayModal.css';

/**
 * Used to set the field state to have no values.
 */
const initialState = {
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: ""
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
const CreateProjectForm = () => {

    /**********************
     * Declare Hooks
     **********************/
    const dispatch = useDispatch();
    const projectFormRef = useRef(null);
    const [valid, setValid] = useState(false);
    const [fields, setFields] = useState(initialState);
    const[errors, setErrors] = useState({});


    /**********************
     * Component Functions
     **********************/

    /**
     * Resets the forms to show no values in form controls.
     */
    const handleReset = () => {
        projectFormRef.current.reset();
        setFields(initialState);
        setValid(false);
    }

    /**
     * Updates the component's field state to contain the input of the user.
     * 
     * @param {event} event The user inputting data into the form.
     */
    const handleChange = (event) => {
        let {name, value} = event.target;

        setFields({...fields, [name]:value});
    }

    /**
     * Checks that all form controls contain valid input. If any 
     * of the inputs are invalid this function will generate the 
     * the appropriate error message, which will then be
     * displayed underneath the form control.
     * 
     * @returns A boolean representing the validity of the form.
     */
    const validate = () => {
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
            console.log('nooooooooooo')
            console.log(errors)
            setErrors(errors);
            return false;
        }

     return true;
    }

    /**
     * When the form is submitted, it will call the this.validate function
     * and update the state if all fields are valid.
     * 
     * @param {event} event User clicks on the submit button 
     */
    const handleSubmit = (event) => {
        // Stop the HTML default form submit
        event.preventDefault();
        
        // get the form so that we can check validity
        let form = event.currentTarget;
        
        // perform validation check
        setValid(validate());
        
        if (form.checkValidity() === false) { // check form validity after setting the state
            event.stopPropagation();
        }
        else {
            // send project to store
            dispatch({
                type: 'ADD_PROJECT',
                payload: fields
            });
            handleReset();
        }
    }


    /**********************
     * Return DOM Elements
     **********************/
    return(
        <div className='form-container'>
            <div className='form-header-container'>
                <h1 className='form-header'>Create Project</h1>
            </div>
            <hr/>
            <Form 
                noValidate 
                validated={valid} 
                onSubmit={handleSubmit}
                ref={projectFormRef}
            >
                <Form.Group controlId='formProjectDetails'>

                    {/*|| Project name validation */}
                    <Form.Control 
                        required
                        name='projectName'
                        type='text'
                        placeholder='Project Name' 
                        onChange={handleChange}
                        isInvalid={!!errors['projectNameError']}
                    />
                    <FormControl.Feedback type="invalid">
                        {errors['projectNameError']}
                    </FormControl.Feedback>
                    <br/>
                    
                    {/*|| Project identifier validation */}
                    <Form.Control 
                        required
                        name='projectIdentifier'
                        type='text'
                        placeholder='Project ID' 
                        onChange={handleChange}
                        isInvalid={!!errors['projectIdentifierError']}
                    />
                        <FormControl.Feedback type="invalid">
                        {errors['projectIdentifierError']}
                    </FormControl.Feedback>
                    <br/>
                    
                    {/*|| Project description validation */}
                    <Form.Control 
                        required
                        name='description'
                        as='textarea'
                        placeholder='Project Description'
                        onChange={handleChange} 
                        isInvalid={!!errors['descriptionError']}
                    />
                    <FormControl.Feedback type="invalid">
                        {errors['descriptionError']}
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
                        onChange={handleChange}
                        isInvalid={!!errors['startDateError']}
                    />
                    <FormControl.Feedback type="invalid">
                        {errors['startDateError']}
                    </FormControl.Feedback>
                    <br/>
                    
                    {/*|| Project end date validation*/}
                    <Form.Label>End Date</Form.Label>
                    <Form.Control 
                        required
                        name='end_date'
                        type='date' 
                        placeholder='dd/mm/yyyy'
                        onChange={handleChange}
                        isInvalid={!!errors['endDateError']}
                    />
                    <FormControl.Feedback type="invalid">
                        {errors['endDateError']}
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
export default connect(null)(CreateProjectForm);