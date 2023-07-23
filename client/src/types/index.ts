export interface Grid {
	grid_id: number,
	width: number,
	height: number,
	start_time: number,
};

export interface Square {
	x: number,
	y: number,
	hidden: boolean,
	mine: boolean,
	flag: boolean,
};

export enum Difficulty {
	Beginner,
	Intermediate,
	Expert,
}

export interface QueryResult<T> {
    data: T | undefined;
    loading: boolean;
    error: any;
}