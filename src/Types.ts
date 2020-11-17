export type oneBoard = {squares: square};
export type square = fieldValue;
export type fieldValue = "X" | "O"
export type historyBoard = oneStep[];
export type oneStep = {squares: fieldValue[]};
