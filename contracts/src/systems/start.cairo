#[system]
mod start {
    use starknet::ContractAddress;
    use dojo::world::Context;
    use minesweeper::components::grid::Grid;
    use minesweeper::components::square::Square;
    use minesweeper::components::mine::Mine;
    use minesweeper::components::moves::Moves;
    use starknet::get_block_timestamp;
    use traits::Into;

    use minesweeper::constants::{
        BEGINNER_WIDTH, BEGINNER_HEIGHT, BEGINNER_MINES,
        INTERMEDIATE_WIDTH, INTERMEDIATE_HEIGHT, INTERMEDIATE_MINES,
        EXPERT_WIDTH, EXPERT_HEIGHT, EXPERT_MINES,
    };

    #[derive(Serde, Drop)]
    enum Difficulty {
        Beginner: (),
        Intermediate: (),
        Expert: (),
    }

    fn execute(ctx: Context, difficulty_level: Difficulty) -> (u32, ContractAddress) {
        let (grid_id, player_id) = match difficulty_level {
            Difficulty::Beginner(()) => generate(ctx, BEGINNER_WIDTH, BEGINNER_HEIGHT, BEGINNER_MINES),
            Difficulty::Intermediate(()) => generate(ctx, INTERMEDIATE_WIDTH, INTERMEDIATE_HEIGHT, INTERMEDIATE_MINES),
            Difficulty::Expert(()) => generate(ctx, EXPERT_WIDTH, EXPERT_HEIGHT, EXPERT_MINES),
        };
        (grid_id, player_id)
    }

    fn generate(ctx: Context, width: u16, height: u16, mines: u16) -> (u32, ContractAddress) {
        let grid_id = ctx.world.uuid();
        let player_id = ctx.origin;
        set! (
            ctx.world,
            player_id.into(),
            (Grid {
                grid_id: grid_id,
                width: width,
                height: height,
                start_time: get_block_timestamp(),
            },
            Mine {
                remaining: mines,
            },
            Moves {
                counter: 0_u16,
            })
        )
        let mut idx: u16 = 0_u16;
        loop {
            if idx >= width * height {
                break;
            }
            let x = idx % width;
            let y = idx / height;
            set! (
                ctx.world,
                (player_id, x, y).into(),
                (Square {
                    x: x,
                    y: y,
                    hidden: true,
                    mine: false,
                    flag: false,
                })
            );

            idx += 1_u16;
        }
        (grid_id, player_id)
    }
}