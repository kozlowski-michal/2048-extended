import { GameKeys, Tile } from "./structures";

export function makeMatrix<T>(array: T[], rowLength: number): T[][] {
    let matrix: T[][] = [];
    let row: T[] = [];
    array.map( (item, itemIndex) => {
        row.push(item);
        if (itemIndex % rowLength === rowLength - 1) {
            matrix.push(row);
            row = [];
        }
    })
    return matrix;
}

export function makeArray<T>(matrix: T[][]): T[]{
    let array: T[] = [];
    matrix.forEach( (row) => {
        row.forEach((item) =>  array.push(item))
    })
    return array;
}

export function prepareMatrix<T>(matrix: T[][], direction: GameKeys): T[][] {
    switch (direction) {
        case GameKeys.up:
            return matrix;
        case GameKeys.down:
            return reverseRows(matrix);
        case GameKeys.left:
            return transposeMatrix(matrix);
        case GameKeys.right:
            return reverseRows(transposeMatrix(matrix));
    }
}

export function unprepareMatrix<T>(matrix: T[][], direction: GameKeys): T[][] {
    switch (direction) {
        case GameKeys.up:
            return matrix;
        case GameKeys.down:
            return reverseRows(matrix);
        case GameKeys.left:
            return transposeMatrix(matrix);
        case GameKeys.right:
            return transposeMatrix(reverseRows(matrix));
    }
}

function reverseRows<T>(matrix: T[][]): T[][] {
    let reversedMatrix: T[][] = [];
    matrix.forEach( (row) => reversedMatrix.unshift(row) );
    return reversedMatrix;
}

function transposeMatrix<T>( matrix: T[][] ): T[][] {
    let transposedMatrix: T[][] = [];
    matrix.forEach( (row) => {
        row.map( (item, itemIndex) => {
            if (!transposedMatrix[itemIndex]) transposedMatrix[itemIndex] = [];
            transposedMatrix[itemIndex].push(item);
        })
    });
    return transposedMatrix;
}

export function findMoveLength(matrix: Tile[][], rowIndex: number, columnIndex: number): number{
    let moveLength: number = 0;
    while ( moveLength < rowIndex) {
        if (matrix[rowIndex - moveLength - 1][columnIndex] === null ) {
            moveLength++;
        }
        else if (
            matrix[rowIndex - moveLength - 1][columnIndex].value === matrix[rowIndex][columnIndex].value && 
            matrix[rowIndex - moveLength - 1][columnIndex].moved === false
        ) {
            moveLength++;
        break;
        }
        else {
            break;
        }
    }
    return moveLength;
}