#[system]
mod start {
    use dojo::world::Context;
    use minesweeper::components::grid::Grid;
    use minesweeper::components::square::Square;
    use minesweeper::components::mine::Mine;
    use starknet::get_block_timestamp;
    use traits::Into;

    const BEGINNER_WIDTH: u16 = 8_u16;
    const BEGINNER_HEIGHT: u16 = 8_u16;
    const BEGINNER_MINES: u8 = 10_u8;

    const INTERMEDIATE_WIDTH: u16 = 16_u16;
    const INTERMEDIATE_HEIGHT: u16 = 16_u16;
    const INTERMEDIATE_MINES: u8 = 40_u8;

    const EXPERT_WIDTH: u16 = 30_u16;
    const EXPERT_HEIGHT: u16 = 16_u16;
    const EXPERT_MINES: u8 = 99_u8;

    #[derive(Serde, Drop)]
    enum Difficulty {
        Beginner: (),
        Intermediate: (),
        Expert: (),
    }

    fn execute(ctx: Context, difficulty_level: Difficulty) -> u32 {
        let grid_id = ctx.world.uuid();
        match difficulty_level{
            Difficulty::Beginner(())=>{
                set! (
                    ctx.world,
                    ctx.origin.into(),
                    (Grid {
                        grid_id: grid_id,
                        width: BEGINNER_WIDTH,
                        height: BEGINNER_HEIGHT,
                        start: get_block_timestamp(),
                    },
                    Mine {
                        remaining: BEGINNER_MINES,
                    })
                )
                let mut idx: u16 = 0_u16;
                loop {
                    if idx >= BEGINNER_WIDTH * BEGINNER_HEIGHT {
                        break;
                    }

                    set! (
                        ctx.world,
                        (ctx.origin, grid_id, idx).into(),
                        (Square {
                            x: idx % BEGINNER_WIDTH,
                            y: idx / BEGINNER_HEIGHT,
                            hidden: true,
                            mine: false,
                            flag: false,
                        })
                    )

                    idx += 1_u16;
                }
            },
            Difficulty::Intermediate(()) =>{
                set! (
                    ctx.world,
                    ctx.origin.into(),
                    (Grid {
                        grid_id: grid_id,
                        width: INTERMEDIATE_WIDTH,
                        height: INTERMEDIATE_HEIGHT,
                        start: get_block_timestamp(),
                    },
                    Mine {
                        remaining: BEGINNER_MINES,
                    })
                )
                let mut idx: u16 = 0_u16;
                loop {
                    if idx >= INTERMEDIATE_WIDTH * INTERMEDIATE_HEIGHT {
                        break;
                    }

                    set! (
                        ctx.world,
                        (ctx.origin, grid_id, idx).into(),
                        (Square {
                            x: idx % INTERMEDIATE_WIDTH,
                            y: idx / INTERMEDIATE_HEIGHT,
                            hidden: true,
                            mine: false,
                            flag: false,
                        })
                    )

                    idx += 1_u16;
                }
            },
            Difficulty::Expert(()) =>{
                set! (
                    ctx.world,
                    ctx.origin.into(),
                    (Grid {
                        grid_id: grid_id,
                        width: EXPERT_WIDTH,
                        height: EXPERT_HEIGHT,
                        start: get_block_timestamp(),
                    },
                    Mine {
                        remaining: EXPERT_MINES,
                    })
                )
                let mut idx: u16 = 0_u16;
                loop {
                    if idx >= EXPERT_WIDTH * EXPERT_HEIGHT {
                        break;
                    }

                    set! (
                        ctx.world,
                        (ctx.origin, grid_id, idx).into(),
                        (Square {
                            x: idx % EXPERT_WIDTH,
                            y: idx / EXPERT_HEIGHT,
                            hidden: true,
                            mine: false,
                            flag: false,
                        })
                    )

                    idx += 1_u16;
                }
            }
        }
        grid_id
    }
}