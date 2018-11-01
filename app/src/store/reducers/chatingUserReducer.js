const initState = null;

const chatingUser = (state = initState, action) => {
    switch (action.type) {
        case "ADD_CHATING_USER":
            // console.log('add chating user');
            return {
                ...action.user
            };
        case 'CLEAR_CHATING_USER':
            return state;
        default:
            return state;
    }
};

export default chatingUser;