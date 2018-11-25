import { C } from "../constants";

// export function submitChatMessage(){
//     return function)(dispatch){

//     }
// }
let nextMessageId = 0;
const nextUserId = 0;

export const addMessage = (message, author) => ({
  type: C.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
});
