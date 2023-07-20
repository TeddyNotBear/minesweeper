import { Box, Card, Divider, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

type GridProps = GridData;
type SquareProps = SquareData;

export interface GridData {
    grid_id: number;
    width: number;
    height: number;
    start: number;
}

export type SquareData = {
	x: number;
	y: number;
	hidden: boolean;
	mine: boolean;
	flag: boolean;
}

interface Props {
    squares: SquareData[];
}

function Title() {
    return ( 
        <>
        </>
    );
}

export function Square({ x, y/*, hidden, mine, flag*/ }: SquareProps) {
	return (
        <Box w='40px' h='40px' bg='pink.100'>{x},{y}</Box>
	);
}

function Grid({ squares }: Props) {
	return (
        <div>
            {squares.map((square: SquareProps) => (
                <Square
                    key={square.x + square.y}
                    x={square.x}
                    y={square.y} 
                    hidden={square.hidden} 
                    mine={square.mine} 
                    flag={square.flag}            
                />
            ))}
        </div>
	);
}

export default Grid;

