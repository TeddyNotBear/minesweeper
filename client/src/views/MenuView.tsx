import DifficultyButtonComponent from "../components/DifficultyButtonComponent";
import { Difficulty } from "../types";
import logo from '../assets/Duck.png';

function MenuView() {
    return (
        <div className="flex flex-col items-center">
            <div>
                <img className="w-96" src={logo} alt="logo" />
            </div>
            <div className="flex flex-col gap-4">
                <DifficultyButtonComponent difficulty_level={Difficulty.Beginner} />
                <DifficultyButtonComponent difficulty_level={Difficulty.Intermediate} />
                <DifficultyButtonComponent difficulty_level={Difficulty.Expert} />
            </div>
            <a className="text-white font-light text-sm pt-4" href="">How to play ?</a>
        </div>
    );
}

export default MenuView;

