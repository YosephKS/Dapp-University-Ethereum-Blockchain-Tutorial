# Blockchain Social Network App

This app is the result of following a tutorial from Dapp University Fullstack Blockchain Tutorial. The application demonstrates the ability of creating a new post on the blockchain and providing tips to any existing posts. Special thanks and credit to Gregory from Dapp University of helping and providing me the resources to start blockchain development.

### Get Started

Before running the program, make sure to fulfill the below prerequisites:
- Ganache: v.2.4.0+
- Metamask: v.7.7.9+
- NPM: v.6.14.5+
- Node: v.10.15.3

After all the prerequisites are fulfilled, the follow the steps:
1. Install `truffle` with NPM globally

    Using the `npm` cli, use the following command in the terminal to install the `truffle` package suite globally.
    
    ```
      $ npm i -g truffle
    ```

1. Run Ganache Local Blockchain

    Run the Ganache Application and either create a New workspace or choose the Quickstart Option. After so, change the     configuration by adding `truffle-config.js` of the project to the Blockchain configuration. If everything is set         correctly, the network port will changed from the default `8545` to `7545`.
    
1. Connecting Ganache with Metamask

    Ganache is a local blockchain and behaves similarly to the Main Ethereum Network, but in a smaller scale. Therefore, there     will be accounts and addresses of those accounts, which could be used to simulate Ether transacations. In order to do         those transactions, it will be essential to have an Ethereum Wallet. One of the most well-known is Metamask, where you can connect accounts from Ganache local blockchain to the wallet. First, the plugin will prompt you to Log in with your account. After that, choose `Custom PRC` on the Networks and set the Network Name to `Ganache` (any other name will do) and `New PRC URL` to `http://localhost:7545` to connect to Ganache.
    
    If everything goes well, `Ganache` Network will be cached and ready to use by Metamask. Once the basic set up is done, choose the first three accounts in Ganache and import them using their respective private keys to Metamask. If the process goes successfully, the balance of each account will be displayed accordingly to the balance displayed in Ganache, along with their account public key/address.
  
1. Deploying Smart Contracts to Ganache

    Open the directory and use the truffle command to compile and deploy the smart contracts. All of this can be done as follows:
    
    ```
      $ cd Dapp-University-Ethereum-Blockchain-Tutorial
      $ truffle compile && truffle migrate
    ```

1. Run the application

    It is a React application, therefore to run the app, simply use `npm start` command to start the server.
    
    
### Testing Smart Contracts

Testing is a very important part within the workflow of Software Enginnering. Hence, it is extremely important to do testing in any type of development. For this project, the tests was provided by Gregory from Dapp University and can be run directly using the `truffle` cli using the following commands:

```
  $ truffle test
```

### Reference
- [Dapp University Social Network GitHub Repository](https://github.com/dappuniversity/social-network/)
