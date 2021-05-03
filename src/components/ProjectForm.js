import React from "react";
import Form from 'react-bootstrap/Form';
import '../css/ProjectForm.css';

const initialState = {
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: ""
}

export default class ProjectForm extends React.Component {
    state = initialState;

    validate = () => {
        let projectNameError = "";
        let projectIdentifierError = "";
        let descriptionError = "";
        let startDateError = "";
        let endDateError = "";

        if(!this.state.projectName)
            projectNameError = "Project name cannot be blank";
        
        if(!this.state.projectIdentifier)
            projectIdentifierError = "Project ID cannot be blank";
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return(
           <div className='form-container'>
                <div className='form-header-container'>
                    <h1 className='form-header'>Create Project</h1>
                </div>
                <hr/>
                <Form>
                <Form.Group controlId='formProjectDetails'>
                        <Form.Control placeholder='Project Name'/>
                        <Form.Control placeholder='Project ID'/>
                        <Form.Control placeholder='Project Description'/>
                </Form.Group>

                    <Form.Group controlId='formProjectDates'>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" placeholder='dd/mm/yyyy'/>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" placeholder='dd/mm/yyyy'/>
                    </Form.Group>
                </Form>
           </div>
        ); 
    }
}