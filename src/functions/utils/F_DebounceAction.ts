export const F_DebounceAction = (action: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      action.apply(context, args);
    }, delay);
  };
};
