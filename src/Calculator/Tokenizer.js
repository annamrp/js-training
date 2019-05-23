const tokenize = val => {
  const array = val.match(/(\d+)?(\.?\d+)|\+|\-|\*|\//g);

  let accumulator = "";

  const symbol = {
    "+": "sum",
    "-": "rest",
    "*": "mult",
    "/": "div"
  };

  for (let i = 0; i < array.length; i++) {
    if (
      array[i] !== "+" &&
      array[i] !== "-" &&
      array[i] !== "*" &&
      array[i] !== "/"
    ) {
      if (array[i + 1] === "*" || array[i + 1] === "/") {
        const currentValue = array[i];
        const nextValue = array[i + 2];
        const operator = symbol[array[i + 1]];
        const tokenizedOperation = {
          type: operator,
          value1: tokenize(currentValue),
          value2: tokenize(nextValue)
        };

        if (array.length - 1 === i + 2) return tokenizedOperation;

        return {
          type: symbol[array[i + 3]],
          value1: tokenizedOperation,
          value2: tokenize(array.slice(i + 4).join(""))
        };
      }

      accumulator = array[i];

      if (i === array.length - 1) {
        return { value: Number(accumulator), type: "value" };
      }
    } else {
      return {
        type: symbol[array[i]],
        value1: tokenize(accumulator),
        value2: tokenize(array.slice(i + 1).join(""))
      };
    }
  }
};

export default tokenize;
