import * as TE from "fp-ts/TaskEither";

export const tryCatch = <E, A, B>(
  f: (x: A) => Promise<B>,
  onRejected: (reason: unknown) => E,
) =>
  (x: A) => {
    return TE.tryCatch(
      () => f(x),
      onRejected,
    );
  };