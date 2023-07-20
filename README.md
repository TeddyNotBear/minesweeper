<picture>
  <img alt="Minesweeper logo" srcset=".github/minesweeper.png">
</picture>

## Minesweeper

### Entities
- ``

### Components

- `Square`: Can be a hint (number clues), a flag or a mine (or empty) will store square type and position (x, y)
- `Mine`: Store remaining mines to discover

### Systems 
- `Start` Generate a random grid based on 3 difficulty level (Beginner, Intermediate, Expert)
- `Hit`: Allow player to hit a square.
- `Put Flag`: Allow player to put a flag on a specific square.

## Running the game

### Contract

Build the world :
```console
sozo build

sozo migrate
```

Choose a difficulty :

- Beginner (8x8 with 10 mines) :
```console
sozo execute start -c 0
```

- Intermediate (16x16 with 40 mines) :
```console
sozo execute start -c 1
```

- Expert (30x16 with 99 mines) :
```console
sozo execute start -c 2
```

Get Grid id :
```console
sozo component entity Grid $ACCOUNT_ADDRESS
```
$ACCOUNT_ADDRESS = 0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0

Get Square :
```console
sozo component entity Square $ACCOUNT_ADDRESS $GRID_ID $X $Y
```
- $ACCOUNT_ADDRESS = 0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
- $GRID_ID = 0
- $X = 1
- $Y = 0

Add Flag on Square :
```console
sozo execute add_flag -c $ACCOUNT_ADDRESS 1 0
```
- $ACCOUNT_ADDRESS = 0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
