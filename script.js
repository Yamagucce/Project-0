    let selectedItem = "";
let selectedPrice = 0;

function checkout(name, price) {
    selectedItem = name;
    selectedPrice = price;

    document.getElementById("itemName").innerText = "Item: " + name;
    document.getElementById("itemPrice").innerText = "Price: $" + price.toFixed(2);

    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Luhn Algorithm for credit card validation
function validCard(number) {
    if (!/^\d{13,19}$/.test(number)) return false;

    let sum = 0;
    let alt = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let n = parseInt(number[i]);

        if (alt) {
            n *= 2;
            if (n > 9) n -= 9;
        }

        sum += n;
        alt = !alt;
    }

    return sum % 10 === 0;
}

function processPayment() {
    let name = document.getElementById("name").value;
    let card = document.getElementById("card").value;
    let exp = document.getElementById("exp").value;
    let cvv = document.getElementById("cvv").value;

    if (name.trim() === "") {
        alert("Name required");
        return;
    }

    if (!validCard(card)) {
        alert("Invalid credit card number");
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(exp)) {
        alert("Expiration must be MM/YY");
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert("Invalid CVV");
        return;
    }

    alert("Payment Successful!\nYou purchased: " + selectedItem + " for $" + selectedPrice.toFixed(2));
    closeModal();
}