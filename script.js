const Web3Modal = window.Web3Modal.default;
const providerOptions = {
    /* See Provider Options Section */
};
const web3Modal = new Web3Modal({
   network: "mainnet", // optional
   cacheProvider: true, // optional
   providerOptions // required
});

let auctionDelay = 1800;
let start = 1614280012;
let maxNumber = new BigNumber("115792089237316195423570985008687907853269984665640564039457584007913129639935").toFixed();
let zeroAddr = "0x0000000000000000000000000000000000000000";

let provider;
let web3;

const Contract = function () {

  let auctionABI = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"round","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"round","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnWithdraw","type":"event"},{"inputs":[],"name":"daily_decay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"delay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_referrer","type":"address"}],"name":"enter","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"initial_emission","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mag","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phx","outputs":[{"internalType":"contract PHX","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"staking","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"start","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"total","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_round","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
  let stakingABI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distribute","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"divPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"int256","name":"scaledPayout","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
  let tokenABI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"locked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"remove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]');

  let auction = '0xA3D1082544638c3d0556Ef9e9bf524B6d5A9e63c';
  let staking = '0x6206022E985DAd2fe103c910f256597d1119Ec43';
  let token = '0x7427C996620dbc2DC532247e244e0Da6e8E78F4E';

  function getBalance() {
    let userAddress = localStorage.getItem("userAddress");
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(userAddress, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function getStart() {
    let auctionContract = new web3.eth.Contract(auctionABI, auction);
    return new Promise((resolve, reject) => {
      auctionContract.methods
        .start()
        .call(function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function getRoundTotal(obj) {
    let auctionContract = new web3.eth.Contract(auctionABI, auction);
    return new Promise((resolve, reject) => {
      auctionContract.methods
        .total(obj.round)
        .call(function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function getUserInfo(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let auctionContract = new web3.eth.Contract(auctionABI, auction);
    return new Promise((resolve, reject) => {
      auctionContract.methods
        .user(userAddress, obj.round)
        .call(function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function enter(obj) {
    let referrer = obj.referrer ? obj.referrer : zeroAddr;
    let userAddress = localStorage.getItem("userAddress");
    let auctionContract = new web3.eth.Contract(auctionABI, auction);
    return new Promise((resolve, reject) => {
      auctionContract.methods
        .enter(referrer)
        .send({from:userAddress, value:obj.value}, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function withdraw(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let auctionContract = new web3.eth.Contract(auctionABI, auction);
    return new Promise((resolve, reject) => {
      auctionContract.methods
        .withdraw(obj.round)
        .send({from:userAddress}, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function deposit(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let stakingContract = new web3.eth.Contract(stakingABI, staking);
    return new Promise((resolve, reject) => {
      stakingContract.methods
        .deposit(obj.amount)
        .send({from:userAddress}, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function withdrawStaking(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let stakingContract = new web3.eth.Contract(stakingABI, staking);
    return new Promise((resolve, reject) => {
      stakingContract.methods
        .withdraw(obj.amount)
        .send({from:userAddress}, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function claim() {
    let userAddress = localStorage.getItem("userAddress");
    let stakingContract = new web3.eth.Contract(stakingABI, staking);
    return new Promise((resolve, reject) => {
      stakingContract.methods
        .claim()
        .send({from:userAddress}, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function transfer(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let stakingContract = new web3.eth.Contract(stakingABI, staking);
    return new Promise((resolve, reject) => {
      stakingContract.methods
        .transfer(obj.to, obj.amount)
        .send({from:userAddress}, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function balanceOf(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let stakingContract = new web3.eth.Contract(stakingABI, staking);
    return new Promise((resolve, reject) => {
      stakingContract.methods
        .balanceOf(userAddress)
        .call(function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function dividendsOf(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let stakingContract = new web3.eth.Contract(stakingABI, staking);
    return new Promise((resolve, reject) => {
      stakingContract.methods
        .dividendsOf(userAddress)
        .call(function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function tokenBalance(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let tokenAddress = token;
    let tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    return new Promise((resolve, reject) => {
      tokenContract.methods
        .balanceOf(userAddress)
        .call(function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function allowance(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let tokenAddress = token;
    let tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    return new Promise((resolve, reject) => {
      tokenContract.methods
        .allowance(userAddress, staking)
        .call(function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

  function approve(obj) {
    let userAddress = localStorage.getItem("userAddress");
    let tokenAddress = token;
    let tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    return new Promise((resolve, reject) => {
      tokenContract.methods.approve(staking, maxNum)
        .send({from:userAddress}, function (err, body) {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }

   return { getBalance, getStart, getRoundTotal, getUserInfo, enter, withdraw, deposit, withdrawStaking, claim, transfer, balanceOf, dividendsOf, allowance, approve, tokenBalance };

 }

 const Metamask = function() {

   function initSubscriptions() {
     provider.on("accountsChanged", async function() {
       let accounts = await web3.eth.getAccounts();
       localStorage.setItem("userAddress", accounts[0]);
       $('.account').text(accounts[0].slice(0,5) + "..." + accounts[0].slice(-5));
     });
   }

   async function connectWeb3() {
     provider = await web3Modal.connect();
     web3 = new Web3(provider);
     let accounts = await web3.eth.getAccounts();
     localStorage.setItem("userAddress", accounts[0]);
     $('.account').text(accounts[0].slice(0,5) + "..." + accounts[0].slice(-5));
   }

   return { connectWeb3, initSubscriptions };

 }

$(window).on('load', async function() {

  let contract = new Contract();
  let metamask = new Metamask();

  async function delay(timeInMilliseconds) {
    return new Promise((resolve) => {
      setTimeout(function() {
        resolve(true);
      }, timeInMilliseconds);
    })
  }

  async function withdraw() {
    let round = $('#withdrawInput').val();
    round = parseInt(round);
    console.log(round);
    await contract.withdraw({ round:round });
  }

  async function allowance() {
    return await contract.allowance();
  }

  async function approve() {
    return await contract.approve();
  }

  async function stake() {
    let amount = $('#stakeInput').val();
    amount = new BigNumber(amount).multipliedBy(10 ** 18);
    amount = amount.toFixed();
    let allowed = await allowance();
    console.log(allowed, amount);
    if(parseFloat(allowed) < parseFloat(amount)) {
      await approve();
      await delay(5000);
    }
    await contract.deposit({ amount:amount });
  }

  async function withdrawStake() {
    let amount = $('#withdrawStakeInput').val();
    amount = new BigNumber(amount).multipliedBy(10 ** 18);
    amount = amount.toFixed();
    await contract.withdrawStaking({ amount:amount });
  }

  async function claim() {
    await contract.claim();
  }

  async function transfer() {
    let to = $('#stakeAddr').val();
    let amount = $('#stakeAmount').val();
    amount = new BigNumber(amount).multipliedBy(10 ** 18);
    amount = amount.toFixed();
    await contract.transfer({ to:to, amount:amount });
  }

  async function enter() {
    let value = $('#__layout > div > section > div > div > div:nth-child(2) > div:nth-child(1) > div > section > div:nth-child(1) > div > fieldset > div:nth-child(1) > div > div.dropdown-trigger > div > input').val();
    value = new BigNumber(value).multipliedBy(10 ** 18);
    value = value.toFixed();
    await contract.enter({ value: value });
  }

  function getTimeRemaining(time){
    const total = (time * 1000) - Date.parse(new Date());
    let seconds = Math.floor( (total/1000) % 60 );
		seconds = seconds < 10 ? "0" + seconds.toString() : seconds;
    let minutes = Math.floor( (total/1000/60) % 60 );
		minutes = minutes < 10 ? "0" + minutes.toString() : minutes;
    let hours = Math.floor( (total/(1000*60*60)) % 24 );
		hours = hours < 10 ? "0" + hours.toString() : hours;
    let days = Math.floor( total/(1000*60*60*24) );
		days = days < 10 ? "0" + days.toString() : days;
    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  async function updateStats() {
    let now = Date.parse(new Date()) / 1000;
    let round = (now - start) / auctionDelay;
    round = Math.floor(round);
    let nextRound = start + ((round + 1) * auctionDelay);
    let elapsed = getTimeRemaining(nextRound);
    let timeStr = `${elapsed.days} : ${elapsed.hours} : ${elapsed.minutes} : ${elapsed.seconds}`;
    $('#round').text(round);
    $('#timer').text(timeStr);
  }

  function getParameterByName(name, url = window.location.href) {
     name = name.replace(/[\[\]]/g, '\\$&');
     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
         results = regex.exec(url);
     if (!results) return null;
     if (!results[2]) return '';
     return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function saveReferrer() {
    let referrer = getParameterByName('referrer');
    referrer = referrer ? referrer : '0x8c6a7Caf638a6193753B0c3C700d5B696eF96718';
    localStorage.setItem("referrer", referrer);
  }

  function getUserRef() {
    let userAddress = localStorage.getItem("userAddress");
    $('#ref').text("phaserstaking.com/?referrer=" + userAddress);
  }

  function getMaxTokens() {
    let now = Math.floor(Date.parse(new Date()) / 1000);
    let monthsElapsed = (now - start) / (30.5 * 24 * 60 * 60);
    monthsElapsed = parseInt(monthsElapsed);
    let amount = 12000 - (1000 * monthsElapsed);
    return amount;
  }

  setInterval(async function() {
    getUserRef();
    saveReferrer();
    if(!web3) return;
    await connect();
    await updateBalance();
    await updateStats();
    await updateInfo();
  }, 3000);

  async function connect() {
    accounts = await web3.eth.getAccounts();
    if(accounts.length === 0) {
      $('.account').text('Connect');
    }
  }

  async function updateBalance() {
    let balance = await contract.getBalance();
    balance = parseFloat(balance) / 1e18;
    let tokenBalance = await contract.tokenBalance();
    tokenBalance = parseFloat(tokenBalance) / 1e18;
    $('#bnbBalance').text(balance);
    $('#phxBalance').text(tokenBalance);
  }

  async function updateInfo() {
    let now = Date.parse(new Date()) / 1000;
    let round = (now - start) / auctionDelay;
    round = Math.floor(round);
    let roundTotal = await contract.getRoundTotal({round:round});
    roundTotal = parseFloat(roundTotal) / 1e18;
    let userInfo = await contract.getUserInfo({round:round});
    userInfo = parseFloat(userInfo) / 1e18;
    let maxTokens = getMaxTokens();
    let rate = maxTokens / roundTotal;
    let divs = await contract.dividendsOf();
    divs = parseFloat(divs) / 1e18;
    let balanceOf = await contract.balanceOf();
    balanceOf = parseFloat(balanceOf) / 1e18;
    $('#divs').text(divs);
    $('#stakeBalance').text(balanceOf);
    $('#rate').text(rate);
    $('#maxTokens').text(maxTokens);
    $('#auction').text(userInfo);
    $('#pool').text(roundTotal);
  }

  $('#withdrawInput').keyup(async function(e){
   let now = Date.parse(new Date()) / 1000;
   let round = (now - start) / auctionDelay;
   round = Math.floor(round);
   let roundNum = $('#withdrawInput').val();
   roundNum = parseInt(roundNum);
   if(roundNum >= round) {
     $('#withdraw').prop("disabled", true);;
     $('#warning').text('Round Has Not Ended.');
     $('#rateString').text('');
     $('#auctionBid').val('');
   } else {
     $('#withdraw').prop("disabled", false);;
     $('#warning').text('');
      let roundTotal = await contract.getRoundTotal({round:roundNum});
      roundTotal = parseFloat(roundTotal) / 1e18;
      let monthsElapsed = roundNum  / (30.5 * 48);
      monthsElapsed = parseInt(monthsElapsed);
      let amount = 12000 - (1000 * monthsElapsed);
      let pastRate = amount / roundTotal;
      let userInfo = await contract.getUserInfo({round:roundNum});
      userInfo = parseFloat(userInfo) / 1e18;
      $('#auctionBid').val(userInfo);
      $('#rateString').text(`1 BNB ${pastRate} PHX`);
   }
  });

  $('#withdraw').on('click', async function() {
     await withdraw();
  });

  $('#enter').on('click', async function() {
    await enter();
  });

  $('#stake').on('click', async function() {
     await stake();
  });

  $('#withdrawStake').on('click', async function() {
     await withdrawStake();
  });

  $('#claim').on('click', async function() {
     await claim();
  });

  $('#transfer').on('click', async function() {
     await transfer();
  });

  $('#metamask').on('click', async function() {
    await metamask.connectWeb3();
    await metamask.initSubscriptions();
  });

})
