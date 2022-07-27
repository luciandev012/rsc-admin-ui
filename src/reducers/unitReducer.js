const unit = (state = [], action) => {
  switch (action.type) {
    case "GETUNITS":
      return action.payload;
    case "CREATE": {
      //console.log(action.payload);
      return [...state, action.payload];
    }
    case "UPDATE": {
      return state.map((unit) =>
        unit.unitId !== action.payload.unitId ? unit : action.payload
      );
    }
    case "DELETE": {
      return state.filter((unit) => unit.unitId != action.payload);
    }
    default:
      return state;
  }
};

export default unit;
