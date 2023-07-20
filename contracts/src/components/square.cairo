#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Square {
    x: u16,
    y: u16,
    hidden: bool,
    mine: bool,
    flag: bool,
}

trait SquareTrait {
    fn is_hidden(self: Square) -> bool;
    fn is_mine(self: Square) -> bool;
    fn is_flagged(self: Square) -> bool;
}

impl SquareImpl of SquareTrait {
    fn is_hidden(self: Square) -> bool {
        self.hidden
    }

    fn is_mine(self: Square) -> bool {
        self.mine
    }

    fn is_flagged(self: Square) -> bool {
        self.flag
    }
}
