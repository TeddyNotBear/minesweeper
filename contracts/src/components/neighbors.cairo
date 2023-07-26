#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Neighbors {
    count: u8,
}