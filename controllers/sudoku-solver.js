class SudokuSolver {
   validate(puzzleString) {
      const regexValidPuzzle = /^[\d.]+$/;
      if (puzzleString.length !== 81) {
         return new Error("Expected puzzle to be 81 characters long");
      }
      if (!regexValidPuzzle.test(puzzleString)) {
         return new Error("Invalid characters in puzzle");
      }
      return true;
   }

   checkRowPlacement(puzzleString, row, column, value) {
      const puzzleArray = puzzleString.split("");
      //split puzzle into nine array, each array contain nine element.
      const puzzleA = puzzleArray.slice(0, 9);
      const puzzleB = puzzleArray.slice(9, 18);
      const puzzleC = puzzleArray.slice(18, 27); // 19,20,21,22,23,24,25,26,27,28

      const puzzleD = puzzleArray.slice(27, 36);
      const puzzleE = puzzleArray.slice(36, 45);
      const puzzleF = puzzleArray.slice(45, 54);

      const puzzleG = puzzleArray.slice(54, 63);
      const puzzleH = puzzleArray.slice(63, 72);
      const puzzleI = puzzleArray.slice(72);
      const puzzlePool = {
         A: puzzleA,
         B: puzzleB,
         C: puzzleC,
         D: puzzleD,
         E: puzzleE,
         F: puzzleF,
         G: puzzleG,
         H: puzzleH,
         I: puzzleI,
      };
      const targetRow = puzzlePool[row];
      if (/\d/.test(targetRow[column - 1])) {
         return !targetRow
            .filter((item) => item !== targetRow[column - 1])
            .includes(value);
      } else {
         return !targetRow.includes(value);
      }
   }

   checkColPlacement(puzzleString, row, column, value) {
      const puzzleArray = puzzleString.split("");
      //split puzzle into nine array, each array contain nine element.
      const puzzleA = puzzleArray.slice(0, 9);
      const puzzleB = puzzleArray.slice(9, 18);
      const puzzleC = puzzleArray.slice(18, 27);

      const puzzleD = puzzleArray.slice(27, 36);
      const puzzleE = puzzleArray.slice(36, 45);
      const puzzleF = puzzleArray.slice(45, 54);

      const puzzleG = puzzleArray.slice(54, 63);
      const puzzleH = puzzleArray.slice(63, 72);
      const puzzleI = puzzleArray.slice(72);
      const targetColumn = {
         A: puzzleA[parseInt(column - 1)],
         B: puzzleB[parseInt(column - 1)],
         C: puzzleC[parseInt(column - 1)],
         D: puzzleD[parseInt(column - 1)],
         E: puzzleE[parseInt(column - 1)],
         F: puzzleF[parseInt(column - 1)],
         G: puzzleG[parseInt(column - 1)],
         H: puzzleH[parseInt(column - 1)],
         I: puzzleI[parseInt(column - 1)],
      };
      if (/\d/.test(targetColumn[row])) {
         return !Object.keys(targetColumn)
            .map((key) =>
               targetColumn[key] === value ? null : targetColumn[key]
            )
            .includes(value);
      } else {
         return !Object.keys(targetColumn).some(
            (key) => targetColumn[key] === value
         );
      }
   }

   checkRegionPlacement(puzzleString, row, column, value) {
      const puzzleArray = puzzleString.split("");
      //split puzzle into nine array, each array contain nine element.
      const puzzleA = puzzleArray.slice(0, 9);
      const puzzleB = puzzleArray.slice(9, 18);
      const puzzleC = puzzleArray.slice(18, 27);

      const puzzleD = puzzleArray.slice(27, 36);
      const puzzleE = puzzleArray.slice(36, 45);
      const puzzleF = puzzleArray.slice(45, 54);

      const puzzleG = puzzleArray.slice(54, 63);
      const puzzleH = puzzleArray.slice(63, 72);
      const puzzleI = puzzleArray.slice(72);

      //create a nine group based on nine splitted puzzle
      const groupValue = {
         group1: [
            puzzleA[0],
            puzzleA[1],
            puzzleA[2],
            puzzleB[0],
            puzzleB[1],
            puzzleB[2],
            puzzleC[0],
            puzzleC[1],
            puzzleC[2],
         ],
         group2: [
            puzzleA[3],
            puzzleA[4],
            puzzleA[5],
            puzzleB[3],
            puzzleB[4],
            puzzleB[5],
            puzzleC[3],
            puzzleC[4],
            puzzleC[5],
         ],
         group3: [
            puzzleA[6],
            puzzleA[7],
            puzzleA[8],
            puzzleB[6],
            puzzleB[7],
            puzzleB[8],
            puzzleC[6],
            puzzleC[7],
            puzzleC[8],
         ],

         group4: [
            puzzleD[0],
            puzzleD[1],
            puzzleD[2],
            puzzleE[0],
            puzzleE[1],
            puzzleE[2],
            puzzleF[0],
            puzzleF[1],
            puzzleF[2],
         ],
         group5: [
            puzzleD[3],
            puzzleD[4],
            puzzleD[5],
            puzzleE[3],
            puzzleE[4],
            puzzleE[5],
            puzzleF[3],
            puzzleF[4],
            puzzleF[5],
         ],
         group6: [
            puzzleD[6],
            puzzleD[7],
            puzzleD[8],
            puzzleE[6],
            puzzleE[7],
            puzzleE[8],
            puzzleF[6],
            puzzleF[7],
            puzzleF[8],
         ],

         group7: [
            puzzleG[0],
            puzzleG[1],
            puzzleG[2],
            puzzleH[0],
            puzzleH[1],
            puzzleH[2],
            puzzleI[0],
            puzzleI[1],
            puzzleI[2],
         ],
         group8: [
            puzzleG[3],
            puzzleG[4],
            puzzleG[5],
            puzzleH[3],
            puzzleH[4],
            puzzleH[5],
            puzzleI[3],
            puzzleI[4],
            puzzleI[5],
         ],
         group9: [
            puzzleG[6],
            puzzleG[7],
            puzzleG[8],
            puzzleH[6],
            puzzleH[7],
            puzzleH[8],
            puzzleI[6],
            puzzleI[7],
            puzzleI[8],
         ],
      };
      //create a group for location info
      const groupInfo = {
         group1: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
         group2: ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"],
         group3: ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"],

         group4: ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"],
         group5: ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"],
         group6: ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"],

         group7: ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"],
         group8: ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"],
         group9: ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"],
      };
      const keyGroup = Object.keys(groupInfo).find((key) =>
         groupInfo[key].includes(row + column)
      );
      const targetGroup = groupValue[keyGroup];
      const indexTargetValue = groupInfo[keyGroup].indexOf(row + column);
      if (/\d/.test(targetGroup[indexTargetValue])) {
         return targetGroup[indexTargetValue] === value
            ? true
            : !targetGroup
                 .filter((item) => item !== targetGroup[indexTargetValue])
                 .includes(value);
      } else {
         return !targetGroup.includes(value);
      }
   }

   solve(puzzleString) {
      const puzzleArray = puzzleString.split("");
      let initialPuzzleString = puzzleString.slice();
      //split puzzle into nine array, each array contain nine element.
      let puzzlePool = {
         A: puzzleArray.slice(0, 9),
         B: puzzleArray.slice(9, 18),
         C: puzzleArray.slice(18, 27),
         D: puzzleArray.slice(27, 36),
         E: puzzleArray.slice(36, 45),
         F: puzzleArray.slice(45, 54),
         G: puzzleArray.slice(54, 63),
         H: puzzleArray.slice(63, 72),
         I: puzzleArray.slice(72),
      };
      const backupPuzzlePool = {
         A: puzzleArray.slice(0, 9),
         B: puzzleArray.slice(9, 18),
         C: puzzleArray.slice(18, 27),
         D: puzzleArray.slice(27, 36),
         E: puzzleArray.slice(36, 45),
         F: puzzleArray.slice(45, 54),
         G: puzzleArray.slice(54, 63),
         H: puzzleArray.slice(63, 72),
         I: puzzleArray.slice(72),
      };

      let addedNumArray = []; // [{location, addedNum, cases}]
      let finalResult;
      while (true) {
         finalResult = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].reduce(
            (result, rowTag) => {
               let targetRowArray = puzzlePool[rowTag].slice();
               let tmpResult = result.slice();

               // loop through every col in target row
               for (let x = 0; x < targetRowArray.length; x++) {
                  let possibleNum = [];
                  let targetSpot = targetRowArray[x];
                  //if spot already filled. then skip it
                  if (targetSpot === ".") {
                     //iterate to find a suitable number for target spot
                     for (let i = 1; i <= 9; i++) {
                        const checkRow = this.checkRowPlacement(
                           tmpResult,
                           rowTag,
                           String(x + 1),
                           String(i)
                        );
                        if (!checkRow) {
                           continue;
                        }
                        const checkCol = this.checkColPlacement(
                           tmpResult,
                           rowTag,
                           String(x + 1),
                           String(i)
                        );
                        if (!checkCol) {
                           continue;
                        }
                        const checkRegion = this.checkRegionPlacement(
                           tmpResult,
                           rowTag,
                           String(x + 1),
                           String(i)
                        );
                        if (!checkRegion) {
                           continue;
                        }
                        //if pass all the condition, put possible num into possibleNum array
                        possibleNum.push(String(i));
                     }

                     if (possibleNum.length > 0) {
                        //update targetRowArray and tmpResult with the first possible num.
                        targetRowArray[x] = possibleNum[0];
                        puzzlePool[rowTag] = targetRowArray;
                        tmpResult = Object.keys(puzzlePool)
                           .map((key) => puzzlePool[key])
                           .flat()
                           .join("");

                        //update addedNumArray with the added num and the remaining of the possible num.
                        addedNumArray.push({
                           location: `${rowTag}${String(x + 1)}`,
                           addedNum: possibleNum[0],
                           cases:
                              possibleNum.length === 1
                                 ? []
                                 : possibleNum.slice(1),
                        });
                     } else {
                        addedNumArray.push({
                           location: `${rowTag}${String(x + 1)}`,
                           addedNum: targetSpot,
                           cases: [],
                        });
                     }
                  }
               }

               return tmpResult;
            },
            initialPuzzleString
         );

         if (finalResult.includes(".")) {
            //get the next of possible num of the last added num position. then update the added num array.
            //index of first empty spot
            const firstEmptySpotIndex = addedNumArray.findIndex(
               (item) => item.addedNum === "."
            );
            const lastAddedNum = addedNumArray
               .slice(0, firstEmptySpotIndex + 1)
               .reverse()
               .find((item) => item.cases.length > 0);
            if (!lastAddedNum) {
               break;
            }
            const nextPossibleNum = lastAddedNum.cases[0];
            const nextPossibleNumPosition = lastAddedNum.location;
            const newPossibleNumCases =
               lastAddedNum.cases.length === 1
                  ? []
                  : lastAddedNum.cases.slice(1);
            const indexRestart = addedNumArray.findIndex(
               (item) => item.location === nextPossibleNumPosition
            );
            addedNumArray[indexRestart] = {
               location: nextPossibleNumPosition,
               addedNum: nextPossibleNum,
               cases: newPossibleNumCases,
            };
            //remove all added num after restart index.
            addedNumArray = addedNumArray.slice(0, indexRestart + 1);

            //update initial puzzle string
            const tmpPuzzleBool = JSON.parse(JSON.stringify(backupPuzzlePool));
            addedNumArray.forEach(({ location, addedNum }) => {
               const [row, col] = location.split("");
               tmpPuzzleBool[row][parseInt(col) - 1] = addedNum;
            });
            puzzlePool = tmpPuzzleBool;
            initialPuzzleString = Object.keys(puzzlePool)
               .map((key) => puzzlePool[key])
               .flat()
               .join("");
         } else {
            break;
         }
      }
      return finalResult.includes(".")
         ? new Error("Puzzle cannot be solved")
         : finalResult;
   }
}

module.exports = SudokuSolver;
