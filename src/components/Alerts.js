import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

/**
 * Everytime the user deletes a project from the ProjectList it will
 * display this alert, which informs users of the name of the project
 * they have just deleted what to do next. It can be dismissed.
 * 
 * @param {string} props.deletedProjectName
 * @returns The DOM of the alert
 * 
 * @author Harmon Transfield
 */
const AlertDeleted = ({deletedProjectName}) => {
    const [showAlert, setShowAlert] = useState(true);
    const dispatch = useDispatch();
  
    const closeAlert = () => {
      dispatch({type: 'ACKNOWLEDGE_DELETED_PROJECT'})
  
      return setShowAlert(false);
    }
  
    return (
      <Alert show={showAlert} variant='danger' onClose={()=>closeAlert()} dismissible>
      <Alert.Heading>Project Deleted!</Alert.Heading>
      <hr/>
      <p>
        You have just deleted <span className=' new-project-name'>{deletedProjectName}</span> from 
        your project list. If this was a mistake you will have to create a new project and add it
        again.
      </p>
    </Alert>
    );
} 

/**
 * When the user successfully submits a valid project in CreateProjectForm, it will display this
 * alert underneath the form informing the the user of their success. It will give the user
 * instructions on what to do next.
 * 
 * @param {string} props.newestProjectName The name of the newest project that has just been submitted. 
 * @returns The DOM of the alert.
 * 
 * @author Harmon Transfield
 */
const AlertSuccess = ({newestProjectName}) => {
    return (
        <Alert variant='success'>
            <Alert.Heading>Success! New Project Added!</Alert.Heading>
            <hr/>
            <p>
                You have added your project, <span className=' new-project-name'>{newestProjectName}</span>, to your list.
            </p>
            <p>
                You can view your newest project by closing this form, or you can add
                another project to your list. 
            </p>
        </Alert> 
    );
}

export {AlertDeleted, AlertSuccess};