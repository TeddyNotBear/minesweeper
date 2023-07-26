use traits::{Into, Default};
use array::ArrayTrait;
use dojo::test_utils::spawn_test_world;
use dojo::world::IWorldDispatcherTrait;
use save_the_quacks::components::grid::GridComponent;
use save_the_quacks::components::mine::MineComponent;
use save_the_quacks::components::moves::MovesComponent;
use save_the_quacks::components::square::SquareComponent;
use save_the_quacks::systems::start;

#[test]
#[available_gas(30000000)]
fn test__start_beginner() {
    let player = starknet::contract_address_const::<0x0>();
    // components
    let mut components: Array = Default::default();
    components.append(grid::TEST_CLASS_HASH);
    components.append(mine::TEST_CLASS_HASH);
    components.append(moves::TEST_CLASS_HASH);
    components.append(square::TEST_CLASS_HASH);
    // systems
    let mut systems: Array = Default::default();
    systems.append(start::TEST_CLASS_HASH);

    // deploy executor, world and register components/systems
    let world = spawn_test_world(components, systems);

    let mut start_calldata: Array<felt252> = ArrayTrait::<felt252>::new();
    Serde::serialize(@grid::Difficulty::Beginner(()).into(), ref start_calldata);
    world.execute('start'.into(), start_calldata.span());

    let grid = world.entity('Grid'.into(), player.into(), 0, dojo::SerdeLen::<grid::Grid>::len());
}