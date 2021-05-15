const SORT_BY_PROJECT_NAME = 'SORT_BY_PROJECT_NAME';
const SORT_BY_START_DATE = 'SORT_BY_START_DATE';
const LOAD_PROJECTS = 'LOAD_PROJECTS';

export const sortByProjectName = (payload) => ({
    type: SORT_BY_PROJECT_NAME,
    payload
});

export const sortByStartDate = (payload) => ({
    type: SORT_BY_START_DATE,
    payload
});

export const loadProjects = (payload) => ({
    type: LOAD_PROJECTS,
    payload
});