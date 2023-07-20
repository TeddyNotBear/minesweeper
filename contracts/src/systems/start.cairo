#[system]
mod start {
    use dojo::world::Context;
    use minesweeper::components::grid::Grid;
    use minesweeper::components::square::Square;
    use minesweeper::components::mine::Mine;
    use starknet::get_block_timestamp;
    use traits::Into;

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
                        width: 8_u16,
                        height: 8_u16,
                        start: get_block_timestamp(),
                    },
                    Mine {
                        remaining: 10_u8,
                    })
                )
                let mut idx: u16 = 0_u16;
                loop {
                    if idx >= 8_u16 * 8_u16 {
                        break;
                    }

                    set! (
                        ctx.world,
                        (ctx.origin, grid_id, idx).into(),
                        (Square {
                            x: idx % 8_u16,
                            y: idx / 8_u16,
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
                        width: 16_u16,
                        height: 16_u16,
                        start: get_block_timestamp(),
                    },
                    Mine {
                        remaining: 40_u8,
                    })
                )
                let mut idx: u16 = 0_u16;
                loop {
                    if idx >= 16_u16 * 16_u16 {
                        break;
                    }

                    set! (
                        ctx.world,
                        (ctx.origin, grid_id, idx).into(),
                        (Square {
                            x: idx % 16_u16,
                            y: idx / 16_u16,
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
                        width: 30_u16,
                        height: 16_u16,
                        start: get_block_timestamp(),
                    },
                    Mine {
                        remaining: 99_u8,
                    })
                )
                let mut idx: u16 = 0_u16;
                loop {
                    if idx >= 30_u16 * 16_u16 {
                        break;
                    }

                    set! (
                        ctx.world,
                        (ctx.origin, grid_id, idx).into(),
                        (Square {
                            x: idx % 30_u16,
                            y: idx / 16_u16,
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