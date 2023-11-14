export const validatePhone = phone => {
  const replacedstring =phone.replace(/\s/g,'')
  return !/[a-zA-Z]/.test(replacedstring) && !/[^\d\-\-+]/.test(replacedstring);
};

export const validateOtp = otp => {
  return !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(otp);
};
