"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
   let solver = new SudokuSolver();

   app.route("/api/check").post((req, res) => {
      const { coordinate, puzzle, value } = req.body;
      if (!coordinate || !puzzle || !value) {
         return res.json({ error: "Required field(s) missing" });
      }
      const checkPuzzle = solver.validate(puzzle);
      if (checkPuzzle instanceof Error) {
         return res.json({ error: checkPuzzle.message });
      }
      const checkCoordinate = /^[A-Za-z][1-9]$/.test(coordinate);
      if (!checkCoordinate) {
         return res.json({ error: "Invalid coordinate" });
      }
      const checkValue = /^[1-9]$/.test(value);
      if (!checkValue) {
         return res.json({ error: "Invalid value" });
      }
      let responseResult = {
         valid: true,
      };
      const [row, col] = coordinate.split("");
      const checkRow = solver.checkRowPlacement(puzzle, row, col, value);
      const checkCol = solver.checkColPlacement(puzzle, row, col, value);
      const checkRegion = solver.checkRegionPlacement(puzzle, row, col, value);
      if (!checkCol || !checkRow || !checkRegion) {
         responseResult.valid = false;
         responseResult.conflict = [];
         if (!checkRow) {
            responseResult.conflict = [...responseResult.conflict, "row"];
         }
         if (!checkCol) {
            responseResult.conflict = [...responseResult.conflict, "column"];
         }
         if (!checkRegion) {
            responseResult.conflict = [...responseResult.conflict, "region"];
         }
      }
      return res.json(responseResult);
   });

   app.route("/api/solve").post((req, res) => {
      const { puzzle } = req.body;
      if (!puzzle) {
         return res.json({ error: "Required field missing" });
      }
      const checkPuzzle = solver.validate(puzzle);
      if (checkPuzzle instanceof Error) {
         return res.json({ error: checkPuzzle.message });
      }
      const result = solver.solve(puzzle);
      if (result instanceof Error) {
         return res.json({ error: result.message });
      }
      return res.json({ solution: result });
   });
};
