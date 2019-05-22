import { printHello } from "../../src/Closures/es6-module";
import myModule from "../../src/Closures/classic-module";

test("", () => {
  expect(printHello()).toEqual("hello");
});

test("", () => {
  expect(myModule.printHello()).toEqual("hello");
});
