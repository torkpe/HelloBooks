export const getAllBooks = [
  {
    id: 1,
    title: 'Eze goes to school',
    author: 'Arinze Akere',
    cover: 'http://res.cloudinary.com/hellobooks/ima',
    pdf: 'http://res.cloudinary.com/hellobooks/image',
    quantity: 4,
    genre: 'romance',
    description: 'A boy from the village who finally went to school',
    deleted: false,
    createdAt: '2017-12-08T14:58:33.891Z',
    updatedAt: '2017-12-08T14:58:33.891Z'
  },
  {
    id: 1,
    title: 'Eze goes to school',
    author: 'Arinze Akere',
    cover: 'http://res.cloudinary.com/hellobooks/ima',
    pdf: 'http://res.cloudinary.com/hellobooks/image',
    quantity: 4,
    genre: 'romance',
    description: 'A boy from the village who finally went to school',
    deleted: false,
    createdAt: '2017-12-08T14:58:33.891Z',
    updatedAt: '2017-12-08T14:58:33.891Z'
  },
  {
    id: 1,
    title: 'Eze goes to school',
    author: 'Arinze Akere',
    cover: 'http://res.cloudinary.com/hellobooks/ima',
    pdf: 'http://res.cloudinary.com/hellobooks/image',
    quantity: 4,
    genre: 'romance',
    description: 'A boy from the village who finally went to school',
    deleted: false,
    createdAt: '2017-12-08T14:58:33.891Z',
    updatedAt: '2017-12-08T14:58:33.891Z'
  }
];
export const addGenreState = {
  requesting: false,
  response: {},
  errors: {},
};
export const userSignup = {
  message: 'A mail has been sent to your email',
  key: 'B7uqPzx9PbOoEW9mCB1z61vAXA7eAscoKTDuzGuRWHnSXbnviE'
};
export const userConfirmationResponse = {
  myToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJpZCI6Niwic3RhciI6ImJyb256ZSIsImlzQWRtaW4iOmZhbHN\
lLCJpYXQiOjE1MTMwMDQwNjcsImV4cCI6MTUxMzA5MDQ2N30.\
wSnWHLLse7hq-ZIQOcuFNvaGwO8UAjiimYJzxjRmFPc',
  message: 'Successfully updated',
  userId: 2
};

