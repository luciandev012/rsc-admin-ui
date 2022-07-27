const category = (state = [], action) => {
  switch (action.type) {
    case "GETCATES":
      return action.payload;
    case "DELETE": {
      return state.filter((cate) => cate.categoryId != action.payload);
    }
    default:
      return state;
  }
};

export default category;
