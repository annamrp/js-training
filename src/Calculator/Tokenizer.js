const tokenize = val => {
  const array = val.match(/(\d+)|\+|\-|\*/g);

  let accumulator = "";

  const symbol = {
    "+": "sum",
    "-": "rest",
    "*": "mult"
  };

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== "+" && array[i] !== "-" && array[i] !== "*") {
      if (array[i + 1] === "*") {
        const currentValue = array[i];
        const nextValue = array[i + 2];
        const multSymbol = symbol[array[i + 1]];
        const tokenizedMult = {
          type: multSymbol,
          value1: tokenize(currentValue),
          value2: tokenize(nextValue)
        };

        if (array.length - 1 === i + 2) return tokenizedMult;
        return {
          type: symbol[array[i + 3]],
          value1: tokenizedMult,
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
