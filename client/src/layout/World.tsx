import GridComponent from "../components/GridComponent";
import { Difficulty } from "../types";
import Header from "../components/Header";

import logo from '../assets/Duck.png';
import ModalComponent from "../components/ModalComponent";

export const World = () => {

  return (
    <div className="container mx-auto">
        <div className="flex flex-col items-center">
            <div>
                <img className="w-96" src={logo} alt="logo" />
            </div>
            <div className="flex flex-col gap-4">
                <GridComponent difficulty_level={Difficulty.Beginner} />
                <GridComponent difficulty_level={Difficulty.Intermediate} />
                <GridComponent difficulty_level={Difficulty.Expert} />
            </div>
            <a className="text-white font-light text-sm pt-4" href="">How to play ?</a>
        </div>
    </div>
  );
};