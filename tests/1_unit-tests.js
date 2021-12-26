const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
let puzzleStringAndResult = [
   "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
   "769235418851496372432178956174569283395842761628713549283657194516924837947381625",
];
let invalidPuzzleString =
   "1.5..2.84..63.12.7.2..5.....9..1a...8.2.3674.3.7.2..9.47...8..1..16...926914.37.";

let cannotSolvePuzzleString =
   "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....5.37.4.3..6..";

suite("UnitTests", () => {
   test("Logic handles a valid puzzle string of 81 characters", function () {
      assert.isTrue(solver.validate(puzzleStringAndResult[0]));
   });
   test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
      assert.instanceOf(solver.validate(invalidPuzzleString), Error);
   });
   test("Logic handles a puzzle string that is not 81 characters in length", function () {
      assert.instanceOf(solver.validate(invalidPuzzleString), Error);
   });
   test("Logic handles a valid row placement", function () {
      assert.isTrue(
         solver.checkRowPlacement(puzzleStringAndResult[0], "A", "1", "7")
      );
   });
   test("Logic handles an invalid row placement", function () {
      assert.isFalse(
         solver.checkRowPlacement(puzzleStringAndResult[0], "A", "1", "1")
      );
      assert.isFalse(
         solver.checkRowPlacement(puzzleStringAndResult[0], "A", "1", "5")
      );
   });
   test("Logic handles a valid column placement", function () {
      assert.isTrue(
         solver.checkColPlacement(puzzleStringAndResult[0], "A", "1", "7")
      );
   });
   test("Logic handles an invalid column placement", function () {
      assert.isFalse(
         solver.checkColPlacement(puzzleStringAndResult[0], "A", "1", "4")
      );
   });
   test("Logic handles a valid region (3x3 grid) placement", function () {
      assert.isTrue(
         solver.checkRegionPlacement(puzzleStringAndResult[0], "A", "1", "7")
      );
   });
   test("Logic handles an invalid region (3x3 grid) placement", function () {
      assert.isFalse(
         solver.checkRegionPlacement(puzzleStringAndResult[0], "A", "1", "4")
      );
   });
   test("Valid puzzle strings pass the solver", function () {
      assert.isTrue(solver.validate(puzzleStringAndResult[0]));
   });
   test("Invalid puzzle strings fail the solver", function () {
      assert.instanceOf(solver.solve(cannotSolvePuzzleString), Error);
   });
   test("Solver returns the expected solution for an incomplete puzzle", function () {
      assert.equal(
         solver.solve(puzzleStringAndResult[0]),
         puzzleStringAndResult[1]
      );
      assert.equal(
         solver.solve(
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
         ),
         "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
      );
      assert.equal(
         solver.solve(
            "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"
         ),
         "568913724342687519197254386685479231219538467734162895926345178473891652851726943"
      );
      assert.equal(
         solver.solve(
            "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1"
         ),
         "218396745753284196496157832531672984649831257827549613962415378185763429374928561"
      );
      assert.equal(
         solver.solve(
            ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"
         ),
         "473891265851726394926345817568913472342687951197254638734162589685479123219538746"
      );
      assert.equal(
         solver.solve(
            "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51"
         ),
         "827549163531672894649831527496157382218396475753284916962415738185763249374928651"
      );
   });
});
