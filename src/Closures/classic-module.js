const myModule = () => {
  const sayHello = () => "hello";
  return {
    printHello: () => sayHello()
  };
};

export default myModule();
