#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Mine {
    remaining: u8
}