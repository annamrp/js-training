const evaluator = token => {
  if (token.type == "sum") {
    return (
      Math.round((evaluator(token.value1) + evaluator(token.value2)) * 100) /
      100
    );
  }
  if (token.type == "rest") {
    return (
      Math.round((evaluator(token.value1) - evaluator(token.value2)) * 100) /
      100
    );
  }
  if (token.type == "mult") {
    return (
      Math.round(evaluator(token.value1) * evaluator(token.value2) * 100) / 100
    );
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
