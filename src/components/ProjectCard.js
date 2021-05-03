import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/ProjectCard.css';

// https://blog.bitsrc.io/add-a-simple-search-function-to-react-app-without-a-server-22deda8966cd
const ProjectCard = ({projectName, description, projectIdentifier, start_date, end_date}) => {
    console.log(projectName);
    return(
        <Card className='project-entry'>
            <Card.Body>
                <Button variant='danger'>X</Button>
                <Card.Title>Project {projectIdentifier}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>{projectName}</Card.Subtitle>
                <Card.Text className='text-dates end-date'>{end_date}</Card.Text>
                <Card.Text className='text-dates start-date'>{start_date}</Card.Text>
            </Card.Body>
      </Card>
    );
}
export default ProjectCard;
