import { useDojo } from "../DojoContext";
import { Utils } from '@dojoengine/core';
import { Difficulty, Square } from "../types";
import { getComponentValue } from "@latticexyz/recs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import flag from '../assets/DuckFlag.png';
import { KATANA_ACCOUNT_1_ADDRESS } from "../dojo/setupNetwork";

function GridComponent() {
	const { grid_id } = useParams();

    const [squares, setSquares] = useState<Square[]>([]);
    const [level, setLevel] = useState<any>();
	const [clickedSquares, setClickedSquares] = useState(Array(squares.length).fill(false));
    const player_id = BigInt(KATANA_ACCOUNT_1_ADDRESS);

	const {
		systemCalls: { add_flag },
        components: { Square, Level },
    } = useDojo();

	const handleSquareClick = (index: number, square: Square) => {
		const updatedClickedSquares = [...clickedSquares];
		updatedClickedSquares[index] = !updatedClickedSquares[index]; // Toggle the state
		setClickedSquares(updatedClickedSquares);
		console.log(square);
		add_flag({ grid_id: grid_id!, x: square.x, y: square.y });
	};

	useEffect(() => {
		let level: any = getComponentValue(Level, Utils.getEntityIdFromKeys([player_id, BigInt(grid_id!)]));
		const difficulty_level = level.difficulty == 0 ? 'Beginner' : level == 1 ? 'Intermediate' : 'Expert';
		setLevel(difficulty_level);
		let squares: any[] = [];
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                let square = getComponentValue(Square, Utils.getEntityIdFromKeys([BigInt(grid_id!), BigInt(x), BigInt(y)]));
                squares.push(square);
            }
        }
        setSquares(squares);
    }, []);

	return (
		<div className="">
			{ level && <h1 className="text-4xl font-bold mb-4">{level}</h1> }
			{ squares.length > 0 && 
                <div className="grid grid-cols-8 gap-1">
                    {squares.map((square, index) => {
                        return (
                            <div key={index} 
								onClick={() => handleSquareClick(index, square)} 
								className={`${clickedSquares[index] ? 'bg-image-url' : ''} bg-[#4e3a6a] w-16 h-16 text-white rounded-sm cursor-pointer hover:bg-[#f6d16f]`}
							>
								{clickedSquares[index] ? <img src={flag} alt="Square" /> : index}
                            </div>
                        );
                    })}
                </div>
            }
		</div>
	);
}

export default GridComponent;