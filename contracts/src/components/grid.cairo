#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Grid {
    grid_id: u32,
    width: u16,
    height: u16,
    start: u64,
}