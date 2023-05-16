// Data
const account1 = {
  owner: 'Prashant Poudel',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-27T17:01:17.194Z',
    '2019-07-11T23:36:17.929Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-03-08T14:11:59.604Z',
    '2020-03-12T10:51:36.790Z',
  ],
  locale:'en-us',
  dateOption:{
    year:'numeric',
    month:'long',
    day:'2-digit'
  },
  numberOption:{
    style:'currency',
    currency:'EUR'
  }
};

const account2 = {
  owner: 'Arjun Poudel',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-01-25T14:18:46.235Z',
    '2019-02-05T16:33:06.386Z',
    '2019-03-10T14:43:26.374Z',
    '2019-04-25T18:49:59.371Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-02-26T12:01:20.894Z',
  ],
  locale:'en-us',
  dateOption:{
    year:'numeric',
    month:'long',
    day:'2-digit'
  },
  numberOption:{
    style:'currency',
    currency:'INR'
  }
};

const account3 = {
  owner: 'Pradip Raj Poudel',
  movements: [200, -200, 3400, -300, -20, 50, 400, 460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-01-28T14:18:46.235Z',
    '2019-02-12T16:33:06.386Z',
    '2019-03-24T14:43:26.374Z',
    '2019-04-26T18:49:59.371Z',
    '2019-11-15T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-02-21T12:01:20.894Z',
  ],
  locale:'en-us',
  dateOption:{
    year:'numeric',
    month:'long',
    day:'2-digit'
  },
  numberOption:{
    style:'currency',
    currency:'USD'
  }
};

const account4 = {
  owner: 'Binita Poudel(Subedi)',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-02-25T14:18:46.235Z',
    '2019-03-05T16:33:06.386Z',
    '2019-04-10T14:43:26.374Z',
    '2019-05-25T18:49:59.371Z',
    '2019-10-01T13:15:33.035Z',
    '2019-11-03T09:48:16.867Z',
    '2019-12-23T06:04:23.907Z',
    '2020-02-21T12:01:20.894Z',
  ],
  locale:'en-us',
  dateOption:{
    year:'numeric',
    month:'long',
    day:'2-digit'
  },
  numberOption:{
    style:'currency',
    currency:'EUR'
  }
};

let accounts = [account1, account2, account3, account4]

let user = document.querySelector('.login_user')
let pass = document.querySelector('.login_password')
let loginButton = document.querySelector('.login_button')
let loginPage = document.querySelector('.welcome')
let accountPage = document.querySelector('.account_page')
let movmentsmain = document.querySelector('.movments')
let inbalance = document.querySelector('.in-balance')
let outbalance = document.querySelector('.out-balance')
let intrest = document.querySelector('.intrest')
let owner = document.querySelector('.ownername')

///transfer
let transferAcc = document.querySelector('.transfer_Account')
let transferAmount = document.querySelector('.transfer_Amount')
let transferButton = document.querySelector(".transfer_Button")

//loan
let loanAmount = document.querySelector('.loan_Amount')
let loanButton = document.querySelector('.loan_Button')

//logout
let logout = document.querySelector('.logout')

accountPage.style.display = 'none'

//close acoocount
let closeUser = document.querySelector('.close_Account_User')
let closePIN = document.querySelector('.close_Account_PIN')
let closeButton = document.querySelector('.close_Button')
let closeError = document.querySelector('.close_Error')


//
let sort = document.querySelector('.sort')


/////function to extract username  from auount name 
//////username////
function extractUsername(accounts) {

  accounts.forEach(account => {

    account['userName'] = account.owner.toLowerCase().split(' ').map(username => username[0]).join('')
  })

}

extractUsername(accounts)


let displayMovments = function (currentAccount,sort = false) {
  let movments = currentAccount.movements
  console.log(movments)

  let sortMovments = sort? movments.slice().sort((a,b)=>b-a) :movments


  sortMovments.forEach((value, index) => {

    let type = value > 0 ? 'Deposit' : 'Withdraw'
    value = new Intl.NumberFormat(currentAccount.locale,currentAccount.numberOption).format(value)

    let listMovments = document.createElement('div')
    listMovments.className = 'movments_row'

    let movmentType = document.createElement('div')
    movmentType.className = `movments_Mode_${type} p-2`
    movmentType.innerText = `${index + 1} ${type}`

    let movmentDate = document.createElement('div')
    movmentDate.className='date'
    let fulldate = new Date (currentAccount.movementsDates[index])
    let year = fulldate.getFullYear()
    let month = `${fulldate.getMonth()}`.padStart(2,0)
    let date = `${fulldate.getDate()}`.padStart(2,0)

    movmentDate.innerText = `${year}/${month}/${date}`

    let movementAmount = document.createElement('div')
    movementAmount.className = 'movments_amount'
    movementAmount.innerText = `${value}`

    listMovments.appendChild(movmentType)
    listMovments.appendChild(movmentDate)
    listMovments.appendChild(movementAmount)
    movmentsmain.appendChild(listMovments)
    

  });
}
let currentAccount ;



