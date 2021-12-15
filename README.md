# Crypto-Truffle

Hosted on Vercal: (https://truffle-nft-game-p61smhd0l-hngovan.vercel.app/)

## Contracts

Deployed on BSC: (https://testnet.bscscan.com/address/0xF6619d99519E062df3DC24706afc124f4E966743/)

### Tech Stack

Contracts: solidity, truffle, ganache.

Front End: react, redux, javascript, react-redux, redux-thunk, react-router, styled-components.

### Usage 

1. Requires an Etherem wallet like [MetaMask](https://metamask.io/)
2. You'll need some test BSC on the Binance network. Visit a <a href="https://testnet.binance.org/faucet-smart" target="_blank">faucet</a> to get some free test BSC. Make sure you've set your wallet network to Binance.
3. Visit the <a href="https://truffle-nft-game-p61smhd0l-hngovan.vercel.app/" target="_blank">Truffles NFT</a> website.
4. Make sure your wallet is on the `Binance` test network. Press the "Connect" button. This will connect the wallet to the app so it can query the blockchain for your truffles.
5. Go to Mytruffle to make some truffles(The first 2 works are free)! Once you have have 2 truffles you can breed(fee 0.01 ETH) them and have baby truffles.

### Other features
1. level up(fee 0.001 ETH): Each level reduces cooldown by 30 minutes, level max(20).
2. Rename(required level ≥ 2).
3. Gift: Required rarity ≥ 10, truffles can be given to others, as a gift.
4. Sell(fee 0.001 ETH): Required rarity ≥ 10, you can sell Truffle on the market.
5. Update Price: Help you update the selling price.
6. UnSell: Remove items from the market.
7. Buy: After clicking buy proceed to transfer the amount to the seller, and update the Truffle owner.

### Game (Camping)
The higher the Level, the shorter the cooldown.
If the level max (20), start increasing Rarity.

| Raritys | Count | Cooldown Time | Rate |
|---|---|---|---|
|1, 10 | +1 | 24 hours | 20% |
|11, 30 | +1 | 24 hours | 35% |
|31, 50 | +1 | 24 hours | 40% |
|51, 70 | +1 | 24 hours | 45% |
|71, 90 | +1 | 24 hours | 60% |
|91, 99 | +1 | 24 hours | 70% |

### Adventure Truffle DNA
| DNA Digits | Cattribute | Values |
|---|---|---|
| 00-02 | Background | 01-99 |
| 02-04 | Body Color | 01-99 |
| 04-06 | Mouth | 01-99 |
| 06-08 | Truffle core | 01-99 |
| 08-10 | Hat | 01-99 |
| 10-12 | Border | 01-99 |
| 12-14 | Eyes |  01-99 |
| 14-16 | Jewels | 01-99 |

### Cooldown
When parent Truffles breed they need time to rest before breeding again. Breed cooldowns are defined below.
| Rarity | Cooldown Time  |
|---|---|
| 0, 49 | 24 hours |
| 50, 74| 18 hours |
| 75, 99 | 12 hours |

### Running the project locally

1. Have node `16.x` installed
2. Install the Truffle suite globally via `npm install -g truffle`
3. `npm install` to install the project dependencies
4. You'll need a local ETH blockchain like Ganache. Can use either the <a href="https://www.trufflesuite.com/ganache" target="_blank">graphical interface</a> or the CLI (`npm install -g ganache-cli`). If using the graphical app create a new workspace and link the truffle config file `/truffle-config.js` to the workspace.
5. Deploy the contracts
   ```
   truffle migrate --reset
   ```
6. Run the app with `npm start` and open a browser to `http://localhost:3000`

## Deploy to Test Net
Deploying the project contracts to a test net requires a `.env` config file which expects the following entries.
```
# 12 word seed phrase for the test net HD wallet provider
Ex: select pupil crucial receive situate manage that argue wolf donkey business raven
```
