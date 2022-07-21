const serviceOptions = [document.querySelector('#btn-1'), document.querySelector('#btn-2'), document.querySelector('#btn-3')]
const itemTask = document.querySelector('#item-task');
const itemTotal = document.querySelector('#item-total');
const totalAmount = document.querySelector('#total-amount');
const invoiceBtn = document.querySelector('#invoice-btn');
let removeWashCarBtn = document.querySelector('#remove-wash-car-btn')
let removeMowLawnBtn = document.querySelector('#remove-mow-lawn-btn')
let removePullWeedsBtn = document.querySelector('#remove-pull-weeds-btn')
let priceCharged = 0
let servicesRequested = []

// adding items and prices to html
function addItem(itemType){
    if (itemType == 'wash car') {
        itemTask.innerHTML += `
        <h2 class="wash-car" data-aos="fade-left">Wash Car
            <button id="remove-wash-car-btn"class="remove" onclick="removeItem('wash-car')">Remove
            </button>
        </h2>`
        itemTotal.innerHTML += `
        <h2 class="wash-car" data-aos="fade-right">
            <span class="money-sign">$</span>
            <span id="price">10</span>
        </h2>`
    }  else if (itemType == "mow lawn") {
        itemTask.innerHTML += `
        <h2 class="mow-lawn" data-aos="fade-left">Mow Lawn
            <button id="remove-mow-lawn-btn" class="remove" onclick="removeItem('mow-lawn')">Remove
            </button>
        </h2>`
        itemTotal.innerHTML += `
        <h2 class="mow-lawn" data-aos="fade-right">
            <span class="money-sign">$</span>
            <span id="price">20</span>
        </h2>`
    } else {
        itemTask.innerHTML += `
        <h2 class="pull-weeds" data-aos="fade-left">Pull Weeds
            <button id="remove-pull-weeds-btn" class="remove" onclick="removeItem('pull-weeds')">Remove
            </button>
        </h2>`
        itemTotal.innerHTML += `
        <h2 class="pull-weeds" data-aos="fade-right">
            <span class="money-sign">$</span>
            <span id="price">30</span>
        </h2>`
    }
}



// event handlers
function checkServicesRequested(toCheck) {
    if (servicesRequested.length == 0) {
        return true
    }
    for (let i = 0; i < servicesRequested.length; i++) {
        if(servicesRequested[i] == toCheck) {
            return false
        }
    }
    return true
}

function calculateTotalAmount() {
    totalAmount.innerHTML = `<span style="margin-inline-end: 2px">$</span>${priceCharged}`
    if (priceCharged == 0) {
        totalAmount.innerHTML = null
    }
}

function removeItem(classToRemove) {
    const classToRemoveEl = document.getElementsByClassName(classToRemove)
    for (let i = 0; i < classToRemoveEl.length; i++) {
        classToRemoveEl[i].innerHTML = null
    }
    if (classToRemove == 'wash-car') {
        priceCharged -=10
        calculateTotalAmount()
        removeFromServicesRequested('wash car')
    } else if (classToRemove == "mow-lawn") {
        priceCharged -= 20
        calculateTotalAmount()
        removeFromServicesRequested("mow lawn")
    } else {
        priceCharged -= 30
        calculateTotalAmount()
        removeFromServicesRequested("pull weeds")
    }

}


function removeFromServicesRequested(toRemove) {
    for (let i = 0; i < servicesRequested.length; i++) {
        if (servicesRequested[i] == toRemove) {
            servicesRequested.splice(i, 1)
        }
    }
}


// EventListeners
serviceOptions[0].addEventListener('click', function() {
    if (checkServicesRequested('wash car')) {
        addItem('wash car')
        servicesRequested.push('wash car')
        priceCharged += 10
        calculateTotalAmount()
        removeWashCarBtn = document.querySelector('#remove-wash-car-btn')
    } else {
        alert("You've already entered this item, we don't want to charge you twice :)")
    }
})

serviceOptions[1].addEventListener('click', function() {
    if (checkServicesRequested('mow lawn')) {
        addItem('mow lawn')
        servicesRequested.push('mow lawn')
        priceCharged += 20
        calculateTotalAmount()
        removeMowLawnBtn = document.querySelector('#remove-mow-lawn-btn')
    } else {
        alert("You've already entered this item, we don't want to charge you twice :)")
    }
})

serviceOptions[2].addEventListener('click', function() {
    if (checkServicesRequested('pull weeds')) {
        addItem('pull weeds')
        servicesRequested.push('pull weeds')
        priceCharged += 30
        calculateTotalAmount()
        removePullWeedsBtn = document.querySelector('#remove-pull-weeds-btn')
    } else {
        alert("You've already entered this item, we don't want to charge you twice :)")
    }
})


invoiceBtn.addEventListener("click", function () {
    // console.log(removeWashCarBtn, removeMowLawnBtn, removePullWeedsBtn)
    itemTask.innerHTML = `<div id="item-task" data-aos="flip-right"><p>TASK</p></div>`
    itemTotal.innerHTML = `<div id="item-total" data-aos="flip-right"><p>TOTAL</p></div>`
    servicesRequested = []
    totalAmount.innerHTML = null
    priceCharged = 0
})
