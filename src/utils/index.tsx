function check<PromiseData>(cb: () => Promise<PromiseData>) {
  if (typeof cb !== 'function') {
    throw Error('fn should be a function!');

  }
}

export async function tryCatch<PromiseData, FnArgs extends unknown[] >(
  cb: (...args: FnArgs) => Promise<PromiseData>,
  ...args: FnArgs
): Promise<[Error] | [null, PromiseData]> {
  check(cb)

  try {
    return [null, await cb(...args)];
  } catch (error) {
    return [error as Error];
  }
}