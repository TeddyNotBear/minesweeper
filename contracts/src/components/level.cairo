#[derive(Copy, Drop, Serde)]
enum Difficulty {
    Beginner: (),
    Intermediate: (),
    Expert: (),
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Level {
    difficulty: Difficulty,
}

impl SerdeLenDifficulty of dojo::SerdeLen<Difficulty> {
    #[inline(always)]
    fn len() -> usize {
        1
    }
}