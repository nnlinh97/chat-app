const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    // case 'LOGIN_SUCCESS':
    //   console.log('login success', action.user);
    //   return {...state};
    // case 'LOGIN_FAIL':
    //   console.log('login fail', action.err);
    //   return {
    //     ...state,
    //     authError: 'login fail'
    //   };
    case "SIGNIN_SUCCESS":
      console.log('sign in success', action.user);
      return {
        ...action.user
      }
    case 'LOGOUT_SUCCESS':
      return state;

    default:
      return state;
  }
};

export default authReducer;