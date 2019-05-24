function Tokenizer() {
  function ValueToken(value, type) {
    this.type = type;
    this.value = Number(value);
  }

  function OperationToken(value1, value2, type) {
    this.type = type;
    this.value1 = value1;
    this.value2 = value2;
  }

  const tokenize = input => {
    const array = input.match(/(\d+)?(\.?\d+)|\+|\-|\*|\//g);
    const symbol = {
      "+": "sum",
      "-": "rest",
      "*": "mult",
      "/": "div"
    };
    let accumulator = "";

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
          const tokenizedOperation = new OperationToken(
            tokenize(currentValue),
            tokenize(nextValue),
            operator
          );

          if (array.length - 1 === i + 2) return tokenizedOperation;

          return new OperationToken(
            tokenizedOperation,
            tokenize(array.slice(i + 4).join("")),
            symbol[array[i + 3]]
          );
        }

        if (i === array.length - 1) {
          return new ValueToken(array[i], "value");
        }

        accumulator = array[i];
      } else {
        return new OperationToken(
          tokenize(accumulator),
          tokenize(array.slice(i + 1).join("")),
          symbol[array[i]]
        );
      }
    }
  };
  console.log(new Token());

  return { tokenize: input => tokenize(input) };
}

export default Tokenizer();
