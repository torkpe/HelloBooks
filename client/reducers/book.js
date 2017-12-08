const initialState = {
  fetching: false,
  books: [],
  errors: '',
};
export const getBooks = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_BOOKS': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'GET_BOOKS_SUCCESSFUL': {
      return {
        ...state,
        fetching: false,
        books: action.payload,
      };
    }
    case 'FAILED_TO_GETBOOKS': {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
const getExceedsState = {
  fetching: false,
  exceeds: [],
  errors: '',
};

// Get a book
const getABookState = {
  fetching: false,
  book: {},
  bookQuantity: 0,
  errors: '',
};
export const getABook = (state = getABookState, action = {}) => {
  switch (action.type) {
    case 'GET_BOOK': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'GET_BOOK_SUCCESSFUL': {
      return {
        ...state,
        fetching: false,
        bookQuantity: action.payload.quantity,
        book: action.payload,
      };
    }
    case 'FAILED_TO_GETBOOK': {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    case 'CLEAR_SINGLE_BOOK': {
      return {
        ...state,
        fetching: false,
        bookQuantity: 0,
        book: {},
        errors: ''
      };
    }
    default: return state;
  }
};
const checkIfBorrowedState = {
  fetching: false,
  book: {},
  bookQuantity: -1,
  errors: '',
};
// Check if Borrowed state
export const checkIfBorrowed = (state = checkIfBorrowedState, action = {}) => {
  switch (action.type) {
    case 'CHECK_IF_BORROWED': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'CHECK_IF_BORROWED_SUCCESSFUL': {
      return {
        ...state,
        fetching: false,
        book: action.payload,
      };
    }
    case 'CHECK_IF_BORROWED_FAILED': {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
// Borrow a book
const borrowBookState = {
  requesting: false,
  response: {},
  errors: {},
  successfullyBorrowed: false,
};
export const borrowBook = (state = borrowBookState, action = {}) => {
  switch (action.type) {
    case 'BORROW_BOOK': {
      return {
        ...state,
        requesting: true,
      };
    }
    case 'BORROW_BOOK_SUCCESSFUL': {
      return {
        ...state,
        requesting: false,
        response: action.payload,
        successfullyBorrowed: true,
      };
    }
    case 'FAILED_TO_BORROW_BOOK': {
      return {
        ...state,
        requesting: false,
        errors: action.payload,
      };
    }
    case 'CLEAR_BORROW_BOOK_STATE': {
      return {
        ...state,
        requesting: false,
        response: {},
        errors: {},
        successfullyBorrowed: false,
      };
    }
    default: return state;
  }
};
// return a book
const returnBookState = {
  requesting: false,
  response: {},
  errors: {},
  successfullyReturned: false,
};
export const returnBook = (state = returnBookState, action = {}) => {
  switch (action.type) {
    case 'RETURN_BOOK': {
      return {
        ...state,
        requesting: true,
      };
    }
    case 'RETURN_BOOK_SUCCESSFUL': {
      return {
        ...state,
        requesting: false,
        response: action.payload,
        successfullyReturned: true,
      };
    }
    case 'FAILED_TO_RETURN_BOOK': {
      return {
        ...state,
        requesting: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
// Get borrowed books
export const getBorrows = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_BORROWS': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'GET_BORROWS_SUCCESSFUL': {
      return {
        ...state,
        fetching: false,
        books: action.payload,
      };
    }
    case 'FAILED_TO_GET_BORROWS': {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
};
const createBookState = {
  isLoading: false,
  book: {},
  message: '',
  errors: {},
};
// Create book
export const createBook = (state = createBookState, action = {}) => {
  switch (action.type) {
    case 'POST_BOOK': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'POST_BOOK_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        book: action.payload.newBook,
        message: action.payload.message
      };
    }
    case 'POST_BOOK_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    }
    case 'CLEAR_CREATED_BOOK': {
      return {
        ...state,
        isLoading: false,
        book: {},
        message: '',
        errors: {},
      };
    }
    default: return state;
  }
};
// Delete book
const deleteBookState = {
  isLoading: false,
  response: {},
  error: {},
};
export const deleteBook = (state = deleteBookState, action = {}) => {
  switch (action.type) {
    case 'DELETE_BOOK': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'DELETE_BOOK_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        response: action.payLoad,
      };
    }
    case 'DELETE_BOOK_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case 'CLEAR_DELETE_BOOK_STATE': {
      return {
        isLoading: false,
        response: {},
        error: {},
      }
    }
    default: return state;
  }
};
// Edit book
const editBookState = {
  isLoading: false,
  book: {},
  error: {},
};
export const editBook = (state = editBookState, action = {}) => {
  switch (action.type) {
    case 'EDIT_BOOK': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'EDIT_BOOK_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        book: action.payload,
      };
    }
    case 'EDIT_BOOK_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: return state;
  }
};