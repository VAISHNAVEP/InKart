import {LOGIN, SIGNOUT, UPDATEPROFILE, UPDATECATEGORIES,UPDATECARTCOUNT} from './constant';

const initialState = {
  isLoggedIn: false,
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  profileImage: '',
  categories: [],
  //to upadate cartcount//
  cartCount:0,
};
export const firebaseinkartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        profileImage: action.payload.profileImage,
        isLoggedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        profileImage: '',
        isLoggedIn: false,
      };
    //when we want to update profile details //
    case UPDATEPROFILE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        profileImage: action.payload.profileImage,
      };
      //WHEN WE TAKE CATEGORY DETAILS FROM FIREBASE AND STORE AND PROVIVE SHOP PAGE//
    case UPDATECATEGORIES:
      
      return {
        ...state,
        categories: [...action.payload.categories],
      };
      case UPDATECARTCOUNT:
      return{
        ...state,
        cartCount:action.payload.cartCount,
      }  

    default:
      return state;
  }
};
