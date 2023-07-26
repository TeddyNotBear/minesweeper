import { useDojo } from "../DojoContext";
import { Utils } from '@dojoengine/core';
import { Square, SquareWithNeighbors } from "../types";
import { getComponentValue } from "@latticexyz/recs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import flag from '../assets/DuckFlag.png';
import { KATANA_ACCOUNT_1_ADDRESS } from "../dojo/setupNetwork";

function GridComponent() {
	const { grid_id } = useParams();

    const [squares, setSquares] = useState<SquareWithNeighbors[]>([]);
    const [level, setLevel] = useState<any>();
	const [clickedSquares, setClickedSquares] = useState(Array(squares.length).fill(false));
    const player_id = BigInt(KATANA_ACCOUNT_1_ADDRESS);

	const {
		systemCalls: { add_flag, remove_flag, reveal },
        components: { Square, Level, Neighbors },
    } = useDojo();

	const handleSquareClick = (event: any, index: number, square: Square) => {
		let isMac = navigator.userAgent.indexOf('Mac OS X') != -1;
		if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {				
			const updatedClickedSquares = [...clickedSquares];
			const squareAlreadyClicked = updatedClickedSquares[index];
			if (!squareAlreadyClicked) {
			  updatedClickedSquares[index] = true;
			  setClickedSquares(updatedClickedSquares);
			  add_flag({ x: square.x, y: square.y });
			} else {
			  updatedClickedSquares[index] = false;
			  setClickedSquares(updatedClickedSquares);
			  remove_flag({ x: square.x, y: square.y });
			}
		}
		if (event.type === 'click') {
			console.log('reveal');
		}
	};

	useEffect(() => {
		let level: any = getComponentValue(Level, Utils.getEntityIdFromKeys([player_id, BigInt(grid_id!)]));
		console.log(level);
		const difficulty_level = level.difficulty == 0 ? 'Beginner' : level == 1 ? 'Intermediate' : 'Expert';
		setLevel(difficulty_level);
		let squares: SquareWithNeighbors[] | undefined = [];
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                let square = getComponentValue(Square, Utils.getEntityIdFromKeys([BigInt(grid_id!), BigInt(x), BigInt(y)]));
                let neighbors = getComponentValue(Neighbors, Utils.getEntityIdFromKeys([BigInt(grid_id!), BigInt(x), BigInt(y)]));
				if(!square || !neighbors) { return;}
				let squareWithNeighbors: SquareWithNeighbors = {
					x: square.x,
					y: square.y,
					hidden: square.hidden,
					mine: square.mine,
					flag: square.flag,
					count: neighbors.count,
				  };
                squares.push(squareWithNeighbors);
            }
        }
        setSquares(squares);
    }, []);

	return (
		<div className="flex">
			<div>
				{ level && <h1 className="text-4xl font-bold mb-4 text-white">{level}</h1> }
				{ squares.length > 0 && 
					<div className="grid grid-cols-8 gap-1">
						{squares.map((square, index) => {
							console.log(square);
							if (square.hidden) { 
								return (
									<div key={index} 
										onClick={(e: any) => handleSquareClick(e, index, square)} 
										//${clickedSquares[index] || square.flag ? '' : ''}
										className={`bg-[#4e3a6a] w-16 h-16 text-white rounded-sm cursor-pointer hover:bg-[#f6d16f]`}
									>
										{(clickedSquares[index] || square.flag) && square.hidden ? <img src={flag} alt="Square" /> : square.x + ',' + square.y }
									</div>
								);
							} else {
								return (
									<div key={index} className="text-white font-bold flex items-center justify-center text-xl">
										{square.mine ? '💣' : square.count}
									</div>
								);
							}
						}
				)}
					</div>
				}
				<div className="text-white w-full">
					<div className="flex">
						<span className="font-bold">Add a Duck : </span>
						<span className="font-light">Press Command (⌘) + Left Click</span>
					</div>
					<div className="flex">
						<span className="font-bold">Reveal a Square :</span>
						<span className="font-light">Left Click</span>
					</div>
				</div>
			</div>
			<div className="text-white">
			</div>
		</div>
	);
}

export default GridComponent;