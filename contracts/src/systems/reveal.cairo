#[system]
mod reveal {
    use dojo::world::Context;
    use save_the_quacks::components::square::{Square, SquareTrait};
    use save_the_quacks::components::grid::Grid;
    use save_the_quacks::components::neighbors::Neighbors;
    use traits::Into;
    use array::ArrayTrait;
    

    fn execute(ctx: Context, x: u16, y: u16) {
        let player_id = ctx.origin;
        let grid: Grid = get! (ctx.world, player_id.into(), Grid);
        assert(grid.player_id == player_id, 'Player does not own grid');
        
        let current_square: Square =  get! (ctx.world, (grid.grid_id, x, y).into(), Square);
        
        let mut neighboring_mines = 0;
        if x >= 0 && y < grid.width {
            let mut dx = 0;
            let mut dy = 0;
            loop {
                if dx == 3 { break; };
                loop {
                    if dy == 3 { break; };
                    if dx == 1 && dy == 1 { 
                        continue; 
                    };

                    let new_x = x + dx - 1;
                    let new_y = y + dy - 1;
                    
                    if new_x >= 0 && new_x < grid.width && new_y >= 0 && new_y < grid.width {
                        let square: Square = get!(ctx.world, (grid.grid_id, new_x, new_y).into(), Square);
                        if square.is_mine() {
                            neighboring_mines += 1;
                        };
                    };
                    dy += 1;
                }
                dx += 1;
            };
        };

        set! (
            ctx.world,
            (grid.grid_id, current_square.x, current_square.y).into(),
            (Square {
                x: current_square.x,
                y: current_square.y,
                hidden: false,
                mine: current_square.mine,
                flag: current_square.flag,
            },Neighbors {
                count: neighboring_mines,
            })
        );

        // Need to add if clicked on mines;
        // Check if not flagged

    }
}