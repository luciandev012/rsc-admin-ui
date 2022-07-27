const importNote = (state = [], action) => {
  switch (action.type) {
    case "GETALL": {
      return action.payload;
    }
    case "DELETE": {
      return state.filter((imp) => imp.importNoteId != action.payload);
    }
    default:
      return state;
  }
};

export default importNote;