export const userSigninResponse = {
  myToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJpZCI6Miwic3RhciI6ImdvbGQiLCJpc0FkbWluIjpmYWxz\
ZSwiaWF0IjoxNTEzMDA1MzAxLCJleHAiOjE1MTMwOTE3MDF9.\
SKKA5RHY0cMUqCNuFYbFNgi6CIa-fOIoOyGslFkwW0g',
  userId: 2
};
export const userResetLinkResponse = {
  message: 'A password reset link has been sent to your email',
  key: 'TqKwKi2V3som0fxlbcC9vwCIzT9XyGEdqsTG03nKCWlfbc66qf'
};
export const resetPasswordResponse = {
  message: 'Password reset successful',
};
export const errorMessage = {
  message: 'Something went wrong',
};
export const aBook = {
  id: 1,
  title: 'Eze goes to school',
  author: 'Arinze Akere',
  cover: 'http://res.cloudinary.com/hellobooks/ima',
  pdf: 'http://res.cloudinary.com/hellobooks/image',
  quantity: 4,
  genre: 'romance',
  description: 'A boy from the village who finally went to school',
};
export const checkIfBorrowedMessage = {
  message: 'No book found'
};
export const getBorrows = [
  {
    id: 1,
    title: 'Eze goes to school',
    author: 'Arinze Akere',
    cover: 'http://res.cloudinary.com/hellobooks/ima',
    pdf: 'http://res.cloudinary.com/hellobooks/image',
    quantity: 4,
    genre: 'romance',
    description: 'A boy from the village who finally went to school',
  },
];
export const deleteBook = {
  message: 'Book deleted successfully'
};
export const userDetail = {
  name: 'foo bar',
  email: 'jane@doe.com'
};
export const notification = [
  {
    id: 2,
    message: 'temitope, Gentle reminder concerning the book',
    type: 'user',
    isTreated: false,
    from: 'temitope',
    userId: 2,
    bookId: 1,
    createdAt: '2017-12-02T20:21:00.391Z',
    updatedAt: '2017-12-02T20:21:00.391Z'
  },
  {
    id: 2,
    message: 'temitope, Gentle reminder concerning the book',
    type: 'user',
    isTreated: false,
    from: 'temitope',
    userId: 2,
    bookId: 1,
    createdAt: '2017-12-02T20:21:00.391Z',
    updatedAt: '2017-12-02T20:21:00.391Z'
  },
];
export const updatedUser = {
  name: 'foo bar',
  message: 'Successfully updated Name'
};
export const userDetailsDecoded = {
  id: 2,
  star: 'bronze',
  isAdmin: false
};
export const booksInitialState = {
  fetching: false,
  books: [],
  errors: '',
};
export const bookInitialState = {
  fetching: false,
  book: {},
  bookQuantity: 0,
};
export const checkIfBorrowedState = {
  fetching: false,
  book: {},
  bookQuantity: -1,
  errors: '',
};
export const borrowBookMessage = {
  borrowed: {
    id: 1,
    bookId: 1,
    userId: 2,
    returned: false,
    returnDate: '2017-12-14T16:05:39.065Z',
    owing: false,
  },
  message: 'Book successfully borrowed'
};
export const borrowBookState = {
  requesting: false,
  response: {},
  errors: {},
  successfullyBorrowed: false,
};
export const returnBookMessage = {
  updated: {
    id: 14,
    userId: 2,
    bookId: 10,
    returned: true,
    returnDate: '2017-12-14T16:05:39.065Z',
    owing: false,
    createdAt: '2017-12-11T16:05:39.067Z',
    updatedAt: '2017-12-11T16:20:46.910Z'
  }
};
export const returnBookState = {
  requesting: false,
  response: {},
  errors: {},
  successfullyReturned: false,
};
export const createdBook = {
  newBook: {
    id: 1,
    title: 'Eze goes to school',
    author: 'Arinze Akere',
    cover: 'http://res.cloudinary.com/hellobooks/ima',
    pdf: 'http://res.cloudinary.com/hellobooks/image',
    quantity: 4,
    genre: 'romance',
    description: 'A boy from the village who finally went to school',
    deleted: false,
    createdAt: '2017-12-08T14:58:33.891Z',
    updatedAt: '2017-12-08T14:58:33.891Z'
  },
  message: 'Book successfully created'
};
export const createBookState = {
  isLoading: false,
  book: {},
  message: '',
  errors: {},
};
export const deleteBookResponse = {
  message: 'Book successfully deleted'
};
export const deleteBookState = {
  isLoading: false,
  response: {},
  error: {},
};
export const editBookResponse = {
  updatedBook: {
    id: 1,
    title: 'Eze goes to school',
    author: 'Arinze Akere',
    cover: 'http://res.cloudinary.com/hellobooks/ima',
    pdf: 'http://res.cloudinary.com/hellobooks/image',
    quantity: 4,
    genre: 'romance',
    description: 'A boy from the village who finally went to school',
    deleted: false,
    createdAt: '2017-12-08T14:58:33.891Z',
    updatedAt: '2017-12-08T14:58:33.891Z'
  },
  message: 'Book updated successfully'
};
export const editBookState = {
  isLoading: false,
  book: {},
  error: {},
};
export const setPasswordState = {
  isLoading: false,
  errors: {},
  response: {},
};
export const setPasswordResponse = {
  message: 'Password successfully changed'
};
export const getPdfState = {
  fetching: false,
  books: {},
  errors: '',
};

export const getUserState = {
  fetching: false,
  user: {},
  errors: '',
};
export const allBorrowsInitialState = {
  isLoading: false,
  errors: {},
};
export const notReturnedState = {
  isLoading: false,
  notReturned: [],
  errors: {},
};
export const notificationState = {
  fetching: false,
  errors: {},
  notifications: [],
};
export const updateUserState = {
  isLoading: false,
  errors: {},
  response: {},
};
export const uploadFileInitialState = {
  isLoading: false,
  errors: {},
  uploaded: '',
};
export const cover = 'http://res.cloudinary.com/hellobooks/image/upload/v1512';
export const pdf = 'http://res.cloudinary.com/hellobooks/image/upload/';
export const signupInitialState = {
  isLoading: false,
  errors: {},
  successfullySignedup: {},
};
export const confirmationInitalState = {
  isLoading: false,
  errors: {},
  confirmationSuccessful: {},
};
export const resetUserPassword = {
  isLoading: false,
  error: {},
  successfullyResetPassword: {},
};
export const signinInitialState = {
  isLoading: false,
  successfullySignedin: {},
  errors: {},
};