export const useFunction = () => {

  const test = () => {
    console.log('Page function')
  }

  const test2 = () => {
    console.log('Page function2')
  }

  return { test, test2 };
};