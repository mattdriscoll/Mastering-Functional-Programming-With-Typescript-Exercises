import { either, option } from "fp-ts";
import { expect, test } from "vitest";
import { pipe } from "../1-type-classes/exercises";
import { sequenceS, sequenceT } from "fp-ts/lib/Apply";
import { beginsWith } from "../../utils";

const solas = [
  "sola fide",
  "sola gratia",
  "sola scriptura",
  "solus christus",
  "soli deo gloria",
] as const;

test("Ch6 Q1 - Sequencing Applicatives - Tuples", () => {
  const opt1 = option.some("soli");
  const opt2 = option.some("deo");
  const opt3 = option.some("gloria");
  const optionStringSequence = pipe(sequenceT(option.Applicative), seq => seq(opt1, opt2, opt3));

  expect(optionStringSequence).toStrictEqual(option.some(["soli", "deo", "gloria"]));

  const eitherSolas = [
    either.fromNullable("missing")(solas[0]),
    either.fromNullable("missing")(solas[1]),
    either.fromPredicate(beginsWith("sola"), () => "missing")(solas[2]),
    either.fromPredicate(beginsWith("solus"), () => "missing")(solas[3]),
    either.fromOption(() => "missing")(option.some(solas[4])),
  ] as const;

  const eitherStringSequence = pipe(sequenceT(either.Applicative), seq =>
    seq(eitherSolas[0], eitherSolas[1], eitherSolas[2], eitherSolas[3], eitherSolas[4]),
  );
  const eitherStringSequence2 = sequenceT(either.Applicative)(...eitherSolas);

  expect(eitherStringSequence).toStrictEqual(either.of(solas));
  expect(eitherStringSequence2).toStrictEqual(either.of(solas));
});

test("Ch6 Q2 - Sequencing Applicatives - Structs", () => {
  const eitherSolas = {
    fide: either.fromNullable("missing")(solas[0]),
    gratia: either.fromNullable("missing")(solas[1]),
    scriptura: either.fromPredicate(beginsWith("sola"), () => "missing")(solas[2]),
    christus: either.fromPredicate(beginsWith("solus"), () => "missing")(solas[3]),
    deoGloria: either.fromOption(() => "missing")(option.some(solas[4])),
  };

  expect(sequenceS(either.Applicative)(eitherSolas)).toStrictEqual(
    either.of({
      fide: "sola fide",
      gratia: "sola gratia",
      scriptura: "sola scriptura",
      christus: "solus christus",
      deoGloria: "soli deo gloria",
    }),
  );

  expect(
    sequenceS(either.Applicative)({
      ...eitherSolas,
      // @ts-ignore
      null: either.fromNullable("missing")(solas[17]),
    }),
  ).toStrictEqual(either.left("missing"));
});
