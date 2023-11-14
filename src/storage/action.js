import {
  UPDATECATEGORIES,
  LOGIN,
  SIGNOUT,
  UPDATEPROFILE,
  UPDATECARTCOUNT,
} from './constant';

export const login = data => ({
  type: LOGIN,
  payload: {
    userId: data.userId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    mobileNumber: data.mobileNumber,
    profileImage: data.profileImage,
  },
});

export const signout = data => ({
  type: SIGNOUT,
  payload: {},
});

//WHEN WE WANT TO UPDATE USER PROFILE PICTURE//

export const updateProfile = data => ({
  type: UPDATEPROFILE,
  payload: {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    mobileNumber: data.mobileNumber,
    profileImage: data.profileImage,
  },
});
//this action is provide categories data to shop page//
export const updatecategories = data => ({
  type: UPDATECATEGORIES,
  payload: {
    categories: data,
  },
});
//TO UPDATE CART COUNT//
export const updateCartCount = data => ({
  type: UPDATECARTCOUNT,
  payload: {
    cartCount: data,
  },
});
