const category = (state = [], action) => {
  switch (action.type) {
    case "GETCATES":
      return action.payload;
    case "DELETECATE": {
      return state.filter((cate) => cate.categoryId != action.payload);
    }
    default:
      return state;
  }
};

export default category;
