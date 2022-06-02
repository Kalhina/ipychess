export function camel_case(input: string): string {
  // Convert from foo_bar to fooBar
  return input.toLowerCase().replace(/_(.)/g, (match, group) => {
    return group.toUpperCase();
  });
}

export function snake_case(input: string): string {
  // Convert from fooBar to foo_bar
  return input.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}


export function debounce<F extends Function>(func: F, wait: number): F {
  let timeoutID: number;
  if (!Number.isInteger(wait)) {
    console.warn('Called debounce without a valid number');
    wait = 300;
  }
  // conversion through any necessary as it wont satisfy criteria otherwise
  return <any>function (this: any, ...args: any[]) {
    window.clearTimeout(timeoutID);
    const context = this;

    timeoutID = window.setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

export function emit_resize() {
  document.body.dispatchEvent(new Event('chessground.resize'));
}
