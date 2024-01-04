const balance = document.getElementById("balance");
const income = document.getElementById("incomeTxt");
const expense = document.getElementById("expenseTxt");
const historyList = document.getElementById("historyList");
const textInput = document.getElementById("textInput");
const amountInput = document.getElementById("amountInput");
const addTransactionBtn = document.getElementById("addBtn")

const localStoragetransactions = JSON.parse(
    localStorage.getItem("transactions")
)

let transactions = localStorage.getItem("transactions") !== null ? localStoragetransactions : []
let IncomeAmount = localStorage.getItem("IncomeAmount")!== null ? parseInt(localStorage.getItem("IncomeAmount")) : 0;
let ExpenseAmount = localStorage.getItem("ExpenseAmount") !== null ? parseInt(localStorage.getItem("ExpenseAmount")) : 0;
let totalBalance = localStorage.getItem("totalBalance") !== null ? parseInt(localStorage.getItem("totalBalance")) : 0;

if(transactions.length !== 0){
    updateList(transactions);
    income.innerHTML = '$' + IncomeAmount
    expense.innerHTML = '$' + Math.abs(ExpenseAmount)
    balance.innerHTML = '$' + totalBalance;
}

function addTransaction(e){
    e.preventDefault()
    let text = textInput.value;
    let amount = amountInput.value;
    if(text !== "" && amount !== ""){
        transactions.push({id:transactions.length == 0 ? 1 : transactions[transactions.length-1].id + 1, type:text, amount:amount})
        init(transactions, amount);
        setLocalStorageItems();
        clearFields();
    }
    else{
        alert("Please fill out the fields ")
    }
}

function init(transactions, amount){
    updateList(transactions);
    updateIncome(amount.includes("-") ? 0 : amount);
    updateExpense(amount.includes("-") ? amount : 0);
    updateBalance(amount);
}

function updateList(transactions){
    let listhtml = ''
    transactions.map(function(val){
        let setClassName = val.amount.includes("-") ? "minus" : "add"
        listhtml += '<li class="list-item '+setClassName+'"><span class="item-desc">'+val.type+'</span><span class="amount">'+val.amount+'</span><span class="deleteItem">x</span></li>'
    })
    historyList.innerHTML = listhtml;
}

function clearFields(){
    textInput.value = '';
    amountInput.value = '';
}

function updateIncome(amt){
    IncomeAmount += parseInt(amt)
    income.innerHTML = '$' + IncomeAmount
}

function updateExpense(amt){
    ExpenseAmount += parseInt(amt)
    expense.innerHTML = '$' + Math.abs(ExpenseAmount)
}

function updateBalance(amt){
    totalBalance += parseInt(amt)
    balance.innerHTML = '$' + totalBalance;
}

function setLocalStorageItems(){
    localStorage.setItem("transactions", JSON.stringify(transactions))
    localStorage.setItem("totalBalance", totalBalance)
    localStorage.setItem("ExpenseAmount", ExpenseAmount)
    localStorage.setItem("IncomeAmount", IncomeAmount)
}
addTransactionBtn.addEventListener("click", addTransaction)