/////funtion to show in out intrest and total balance 
function showbalance(currentAccount) {


  let accMov = currentAccount.movements
  ///in
  let deposits = accMov.filter(value => value > 0)
  let totalDeposit = deposits.reduce((accMov, value) => accMov + value, 0)
  inbalance.innerText = `In = ${new Intl.NumberFormat(currentAccount.locale,currentAccount.numberOption).format(totalDeposit)}`
  //out
  let Withdraw = accMov.filter(value => value < 0)
  let totalWithdraw = Withdraw.reduce((accMov, value) => accMov + value, 0)
  outbalance.innerText = `Out = ${new Intl.NumberFormat(currentAccount.locale,currentAccount.numberOption).format(Math.abs(totalWithdraw))}`
  // total balance
  let totalbalance = accMov.reduce((accMov, value) => accMov + value, 0)
  document.querySelector('.balance').innerText = `${new Intl.NumberFormat(currentAccount.locale,currentAccount.numberOption).format(totalbalance)}`
  currentAccount.balance = totalbalance
  //interest 
  let intrestamount = accMov.filter(value => value > 0).map(value => (1.3 / 100) * value).reduce((accMov, value) => accMov + value)

  intrest.innerText = `Intrest = ${new Intl.NumberFormat(currentAccount.locale,currentAccount.numberOption).format(intrestamount.toFixed(2))}`
  
}


//Loginaccount///


loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  let user_DOM = user.value.toLowerCase() 
  let password = pass.value 
  let userAccount = accounts.find(acc => acc.userName === user_DOM && acc.pin == password)
  userAccount ?? (document.querySelector('.login_Error').innerText = 'invalid')
  if (userAccount) {
    currentAccount = userAccount
    displayMovments(currentAccount)
    showbalance(currentAccount)
    owner.innerText = ` ${userAccount.owner}`
    document.querySelector('.dateNow').innerText = new Intl.DateTimeFormat(navigator.language,{year:'numeric',month:'long',day:'2-digit'}).format(new Date())
    accountPage.style.display = 'block'
    loginPage.style.display = 'none'
    user.value = ''
    pass.value = ''
    document.querySelector('.login_Error').innerText = ''
    
    countDown()

  }
})


////transfer:

transferButton.addEventListener('click', () => {

  let accountName = transferAcc.value
  let amount = transferAmount.value
  let balancecheck = currentAccount.balance >= amount

  let toAccount = accounts.find(acc => acc.userName == accountName)
  if (toAccount !== currentAccount && amount > 0 && balancecheck) {

    toAccount.movementsDates.push(new Date())
    toAccount.movements.push(+amount)
    currentAccount.movementsDates.push(new Date())
    currentAccount.movements.push(-amount)
    movmentsmain.innerHTML = ''
    transferAcc.value = ''
    transferAmount.value = ''
    document.querySelector('.transfer_Error').innerText = ''

    showbalance(currentAccount)
    displayMovments(currentAccount)
  }
  else {
    document.querySelector('.transfer_Error').innerText = 'Please check Account or Amount'
  }
})



//loan/////loan canbe given if loan amount(requested) is atleast one deposit tatis 10 percent of loan rerquested amount.
loanButton.addEventListener('click', () => {
  let loan =Math.floor(Number(loanAmount.value))
  //
  let checkloan = loan > 0 && currentAccount.movements.some(value => value >= (10 / 100) * loan)
  //
  if (checkloan) {

    setTimeout(()=>{

      currentAccount.movements.push(loan)
    currentAccount.movementsDates.push(new Date())
    movmentsmain.innerHTML = ''
    loanAmount.value = ''
    displayMovments(currentAccount)
    showbalance(currentAccount)
    document.querySelector('.loan_Error').innerText =''
    loanAmount.value=''



      
    },2500)


    

  
    
  }
else{
  document.querySelector('.loan_Error').innerText ='Sorry Loan Denied'
}


})


///LOGHOUT account

logout.addEventListener('click', () => {
  
  reset()
})



//close  Account 
let closeAccount = function () {
  let closeUserVal = closeUser.value.toLowerCase()
  let closePINVal = closePIN.value

  let index = accounts.findIndex(acc => acc.userName === closeUserVal && acc.pin == closePINVal)
  let check = accounts.findIndex(acc => acc === currentAccount) === index

  if (check) {
    accounts.splice(index, 1)
    closeUser.value = ''
    closePIN.value = ''
    closeError.innerText = ''
    reset()
  } else {
    closeError.innerText = 'Invalid username or PIN'
  }
}

closeButton.addEventListener('click', () => {
  closeAccount()
})



//function to reset  and restore

function reset() {
  accountPage.style.display = 'none'
  loginPage.style.display = 'block'
  currentAccount = [];
  movmentsmain.innerHTML = ''
  inbalance.innerText = ''
  outbalance.innerText = ''
  intrest.innerText = ''
  document.querySelector('.balance').innerText = ''
}


// let allAccountmovments=accounts.flatMap(acc => acc.movements).reduce((acc,movment)=>acc +movment,0)
// console.log(allAccountmovments)


///sort 
let sorted=false
sort.addEventListener('click',(e)=>{
  e.preventDefault()
  movmentsmain.innerHTML = ''
  displayMovments(currentAccount,!sorted)
  sorted=!sorted
})


//////Date/////



///countdown 

function countDown(){
  let timeReamaining = 5*60
  let minute = document.querySelector('.minute')
  let second = document.querySelector('.second')

  setInterval(()=>{
    minute.innerText= Math.floor(timeReamaining/60).toString().padStart(2,0)
    second.innerText= (timeReamaining%60).toString().padStart(2,0)
    timeReamaining--

    if (timeReamaining == 0 ) reset()

  },1000)

}




