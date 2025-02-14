//-------------------------------------------product page-------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // Initialize product categories to "none" explicitly
    const categories = ["banana", "sweet", "kappa", "murukk", "kadalamavu", "special", "other"];
    
    categories.forEach(category => {
        const items = document.querySelectorAll(`.${category}`);
        items.forEach(item => item.style.display = "none"); // Ensuring display is explicitly set
    });

    const categoryFunctions = {
        banana: () => toggleCategory("categorybanana", document.querySelectorAll(".banana")),
        sweet: () => toggleCategory("categorysweet", document.querySelectorAll(".sweet")),
        kappa: () => toggleCategory("categorykappa", document.querySelectorAll(".kappa")),
        murukk: () => toggleCategory("categorymurukk", document.querySelectorAll(".murukk")),
        kadalamavu: () => toggleCategory("categorykadalamavu", document.querySelectorAll(".kadalamavu")),
        special: () => toggleCategory("categoryspecial", document.querySelectorAll(".special")),
        other: () => toggleCategory("categoryother", document.querySelectorAll(".other"))
    };

    for (const category in categoryFunctions) {
        const element = document.getElementById(`category${category}`);
        if (element) {
            element.addEventListener("click", categoryFunctions[category]);
        }
    }

    function toggleCategory(categoryId, items) {
        if (items.length === 0) return; // No elements to toggle

        const firstItem = items[0];
        const isCurrentlyVisible = firstItem.style.display === "block"; // Explicit check

        // Toggle all items
        items.forEach(item => item.style.display = isCurrentlyVisible ? "none" : "block");
        
        // Rotate the arrow when the category is toggled
        document.getElementById(categoryId).classList.toggle("active");
    }
});


//-------------------------------------------sliding images (ONLY on index.html) -------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js initialized.");

    // ✅ Declare slideIndex globally
    window.slideIndex = 0;
    let slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        if (!slides.length) {
            console.error("❌ No slides found! Skipping showSlide().");
            return;
        }
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    window.changeSlide = function (n) {
        console.log("🔄 Changing slide:", n);

        if (!slides.length) {
            console.error("❌ No slides found!");
            return;
        }

        slideIndex += n;
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        if (slideIndex >= slides.length) { slideIndex = 0; }
        showSlide(slideIndex);
    };

    function autoSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) { slideIndex = 0; }
        showSlide(slideIndex);
        setTimeout(autoSlide, 5000); // Change every 5s
    }

    // ✅ Initialize Slideshow
    showSlide(slideIndex);
    setTimeout(autoSlide, 5000);

    console.log("✅ changeSlide is now globally available.");
});

//-------------------------------------------menu button-------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js initialized.");

    function attachMenuDropdown() {
        console.log("🔍 Checking for menu button...");

        const menuButton = document.querySelector(".dropbtn");
        const menuContent = document.querySelector(".dropdown-content");

        if (!menuButton || !menuContent) {
            console.error("❌ Menu button or dropdown content not found!");
            return;
        }

        console.log("✅ Menu button found! Attaching event listener.");
        
        // Remove any old event listeners before adding a new one
        menuButton.removeEventListener("click", toggleMenu);
        menuButton.addEventListener("click", toggleMenu);

        document.addEventListener("click", function (event) {
            if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
                console.log("🔒 Clicking outside, hiding menu.");
                menuContent.style.display = "none";
            }
        });

        console.log("✅ Menu dropdown initialized.");
    }

    function toggleMenu(event) {
        event.stopPropagation();
        const menuContent = document.querySelector(".dropdown-content");
        menuContent.style.display = (menuContent.style.display === "block") ? "none" : "block";
        console.log("📂 Menu button clicked.");
    }

    console.log("🔄 Running attachMenuDropdown()...");
    attachMenuDropdown();
});

//-------------------------------------------cart-------------------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function() {
    // Load cart from local storage
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartDisplay();
});

function addToCart(product, price) {
    let existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
}

function removeFromCart(product) {
    cart = cart.filter(item => item.product !== product);
    saveCart();
    updateCartDisplay();
}

function changeQuantity(product, amount) {
    let item = cart.find(item => item.product === product);
    if (item) {
        item.quantity += amount;
        if (item.quantity < 1) {
            removeFromCart(product);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
    let cartList = document.getElementById("cart-list");  
    let totalAmount = 0;
    let totalItems = cart.length;
    cartList.innerHTML = "";
    
    cart.forEach((item) => {
        let li = document.createElement("li");
        li.className = "cart-item";

        let productText = document.createElement("span");
        productText.textContent = `${item.product} x ${item.quantity} - ₹${item.price * item.quantity}`;

        let buttonContainer = document.createElement("div");
        buttonContainer.className = "cart-buttons";

        let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
        decreaseBtn.className = "decrease-btn";
        decreaseBtn.onclick = () => {
            if (item.quantity > 1) {
                changeQuantity(item.product, -1);
            }
        };

        let increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.className = "increase-btn";
        increaseBtn.onclick = () => changeQuantity(item.product, 1);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "🗑";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => removeFromCart(item.product);

        buttonContainer.appendChild(decreaseBtn);
        buttonContainer.appendChild(increaseBtn);
        buttonContainer.appendChild(removeBtn);

        li.appendChild(productText);
        li.appendChild(buttonContainer);
        cartList.appendChild(li);
        
        totalAmount += item.price * item.quantity;
    });
    
    let totalDisplay = document.getElementById("cart-total");
    if (!totalDisplay) {
        totalDisplay = document.createElement("p");
        totalDisplay.id = "cart-total";
        let orderButton = document.getElementById("order-btn");
        orderButton.parentNode.insertBefore(totalDisplay, orderButton);
    }
    totalDisplay.textContent = `Total: ₹${totalAmount}`;
    
    let cartBadge = document.getElementById("cart-badge");
    if (!cartBadge) {
        cartBadge = document.createElement("span");
        cartBadge.id = "cart-badge";
        document.getElementById("ShowCart").appendChild(cartBadge);
    }
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "block" : "none";
}



function showAddressPopup() {
    let popup = document.createElement("div");
    popup.id = "address-popup";
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Enter Your Delivery Address</h2>
            <textarea id="address-input" placeholder="Type your address here..."></textarea>
            <button onclick="confirmAddress()">Confirm</button>
            <button onclick="closePopup()">Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    document.getElementById("address-popup").remove();
}

function confirmAddress() {
    let address = document.getElementById("address-input").value;
    closePopup();
    sendToWhatsApp(address);
}

function sendToWhatsApp(address = "") {
    let phoneNumber = "9074807045";
    let message = "Order Details:\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.product} x${item.quantity}: ₹${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });

    message += `\nTotal: ₹${total}`;
    
    if (address) {
        message += `\nDelivery Address: ${address}`;
    }

    let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
}


/**************************************product arrow *****************/
