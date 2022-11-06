## Overview

AMMSDK はすべてのゲームに AMM を導入できるようにし GameFi 化するための SDK です。
この SDK を導入すると、AMM を用いて Uniswap のようにゲーム間でゲームコインを交換できるようになります。

今までは GameFi の開発は難しいものでしたが、この SDK を用いれば今までのゲーム開発と同じまま、GameFi を作成できます。
また、この SDK は既存のゲームにも組み込むことができます。
ゲーム業界では RTF という非公式の交換所が問題となっていましたが、この SDK を組み込むことでユーザーは安心してアイテムなどを交換できます。
AMMSDK が導入されるとゲームコインに価値が付くため、コミュニティにトークンエコノミクスを強く利かせることが可能になるとも考えています。

さらに、SDK は WeaveDB という Arweave 上で動作するデータベースを用いており、次のようなことが可能となっています。

1. 数秒でゲームコインの交換ができる
2. ガス代が不要
3. 柔軟なクエリが可能

これらは Ethereum などのブロックチェーンでは難しいです。

## LiveApps

- [AMM-Interface](https://ammsdk-interface.vercel.app/)
- [DemoGame1](https://melodic-toffee-b33dc3.netlify.app/#/)
- [DemoGame2](https://playful-pothos-3b3146.netlify.app/#/)

## Tech Stacks

### interface

- NextJS
- TailwindCSS & DaisyUI
- Recoil
- Ethers
- ammsdk

### sdk

- warp-contracts
- weavedb-sdk

### weavedb

- warp-contracts
- weavedb-sdk

## DemoGame 1&2

- Flutter
- Firebase

## Blockchain Info

### Stacks

- Arweave
- [WeaveDB](https://weavedb.dev/)
- EVM

### ContractTxID

[xwYOmTylx4j0MZz5FbDNxuhyZefkzPsBJ679raFF_CM](https://sonar.warp.cc/?#/app/contract/xwYOmTylx4j0MZz5FbDNxuhyZefkzPsBJ679raFF_CM)

## Why WeaveDB?

WeaveDB is simply a Firestore Like NoSQL database built on Arweave.
Here are a few things that make this far superior to the others.

1. Flexible queries like Firestore
2. Writing completed in seconds
3. Almost zero GAS cost
4. Decentralized while achieving these
