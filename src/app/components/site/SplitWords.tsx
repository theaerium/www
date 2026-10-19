import { Fragment } from "react";

/** Wraps each word in a mask so headlines can rise into place word by word. */
export default function SplitWords({ text }: { text: string }) {
  // The space sits between masks: inside an inline-block it would collapse.
  return text.split(" ").map((word, i, words) => (
    <Fragment key={i}>
      <span className="b-word" style={{ ["--word-index" as string]: i }}>
        <span className="b-word-inner">{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
