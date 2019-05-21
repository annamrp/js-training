const tokenize = val => {
  const array = val.split("");
  let accumulator = "";

  const symbol = {
    "+": "sum",
    "-": "rest",
    "*": "mult"
  };

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== "+" && array[i] !== "-" && array[i] !== "*") {
      accumulator += array[i];

      if (i == array.length - 1) {
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
