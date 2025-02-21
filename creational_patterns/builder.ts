// Learning:
// ---------
// - Builder pattern with Director

// compile and run from cli:
// tsc builder.ts --lib dom,es6 && node builder.js

type Row = Array<number>;
type Matrix = Array<Row>;

class MatrixIterator {
    private matrix:Matrix;
    private _rowIndex:number = 0;

    set rowIndex(index:number) {
        if (index > this.matrix.length) {
            this._rowIndex = this.matrix.length;
        } else if (index < 0) {
            this._rowIndex = 0;
        } else {
            this._rowIndex = index;
        }
    }

    get rowIndex() {
        return this._rowIndex;
    }

    deepCopyMatrix(matrix:Matrix) {
        this.matrix = matrix.map(row => row.slice());
    }

    constructor(matrix:Matrix) {
        this.deepCopyMatrix(matrix);
    }

    next():Row | null {
        if (this.rowIndex < this.matrix.length) {
            return this.matrix[this.rowIndex++];
        }
        return null;
    }
}

class BitStringBuilder {
    private _bitString:string = '';

    get bitString() {
        return this._bitString;
    }

    appendToBitString(row:Row, separator:string = '') {
        const bitString = row.join('');
        this._bitString += separator + bitString;
    }

    getNextRow(matrix:MatrixIterator):Row | null {
        return matrix.next();
    }

    getFirstRow(matrix:MatrixIterator):Row | null {
        matrix.rowIndex = 0;
        return this.getNextRow(matrix);
    }

    getLastRow(matrix:MatrixIterator):Row {
        let row:Row = [];
        while (matrix.next()) {
            row = matrix.next() || [];
        }
        return row;
    }
}

interface ColRange {
    start:number;
    length:number;
}

abstract class BitStringDirector {
    private static _buildBitString(matrix:Matrix, colRanges:Array<ColRange>):string {
        const iterator = new MatrixIterator(matrix);
        const builder = new BitStringBuilder();
        let row = builder.getFirstRow(iterator);

        let colRange = colRanges.shift();
        
        while (row) {
            if (!colRange) throw new Error("No column range provided");

            const slice = row.slice(colRange.start, colRange.start + colRange.length);
            builder.appendToBitString(slice, ' ');
            row = builder.getNextRow(iterator);

            colRange = colRanges.shift();
        }
        return builder.bitString;
    }

    static buildBitString(matrix:Matrix):string {
        const colRanges:Array<ColRange> = [];
        matrix.forEach(row => {
            colRanges.push({start: 0, length: row.length});
        });

        return this._buildBitString(matrix, colRanges);
    }

    static buildLTBitString(matrix:Matrix):string {
        const colRanges:Array<ColRange> = [];
        let length = 1;
        matrix.forEach(row => {
            colRanges.push({start: 0, length});
            length++;
        });

        return this._buildBitString(matrix, colRanges);
    }

    static buildDiagonalBitString(matrix:Matrix):string {
        const colRanges:Array<ColRange> = [];
        let start = 0;
        matrix.forEach(row => {
            colRanges.push({start, length: 1});
            start++;
        });

        return this._buildBitString(matrix, colRanges);
    }
}

// Driver

const matrix:Matrix = [
    [0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0]
]

const bitString = BitStringDirector.buildBitString(matrix); 
console.log("bitString:", bitString);

const LTBitString = BitStringDirector.buildLTBitString(matrix);
console.log("Lower Triangle BitString:", LTBitString);

const diagonalBitString = BitStringDirector.buildDiagonalBitString(matrix);
console.log("Diagonal BitString:", diagonalBitString);