use starknet::contract_address::ContractAddress;

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Grid {
    grid_id: u32,
    width: u16,
    height: u16,
    start_time: u64,
    player_id: ContractAddress,
}