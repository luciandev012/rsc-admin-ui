const importNote = (state = [], action) => {
  switch (action.type) {
    case "GETALLIMP": {
      return action.payload;
    }
    case "DELETEIMP": {
      return state.filter((imp) => imp.importNoteId != action.payload);
    }
    default:
      return state;
  }
};

export default importNote;
