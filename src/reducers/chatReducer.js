import C from "../constants";

const initialState = {
  messages: [],
  message: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case C.ADD_MESSAGE:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
