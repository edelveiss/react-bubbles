import {
  DATA_START,
  DATA_SUCCESS,
  DATA_FAILURE,
  EDITING_STATE,
  FORM_STATE_COLOR,
  FORM_STATE_HEX,
  SET_COLOR,
  SET_INITIAL_COLOR,
} from "../actions";

const initialState = {
  colors: [],
  isLoading: false,
  error: "",
  editing: false,
  color: {
    color: "",
    code: {
      hex: "",
    },
    id: 0,
  },
};

export const bubblesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case DATA_SUCCESS:
      return {
        ...state,
        colors: action.payload,
        isLoading: false,
        error: "",
      };
    case DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case EDITING_STATE:
      return {
        ...state,
        editing: !state.editing,
      };

    case SET_COLOR:
      return {
        ...state,
        color: action.payload,
      };

    case SET_INITIAL_COLOR:
      return {
        ...state,
        color: {
          color: "",
          code: {
            hex: "",
          },
          id: 0,
        },
      };

    case FORM_STATE_COLOR:
      return {
        ...state,
        color: {
          ...state.color,
          [action.name]: action.value,
        },
      };
    case FORM_STATE_HEX:
      return {
        ...state,
        color: {
          ...state.color,
          code: {
            ...state.color.code,
            [action.name]: action.value,
          },
        },
      };

    default:
      return state;
  }
};
