import { Leva } from "leva";
import { Redirect } from "wouter";
import GridComponent from "../components/GridComponent";
import { Difficulty } from "../types";

export const World = () => {

  return (
    <div className="">
        <GridComponent difficulty_level={Difficulty.Beginner} />
    </div>
  );
};