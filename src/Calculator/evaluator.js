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
  if (token.type == "div") {
    return (
      Math.round((evaluator(token.value1) / evaluator(token.value2)) * 100) /
      100
    );
  }
  return token.value;
};

export default evaluator;
