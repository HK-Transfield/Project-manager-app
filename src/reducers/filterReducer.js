const initialState = {}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SORT_BY_PROJECT_NAME':
            return state;
        case 'SORT_BY_START_DATE':
            return state;
        case 'LOAD_DATA':
            return state;
        default:
            return state;
    }
}
export default filterReducer;