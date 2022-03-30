"use script";


function solve(boardstring){
  
  console.log("working solve")
    var boardarray=boardstring.split("");
  
    if(boardisvalid(boardarray)){
      console.log("working")
       return(recursivesolve(boardstring));
    }
    else
    return false;
}
function recursivesolve(boardstring){
  var boardarray=boardstring.split("");
  if (boardIsSolved(boardarray)) {
    
    return boardarray.join("");
  }
  var cellPossibilities = getNextCellAndPossibilities(boardarray);
  var nextUnsolvedCellIndex = cellPossibilities.index;
  var possibilities = cellPossibilities.choices;
 
  for (var i = 0; i < possibilities.length; i++) {
    boardarray[nextUnsolvedCellIndex] = possibilities[i];
     solvedBoard = recursivesolve(boardarray.join(""));
    if (solvedBoard) {
     
      return solvedBoard;
    }
  }
 
  return false;
}
//function boardIsInvalid(boardArray) {
  //return !boardissvalid(boardArray);
//}
function boardIsSolved(boardarray) {
  for (var i = 0; i < boardarray.length; i++) {
    if (boardarray[i] === "-") {
      return false;
    }
  }
  return true;
}

function getNextCellAndPossibilities(boardarray) {
  for (var i = 0; i < boardarray.length; i++) {
    if (boardarray[i] === "-") {
      var existingValues = getAllIntersections(boardarray, i);
      
      var choices = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(function (num) {
        return existingValues.indexOf(num) < 0;
      });
      return { index: i, choices: choices };
    }
  }
}

function getAllIntersections(boardarray, i) {
  return getrow(boardarray, i).concat(getcol(boardarray, i)).concat(getbox(boardarray, i));
}

function boardisvalid(boardarray){
  console.log(rowisvalid(boardarray));
  console.log(colisvalid(boardarray));
  console.log(boxisvalid(boardarray));
  
    if(rowisvalid(boardarray)&&colisvalid(boardarray)&&boxisvalid(boardarray)){
        return true;

    }
    else
    return false;
}
function rowisvalid(boardarray){
 
    return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
        return getrow(boardarray, i);
      }).reduce (function(validity,row){
return(collectionisvalid(row)&&validity);
      },true);

}
function colisvalid(boardarray){
   return[ 0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
        return getcol(boardarray, i);
      }).reduce (function(validity,row){
return(collectionisvalid(row)&&validity);
      },true);
}
function boxisvalid(boardarray){
   return [0, 3, 6, 27, 30, 33, 54, 57, 60].map(function (i) {
    return getbox(boardarray, i);
  }).reduce (function(validity,row){
return(collectionisvalid(row)&&validity);
  },true);
}
function getrow(boardarray,i){
 
  var startingEl = Math.floor(i / 9) * 9;
    return boardarray.slice(startingEl, startingEl + 9);
}

function getbox(boardarray,i){
  var boxCol = Math.floor(i / 3) % 3;
    var boxRow = Math.floor(i / 27);
    var startingIndex = boxCol * 3 + boxRow * 27;
    return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(function (num) {
      return boardarray[startingIndex + num];
    });
}
function getcol (boardarray,i){
  var startingEl = Math.floor(i % 9);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (num) {
      return boardarray[startingEl + num * 9];
    });
    
}
function collectionisvalid(collection){
  var str={};
  for(var i=0;i<collection.length;i++){
    if(collection[i]!="-"){
      if(str[collection[i]]===undefined){
        str[collection[i]]=1;
      }
      else{
return false
      }
    }

  }
return true;
}


