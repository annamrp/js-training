const evaluator = token => {
  if (token.type == "sum") {
    return evaluator(token.value1) + evaluator(token.value2);
  }
  if (token.type == "rest") {
    return evaluator(token.value1) - evaluator(token.value2);
  }
  if (token.type == "mult") {
    return evaluator(token.value1) * evaluator(token.value2);
  }
  return token.value;
};

export default evaluator;
