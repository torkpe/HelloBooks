import url from '../utils/url';

export const userSignup = `${url}/users/signup`;
export const userConfirmationRequest = `${url}/confirmation/B7uqPzx9Pb\
OoEW9mCB1z61vAXA7eAscoKTDuzGuRWHnSXbnviE`;
export const userSignin = `${url}/users/signin`;
export const userResetLink = `${url}/users/send-password-reset-link`;
export const resetUserPasswordUrl = `${url}/users/reset-password/B7uqPzx9PbOo\
EW9mCB1z61vAXA7eAscoKTDuzGuRWHnSXbnviE`;
export const getBook = `${url}/books/1`;
export const getBooks = `${url}/books`;
export const checkIfBorrowed = `${url}/book/1/2`;
export const getBorrows = `${url}/users/2/books`;
export const returnBook = `${url}/users/2/1/books`;
export const borrowBook = `${url}/users/1/2/books`;
export const postBook = `${url}/books`;
export const deleteBook = `${url}/books/2/delete`;
export const editBook = `${url}/books/2`;
export const changePassword = `${url}/users/change-password/2`;
export const getPdf = `${url}/books/2`;
export const getUser = `${url}/users/2`;
export const getAllBorrowed = `${url}/users/2/books/all-borrowed`;
export const allNotReturned = `${url}/users/2/books`;
export const getNotification = `${url}/notifications/user/2`;
export const getAdminNotification = `${url}/notifications/admin`;
export const updateUser = `${url}/users/update-user/2`;
export const upload = `https://api.cloudinary.com/v1_1/hellobooks/auto/upload`;
export const addGenre = `${url}/books/genre`;