const unit = (state = [], action) => {
  switch (action.type) {
    case "GETUNITS":
      return action.payload;
    case "CREATEUNIT": {
      //console.log(action.payload);
      return [...state, action.payload];
    }
    case "UPDATEUNIT": {
      return state.map((unit) =>
        unit.unitId !== action.payload.unitId ? unit : action.payload
      );
    }
    case "DELETEUNIT": {
      return state.filter((unit) => unit.unitId != action.payload);
    }
    default:
      return state;
  }
};

export default unit;
