// The Moon Gets One Star — a one-star review of the Moon, as a program.
// The program writes the review, and nothing else, to /output/entry.txt.
// Node 22, standard library only. No network, no dependencies, no input.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const REVIEW =
  "★☆☆☆☆ Ghosts me two weeks a month, then shows up at 3am, full of itself, shining through my blinds. Blocked.";

const MAX_CHARS = 120;

function main(): void {
  const review = REVIEW.trim();
  if (review.length === 0) {
    throw new Error("review must not be empty");
  }
  if (review.length > MAX_CHARS) {
    throw new Error(
      `review is ${review.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  // The grader runs the program with no arguments; a path argument lets
  // the review be checked locally without touching /output.
  const outPath = process.argv[2] ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, review, "utf8");
  // Read back what was written: the graded file must be exactly the review.
  const written = readFileSync(outPath, "utf8");
  if (written !== review) {
    throw new Error("written entry does not match the review");
  }
}

main();
