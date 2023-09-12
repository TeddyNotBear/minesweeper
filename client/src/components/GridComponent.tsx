import { useDojo } from "../DojoContext";
import { Utils } from '@dojoengine/core';
import { Square, SquareWithNeighbors } from "../types";
import { getComponentValue } from "@latticexyz/recs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import flag from '../assets/DuckFlag.png';
import bomb from '../assets/Bomb.png';
import { KATANA_ACCOUNT_1_ADDRESS } from "../dojo/setupNetwork";

function GridComponent() {
	const { grid_id } = useParams();

    const [squares, setSquares] = useState<SquareWithNeighbors[]>([]);
	const [gameOver, setGameOver] = useState(false);
	const [clickedSquares, setClickedSquares] = useState(Array(squares.length).fill(false));
    const [countClick, setCountClick] = useState<number>(0);
    const player_id = BigInt(KATANA_ACCOUNT_1_ADDRESS);

	const {
		systemCalls: { add_flag, remove_flag, reveal },
        components: { Square, Level, Neighbors },
    } = useDojo();


	let level: any = getComponentValue(Level, Utils.getEntityIdFromKeys([player_id, BigInt(grid_id!)]));
	console.log(level);
	const difficulty_level = level.difficulty == 0 ? 'Beginner' : level == 1 ? 'Intermediate' : 'Expert';

	const handleSquareClick = (event: any, index: number, square: Square) => {
		if (square.hidden && !gameOver) {
			const updatedClickedSquares = [...clickedSquares];
			const squareAlreadyClicked = updatedClickedSquares[index];
			let isMac = navigator.userAgent.indexOf('Mac OS X') != -1;
			if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
				if(!square.flag) {
					if (!squareAlreadyClicked) {
						console.log('add flag');
						updatedClickedSquares[index] = true;
						setClickedSquares(updatedClickedSquares);
						add_flag({ x: square.x, y: square.y });
						setCountClick((prevCount) => prevCount + 1);
						console.log(square);
					} else {
						console.log('remove flag');
						updatedClickedSquares[index] = false;
						setClickedSquares(updatedClickedSquares);
						remove_flag({ x: square.x, y: square.y });
						setCountClick((prevCount) => prevCount + 1);
						console.log(square);
					}
				}
			}
			if (event.type === 'click' && (isMac && !event.metaKey) || (!isMac && !event.ctrlKey)) {
				if (square.mine) {
					setGameOver(true);
				} else {
					console.log('reveal');
					reveal({ x: square.x, y: square.y });
					setCountClick((prevCount) => prevCount + 1);
				}
			}
		}
	};

	useEffect(() => {
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
				<div className="flex justify-between items-center">
					{ difficulty_level && <h1 className="text-4xl font-bold mb-4 text-white">{difficulty_level}</h1> }
				</div>
				{ squares.length > 0 && 
					<div className="grid grid-cols-8 gap-1">
						{squares.map((square, index) => {
							if (square.hidden) { 
								return (
									<div key={index} 
										onClick={(e: any) => handleSquareClick(e, index, square)} 
										//${clickedSquares[index] || square.flag ? '' : ''}
										className={`${gameOver && square.mine ? 'bg-[#e31919] cursor-not-allowed' : 'bg-[#4e3a6a] cursor-pointer hover:bg-[#f6d16f]'} w-16 h-16 text-white rounded-sm' `}
									>
										{(clickedSquares[index] || square.flag) && square.hidden ? <img src={flag} alt="Square" /> : square.x + ',' + square.y }
									</div>
								);
							} else {
								return (
									<div key={index} className={`${gameOver && square.mine ? 'bg-[#e31919] cursor-not-allowed' : '' } text-white font-bold flex items-center justify-center text-xl'`}>
										{square.mine ? <img className="w-12" src={bomb} alt="Square" />  : square.count}
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