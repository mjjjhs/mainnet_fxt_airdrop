const BigNumber = require('bignumber.js');

const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const abiArray = require('./mainnet_abi.js'); //FXT 토큰의 json ABI
require("dotenv").config();
const connAddr = 'https://mainnet.infura.io';
// const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
const web3 = new Web3(new Web3.providers.HttpProvider(connAddr));
const toAddrList = process.env.ADDRLIST.split(',');
let sendCount = 0; //반복한 횟수
const tokenAmount = 1000; //각 트랜잭션 당 보내야 할 토큰 갯수
const tokenDecimal = 1e18; //FXT 의 토큰 크기
const gasPrice = 11 * 1e9;
const gasLimit = 210000;
const fromAddr = process.env.FROMADDRESS; //토큰이 빠져나갈 계좌
const sendTokenAmount = web3.utils.toHex(BigNumber(tokenAmount * tokenDecimal)); //토큰량의 헥스 값.
const contractAddress = process.env.CONTRACTADDRESS; //FXT의 토큰 컨트랙트 주소
const contract = new web3.eth.Contract(abiArray, contractAddress, { from: fromAddr }); //컨트랙트 데이터를 가져온다.

// set your private key here, we'll sign the transaction below
const privateKey = new Buffer(process.env.PRIVATEKEY, 'hex');
let transactionCount = 0; //FROM ADDRESS 의 트랜잭션 횟수
let rawTransaction = null;
let transaction = null;
let promiseArr = []; //Promise 리스트를 담을 배열
let promise = null;
let toAddress = null; //토큰을 받을 계좌
web3.eth.getTransactionCount(fromAddr).then(v => {
  transactionCount = v;
  for (let i = 0; i < toAddrList.length; i++) {
    toAddress = toAddrList[i];

    if (i === 0)
      transactionCount = transactionCount;
    else
      transactionCount = ++transactionCount;

    console.log('transactionCount::', transactionCount, 'idx::', i);

    rawTransaction = {
      "from": fromAddr,
      "gasPrice": web3.utils.toHex(gasPrice),
      "gasLimit": web3.utils.toHex(gasLimit),
      "to": contractAddress, // CONFUSING
      "value": "0x0",
      "data": contract.methods.transfer(toAddress, sendTokenAmount).encodeABI(),
      "nonce": web3.utils.toHex(transactionCount)
    };
    transaction = new Tx(rawTransaction);
    transaction.sign(privateKey);
    console.log('nonce::', web3.utils.toHex(transactionCount));
    console.log('from::', fromAddr);
    console.log('to::', toAddress);
    promise = web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));

    promiseArr.push(promise);

  }
  return promiseArr;
}).then(function(arr) {
  return Promise.all(arr);
}).then(function(values) {
  const failResult = values.filter(value => {
    return !value.status;
  }).map(v => {
    return v.transactionHash;
  });

  console.log(failResult);


  //process.exit(0);
}).catch(function(err) {
  console.log('err::', err);
});