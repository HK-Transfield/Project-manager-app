import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import '../css/ProjectCard.css';

const popover = (description) => (
    <Popover id="popover-basic">
      <Popover.Content>{description}</Popover.Content>
    </Popover>
);

// https://blog.bitsrc.io/add-a-simple-search-function-to-react-app-without-a-server-22deda8966cd
const ProjectCard = ({projectName, description, projectIdentifier, start_date, end_date}) => {
    console.log(projectName);
    return(
        <Card className='project-entry'>
            <Card.Body>
                <div className='card-details'>
                    <Button variant='danger'>X</Button>
                    <OverlayTrigger placement='right' overlay={popover(description)}>
                        <Card.Title>Project {projectIdentifier}</Card.Title>
                    </OverlayTrigger>
                    <Card.Subtitle className='mb-2 text-muted'>{projectName}</Card.Subtitle>
                </div>
                <Card.Text className='text-dates end-date'>{end_date}</Card.Text>
                <Card.Text className='text-dates start-date'>{start_date}</Card.Text>
            </Card.Body>
      </Card>
    );
}
export default ProjectCard;
