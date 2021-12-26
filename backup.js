/* 

solve(puzzleString) {
      const puzzleArray = puzzleString.split("");
      //split puzzle into nine array, each array contain nine element.
      const puzzlePool = {
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

      const finalResult = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].reduce(
         (result, rowTag) => {
            let targetRowArray = puzzlePool[rowTag].slice();
            let tmpResult = result.slice();
            let addedNumArray = []; // [{location, addedNum, cases}]

            // loop through every col in target row
            let x = 0;
            while (x < targetRowArray.length) {
               let reset = false;
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
                        location: String(x + 1),
                        addedNum: possibleNum[0],
                        cases:
                           possibleNum.length === 1 ? [] : possibleNum.slice(1),
                     });
                  }
               }
               //increase x
               x++;
               if (
                  x === 9 &&
                  targetRowArray.includes(".") &&
                  addedNumArray.length > 0
               ) {
                  let endCondition = false;
                  //get the next of possible num of the last added num position. then update the added num array.
                  // clean added num array to get items hat have more than one possible num.
                  addedNumArray = addedNumArray.filter(
                     (item) => item.cases.length > 0
                  );
                  console.log(`RowTag ${rowTag}`, addedNumArray);
                  if (addedNumArray.length > 0) {
                     if (addedNumArray[0].cases.length > 0) {
                        const lastAddedNum =
                           addedNumArray[addedNumArray.length - 1];
                        const nextPossibleNum = lastAddedNum.cases[0];
                        const nextPossibleNumPosition = lastAddedNum.location;
                        const newPossibleNumCases =
                           lastAddedNum.cases.length === 1
                              ? []
                              : lastAddedNum.cases.slice(1);
                        addedNumArray[addedNumArray.length - 1] = {
                           location: nextPossibleNumPosition,
                           addedNum: nextPossibleNum,
                           cases: newPossibleNumCases,
                        };

                        //update targetRowArray and tmpResult.
                        const tmpArr = backupPuzzlePool[rowTag].slice();
                        addedNumArray.forEach(({ location, addedNum }) => {
                           tmpArr[parseInt(location) - 1] = addedNum;
                        });
                        targetRowArray = tmpArr;
                        puzzlePool[rowTag] = tmpArr;
                        tmpResult = Object.keys(puzzlePool)
                           .map((key) => puzzlePool[key])
                           .flat()
                           .join("");

                        //reset x
                        x = 0;
                     }
                  }
               }
            }

            return tmpResult;
         },
         puzzleString
      );
      console.log(finalResult);
      return finalResult.includes(".")
         ? new Error("Puzzle cannot be solved")
         : finalResult;
   }
*/
