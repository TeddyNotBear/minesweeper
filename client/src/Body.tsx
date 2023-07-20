import { useEffect, useState } from "react";
import { KATANA_ACCOUNT_1_ADDRESS, setupNetwork } from "./dojo/setupNetwork";
import { Button, Center, VStack } from "@chakra-ui/react";
import Grid, { SquareData } from "./components/Grid";
import { GridType, SquareType, parseRawCalldataAsGrid, parseRawCalldataAsSquare } from "./types/components";

enum Stage {
	Idle,
	Playing,
	End,
}

enum Difficulty {
    Beginner = 64,
    Intermediate = 256,
    Expert = 480,
}

export enum EndState {
	Success,
	Failure,
}

function Body() {
    const [gameLoopWorker, setGameLoopWorker] = useState<Worker | null>(null);

    const [endState, setEndState] = useState<EndState | null>(null);
    const [stage, setStage] = useState<Stage>(Stage.Idle);
	// stores the game id for the current game
	const [gameId, setGameId] = useState(0);
    const [squares, setSquares] = useState<SquareData[]>([]);

    // Handler for resetting the game state when
	// the game is over and the user wants to play again.
	const onNewGame = function () {
		setStage(Stage.Playing);
        setSquares([
			{
				x: 0,
				y: 0,
				hidden: true,
				mine: false,
				flag: false,
			},
		]);
	};

    // Handler for resetting the game state.
	const onResetGame = function () {
		setGameId((prev) => prev + 1);
		setStage(Stage.Idle);
		setEndState(null);
	};

    // Handler for starting a new game.
	// A game is identified by the game id.
    const onStartGame = function () {
		setupNetwork()
			.execute("start", [])
			.then(onNewGame)
			.catch((error) => {
				console.log(error);
			});
	};

    // Grid = 1198680420
	const onFetchGrid = function (callback: (grid: GridType) => void) {
		setupNetwork()
			.call("entity", ["1198680420", KATANA_ACCOUNT_1_ADDRESS, 0n, 0n])
			.then((result) => {
				const data = result as string[];
				console.log("raw", data);
				callback(parseRawCalldataAsGrid(data));
			})
			.catch((error) => {
				console.log("error on fetching grid", error);
			});
	};

    // Square = 91746765730405
    const onFetchSquare = function (square_idx: number, callback: (square: SquareType) => void) {
		setupNetwork()
			.call_execute(["91746765730405", [KATANA_ACCOUNT_1_ADDRESS, gameId, square_idx]])
			.then((result) => {
				console.log("result", result);

				/*const data = result as string[];
				console.log("raw", data);
				callback(parseRawCalldataAsSquare(data));*/
			})
			.catch((error) => {
				console.log("error on fetching square", error);
			});
	};

    // Hanlder for adding more rows to the table.
	const onAddSquare = function (data: SquareData) {
		setSquares((squares) => [...squares, data]);
	};

    // Fetch World uuid
    useEffect(() => {
        /*setupNetwork()
            .call("uuid", [])
            .then((result) => {
                const data = result as string;
                setGameId(parseInt(BigInt(data).toString()));
            })
            .catch((error) => {
                console.log("error in fetching World uuid", error);
            });*/
    }, []);

    useEffect(() => {
		console.log("stage", stage);
	}, [stage]);

	useEffect(() => {
		console.log("game id", gameId);
	}, [gameId]);

    // Initialize the game loop
	useEffect(() => {
        onFetchGrid((grid) => {});
		// Listen for messages from the worker
        /*for (let square_idx = 0; square_idx < Difficulty.Beginner; square_idx++) {
            onFetchSquare(square_idx, (square) => {
                onAddSquare({
                    x: square.x,
                    y: square.y,
                    hidden: square.hidden,
                    mine: square.mine,
                    flag: square.flag,
                });
            }); 
            console.log(square_idx);
        }*/
	}, []);

	return (
		<div className="">
			{/* this is where u put all the main components */}

			{stage === Stage.Idle && (
				<Center>
					<Button onClick={() => onStartGame()}>
						Start
					</Button>
				</Center>
			)}

			{stage !== Stage.Idle && (
				<VStack>
					<Grid squares={squares} />
				</VStack>
			)}

			{stage == Stage.Playing && (
				<></>
			)}

			{stage === Stage.End && (
				<Button onClick={() => onResetGame()}>
					Retry
				</Button>
			)}
		</div>
	);
}

export default Body;