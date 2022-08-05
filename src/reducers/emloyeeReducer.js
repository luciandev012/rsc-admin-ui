const employee = (state = [], action) => {
  switch (action.type) {
    case "GETALLEMP":
      return action.payload;
    case "CREATEEMP":
      return [...state, action.payload];
    case "DELETEEMP": {
      return state.filter((emp) => emp.id != action.payload);
    }
    default:
      return state;
  }
};

export default employee;
