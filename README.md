# Crypto-Truffle

Hosted on Vercal: (https://truffle-nft-game-p61smhd0l-hngovan.vercel.app/)

## Contracts

Deployed on BSC: (https://testnet.bscscan.com/address/0xF6619d99519E062df3DC24706afc124f4E966743/)

### Tech Stack

Contracts: solidity, truffle, ganache.

Front End: react, redux, javascript, react-redux, redux-thunk, react-router, styled-components.

### Usage 

1. Requires an Etherem wallet like [MetaMask](https://metamask.io/)
2. You'll need some test BSC on the Binance network. Visit a <a href="https://testnet.binance.org/faucet-smart" target="_blank">faucet</a> to get some free test BSC. Make sure you've set your wallet network to `Binance`.
3. Visit the <a href="https://truffle-nft-game-p61smhd0l-hngovan.vercel.app/" target="_blank">Truffles NFT</a> website.
4. Make sure your wallet is on the `Binance` test network. Press the "Connect" button. This will connect the wallet to the app so it can query the blockchain for your truffles.
5. Go to mytruffle to make some truffles(first 2 is free)!Once you have have 2 truffles you can breed them and have baby truffles.

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

### Running the project locally

You'll need a local ETH blockchain like [Ganache](https://www.trufflesuite.com/ganache). Can use either the graphical interface or the CLI (npm install -g ganache-cli). If using the graphical app create a new workspace and link the truffle config file /truffle-config.js to the workspace.
(Open a new TERMINAL and run)

```
ganache-cli -d --allowUnlimitedContractSize
```
