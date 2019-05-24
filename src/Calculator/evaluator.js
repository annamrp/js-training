const evaluator = token => {
  switch (token.type) {
    case "sum":
      return (
        Math.round((evaluator(token.value1) + evaluator(token.value2)) * 100) /
        100
      );
    case "rest":
      return (
        Math.round((evaluator(token.value1) - evaluator(token.value2)) * 100) /
        100
      );
    case "mult":
      return (
        Math.round(evaluator(token.value1) * evaluator(token.value2) * 100) /
        100
      );
    case "div":
      return (
        Math.round((evaluator(token.value1) / evaluator(token.value2)) * 100) /
        100
      );
    default:
      return token.value;
  }
};

export default evaluator;
