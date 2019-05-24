import tokenize from "../../src/Calculator/tokenizer";
import evaluator from "../../src/Calculator/evaluator";

test("tokenizer recives a single number and returns a value token", () => {
  expect(tokenize("5")).toEqual({ value: 5, type: "value" });
  expect(tokenize("8")).toEqual({ value: 8, type: "value" });
});

test("tokenizer recives a sum of numbers and returns a token", () => {
  expect(tokenize("5+3")).toEqual({
    type: "sum",
    value1: { value: 5, type: "value" },
    value2: { value: 3, type: "value" }
  });
});

test("tokenizer recives a rest of numbers and returns a token", () => {
  expect(tokenize("5-3")).toEqual({
    type: "rest",
    value1: { value: 5, type: "value" },
    value2: { value: 3, type: "value" }
  });
});

test("tokenizer recives a mult of 2 numbers and returns a token", () => {
  expect(tokenize("5*3")).toEqual({
    type: "mult",
    value1: { value: 5, type: "value" },
    value2: { value: 3, type: "value" }
  });
});

test("tokenizer recives a mult and sum of numbers and returns a token", () => {
  expect(tokenize("5*5+3")).toEqual({
    type: "sum",
    value1: {
      type: "mult",
      value1: { value: 5, type: "value" },
      value2: { value: 5, type: "value" }
    },
    value2: { value: 3, type: "value" }
  });
});

test("tokenizer recives a sum and mult of numbers and returns a token", () => {
  expect(tokenize("5+5*3")).toEqual({
    type: "sum",
    value1: { value: 5, type: "value" },
    value2: {
      type: "mult",
      value1: { value: 5, type: "value" },
      value2: { value: 3, type: "value" }
    }
  });
});

test("tokenizer recives a mult of 3 numbers and returns a token", () => {
  expect(tokenize("5*5*3")).toEqual({
    type: "mult",
    value1: {
      type: "mult",
      value1: { value: 5, type: "value" },
      value2: { value: 5, type: "value" }
    },
    value2: { value: 3, type: "value" }
  });
});

test("tokenizer recives a div of numbers and returns a token", () => {
  expect(tokenize("6/2")).toEqual({
    type: "div",
    value1: { value: 6, type: "value" },
    value2: { value: 2, type: "value" }
  });
});

test("tokenizer recives a div and a rest of numbers and returns a token", () => {
  expect(tokenize("6/2-3")).toEqual({
    type: "rest",
    value1: {
      type: "div",
      value1: { value: 6, type: "value" },
      value2: { value: 2, type: "value" }
    },
    value2: { value: 3, type: "value" }
  });
});

test("tokenizer recives a sum and a div of numbers and returns a token", () => {
  expect(tokenize("3+6/2")).toEqual({
    type: "sum",
    value1: { value: 3, type: "value" },
    value2: {
      type: "div",
      value1: { value: 6, type: "value" },
      value2: { value: 2, type: "value" }
    }
  });
});

test("tokenizer recives a div of 3 numbers and returns a token", () => {
  expect(tokenize("12/3/2")).toEqual({
    type: "div",
    value1: {
      type: "div",
      value1: { value: 12, type: "value" },
      value2: { value: 3, type: "value" }
    },
    value2: { value: 2, type: "value" }
  });
});

test("eval recives a value token and returns its value", () => {
  expect(evaluator({ value: 8, type: "value" })).toEqual(8);
});

test("eval recives a sum token and returns its value", () => {
  const sumToken = {
    type: "sum",
    value1: { value: 5, type: "value" },
    value2: { value: 3, type: "value" }
  };

  expect(evaluator(sumToken)).toEqual(8);
});

test("eval recives a sum token and returns its value", () => {
  const sumToken = {
    type: "sum",
    value1: {
      type: "sum",
      value1: { value: 5, type: "value" },
      value2: { value: 3, type: "value" }
    },
    value2: { value: 3, type: "value" }
  };

  expect(evaluator(sumToken)).toEqual(11);
});

test("eval recives a rest token and returns its value", () => {
  const sumToken = {
    type: "rest",
    value1: {
      type: "sum",
      value1: { value: 7, type: "value" },
      value2: { value: 3, type: "value" }
    },
    value2: { value: 2, type: "value" }
  };

  expect(evaluator(sumToken)).toEqual(8);
});

test("eval recives a mult token and returns its value", () => {
  const sumToken = {
    type: "mult",
    value1: {
      type: "mult",
      value1: { value: 7, type: "value" },
      value2: { value: 3, type: "value" }
    },
    value2: { value: 2, type: "value" }
  };

  expect(evaluator(sumToken)).toEqual(42);
});

test("runs the program", () => {
  const result = evaluator(tokenize("55+25-75"));

  expect(result).toBe(5);
});

test("runs the program", () => {
  const result = evaluator(tokenize("50+25+75"));

  expect(result).toBe(150);
});

test("runs the program", () => {
  const result = evaluator(tokenize("5*5*5"));

  expect(result).toBe(125);
});

test("runs the program", () => {
  const result = evaluator(tokenize("5+5*5"));

  expect(result).toBe(30);
});

test("runs the program", () => {
  const result = evaluator(tokenize("5*5+3-1"));

  expect(result).toBe(27);
});

test("runs the program", () => {
  const result = evaluator(tokenize("12/3/2"));

  expect(result).toBe(2);
});

test("runs the program", () => {
  const result = evaluator(tokenize("5+10/2"));

  expect(result).toBe(10);
});

test("runs the program", () => {
  const result = evaluator(tokenize("5+10/2"));

  expect(result).toBe(10);
});

test("runs the program", () => {
  const result = evaluator(tokenize("30/7-2"));

  expect(result).toBe(2.29);
});

test("runs the program", () => {
  const result = evaluator(tokenize("30/3/2"));

  expect(result).toBe(5);
});

test("runs the program", () => {
  const result = evaluator(tokenize("2.2+2.1"));

  expect(result).toBe(4.3);
});

test("runs the program", () => {
  const result = evaluator(tokenize("2.2-2.1"));

  expect(result).toBe(0.1);
});
