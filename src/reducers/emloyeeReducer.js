const employee = (state = [], action) => {
  switch (action.type) {
    case "GETALL":
      return action.payload;
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE": {
      return state.map((brand) =>
        brand.brandId !== action.payload.brandId ? brand : action.payload
      );
    }
    case "DELETE": {
      return state.filter((emp) => emp.id != action.payload);
    }
    default:
      return state;
  }
};

export default employee;
