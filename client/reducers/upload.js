const initialState = {
  isLoading: false,
  errors: {},
  uploaded: "",
};
export const uploadCover = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'UPLOAD_COVER': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPLOAD_COVER_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        uploaded: action.payLoad,
      };
    }
    case 'UPLOAD_COVER_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payLoad,
      };
    }
    default: return state;
  }
};
export const uploadPdf = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'UPLOAD_PDF': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPLOAD_PDF_SUCCESSFUL': {
      return {
        ...state,
        isLoading: false,
        uploaded: action.payLoad,
      };
    }
    case 'UPLOAD_PDF_FAILED': {
      return {
        ...state,
        isLoading: false,
        errors: action.payLoad,
      };
    }
    default: return state;
  }
};
