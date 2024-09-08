export type TryCatch<Data, E extends Error = Error> =
  | [null, Data]
  | [E, null];

export async function tryCatch<D, E extends Error = Error>(
  callback: () => Promise<D>,
): Promise<TryCatch<D, E>> {
  try {
    const data = await callback();
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}