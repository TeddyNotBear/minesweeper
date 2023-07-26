#[system]
mod start {
    use dojo::world::Context;
    use traits::Into;
    use starknet::get_block_timestamp;
    use starknet::ContractAddress;

    use save_the_quacks::components::grid::Grid;
    use save_the_quacks::components::square::Square;
    use save_the_quacks::components::mine::Mine;
    use save_the_quacks::components::moves::Moves;
    use save_the_quacks::components::neighbors::Neighbors;
    use save_the_quacks::components::level::{Level, Difficulty};

    use save_the_quacks::constants::{
        BEGINNER_WIDTH, BEGINNER_HEIGHT, BEGINNER_MINES,
        INTERMEDIATE_WIDTH, INTERMEDIATE_HEIGHT, INTERMEDIATE_MINES,
        EXPERT_WIDTH, EXPERT_HEIGHT, EXPERT_MINES,
    };

    fn execute(ctx: Context, difficulty_level: Difficulty) -> (u32, ContractAddress) {
        let grid_id = ctx.world.uuid();
        let player_id = ctx.origin;
        let (width, height, mines) = match difficulty_level {
            Difficulty::Beginner(()) => (BEGINNER_WIDTH, BEGINNER_HEIGHT, BEGINNER_MINES),
            Difficulty::Intermediate(()) => (INTERMEDIATE_WIDTH, INTERMEDIATE_HEIGHT, INTERMEDIATE_MINES),
            Difficulty::Expert(()) => (EXPERT_WIDTH, EXPERT_HEIGHT, EXPERT_MINES),
        };

        set! (
            ctx.world,
            player_id.into(),
            (Grid {
                grid_id,
                width,
                height,
                start_time: get_block_timestamp(),
                player_id,
            })
        );

        set! (
            ctx.world, 
            (player_id, grid_id).into(), 
            (Level { 
                difficulty: difficulty_level 
            },
            Mine {
                remaining: mines,
            },
            Moves {
                counter: 0_u16,
            })
        );

        let mut idx: u16 = 0_u16;
        loop {
            if idx == width * height {
                break;
            };
            let mut x: u16 = idx % width;
            let mut y: u16 = idx / height;

            set! (
                ctx.world,
                (grid_id, x, y).into(),
                (Square {
                    x: x,
                    y: y,
                    hidden: true,
                    mine: false,
                    flag: false,
                },
                Neighbors {
                    count: 0_u8,
                })
            );

            idx += 1_u16;
        };
        (grid_id, player_id)
    }
}