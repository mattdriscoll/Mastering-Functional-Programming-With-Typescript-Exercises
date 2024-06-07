import { sequenceS, sequenceT } from "fp-ts/lib/Apply";
import { map as mapArr } from "fp-ts/lib/Array";
import * as Either from "fp-ts/lib/Either";
import { flow, pipe } from "fp-ts/lib/function";
import { toUpperCase } from "fp-ts/lib/string";

const sum = (a: number) => (b: number) => a + b;
const increment = sum(1);
const log = (x: unknown) => {
  console.log(x);
  return x;
};
/**
 * Try running sequenceT example with another representative of the Applicative
 * type class, like Array or even some that we didn't discuss in this book yet,
 * such as Either or Task. What do you get when you pass a number of instances
 * of your chosen Applicative to seq?
 */
console.log(
  pipe(
    sequenceT(Either.Apply),
    (seq) =>
      seq(
        Either.of("hello"),
        Either.of("world"),
        Either.of("!!!!")
        // Either.left("I will blow it all up 🧨💥")
      ),
    // Either.map((xs) => xs.map((x) => x.toUpperCase()))
    // Either.map(flow(mapArr(toUpper)))
    Either.map(flow(mapArr(toUpperCase)))
  ),
  pipe(
    sequenceT(Either.Apply),
    (seq) => seq(Either.of([1, 2, 3, 4])),
    Either.map(flow(mapArr(mapArr(increment))))
  )
);

/**
 * Explore sequenceS - instead of a tuple, it operates on structs. What results
 * do you get?
 */
console.log(
  pipe(
    sequenceS(Either.Apply),
    (seq) =>
      seq({
        age: Either.of(1),
        name: Either.of("Candy"),
        breed: Either.right("Retriever"),
        // isBroken: Either.left("I will blow it all up 🧨💥"),
      })
    // Either.map(
    //   flow((pup) => ({
    //     ...pup,
    //     sex: "female",
    //     likesToRun: true,
    //     isSuperCute: true,
    //   }))
    // )
  ),
  sequenceS(Either.Apply)({
    age: Either.of(1),
    name: Either.of("Candy"),
    breed: Either.right("Retriever"),
    // isBroken: Either.left("I will blow it all up 🧨💥"),
  })
);
