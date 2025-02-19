
//------------------------------------------top panel---------------------------------

window.addEventListener("scroll", function () {
    var topPanel = document.querySelector(".top-panel");
    var placeholder = document.querySelector("#top-panel-placeholder");

    if (window.scrollY > 0) {
        placeholder.style.height = "80px"; // Set same height as .top-panel
        topPanel.classList.add("fixed");
    } else {
        placeholder.style.height = "0"; // Collapse back
        topPanel.classList.remove("fixed");
      
    }
});








//-------------------------------------------product page-------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js loaded and running");

    const categories = ["banana", "sweet", "kappa", "murukk", "kadalamavu", "special", "other"];

    categories.forEach(category => {
        const categoryHeader = document.getElementById(`category${category}`);
        const itemsContainer = document.getElementById(`container-${category}`);

        if (!categoryHeader || !itemsContainer) {
            console.log(`❌ Missing elements for category: ${category}`);
            return;
        }

        // Start with all containers hidden
        itemsContainer.style.display = "none";
        itemsContainer.style.opacity = "0";
        itemsContainer.style.overflow = "hidden";
        itemsContainer.style.transition = "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out";
        itemsContainer.style.maxHeight = "0px"; // Collapsed initially

        // Toggle dropdown on click
        categoryHeader.addEventListener("click", function () {
            console.log(`🟡 Clicked on category: ${category}`);

            if (!itemsContainer.classList.contains("active")) {
                console.log(`🟢 Opening category: ${category}`);
                itemsContainer.style.display = "block";

                // Wait for the next frame to get accurate height
                requestAnimationFrame(() => {
                    let height = itemsContainer.scrollHeight;
                    itemsContainer.style.maxHeight = height + "px";
                    itemsContainer.style.opacity = "1";
                    itemsContainer.classList.add("active");
                    categoryHeader.classList.add("active"); // ✅ Add .active to the header
                });

            } else {
                console.log(`🔴 Closing category: ${category}`);
                itemsContainer.style.maxHeight = "0px";
                itemsContainer.style.opacity = "0";

                setTimeout(() => {
                    itemsContainer.style.display = "none";
                    itemsContainer.classList.remove("active");
                }, 400);
                categoryHeader.classList.remove("active"); // ✅ Remove .active from the header
            }
        });
    });

    console.log("✅ script.js fully initialized.");
});



//-------------------------------------------sliding images (ONLY on index.html) -------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js initialized.");

    // ✅ Declare slideIndex globally
    window.slideIndex = 0;
    let slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        if (!slides.length) {
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

});

//-------------------------------------------menu button-------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    
    function attachMenuDropdown() {

        const menuButton = document.querySelector(".dropbtn");
        const menuContent = document.querySelector(".dropdown-content");

        if (!menuButton || !menuContent) {
            console.error("❌ Menu button or dropdown content not found!");
            return;
        }

        // Remove any old event listeners before adding a new one
        menuButton.removeEventListener("click", toggleMenu);
        menuButton.addEventListener("click", toggleMenu);

        document.addEventListener("click", function (event) {
            if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
                menuContent.style.display = "none"; // ✅ Click outside = close
            }
        });

        // ✅ Close menu when clicking a button inside it
        menuContent.addEventListener("click", function (event) {
            if (event.target.tagName === "BUTTON" || event.target.classList.contains("menu-item")) {
                menuContent.style.display = "none"; // ✅ Click inside = close
                console.log("🔴 Menu closed after button click.");
            }
        });
    }

    function toggleMenu(event) {
        event.stopPropagation();
        const menuContent = document.querySelector(".dropdown-content");
        menuContent.style.display = (menuContent.style.display === "block") ? "none" : "block";
        console.log("📂 Menu button clicked.");
    }

    attachMenuDropdown();
});


//-------------------------------------------cart-------------------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function() {
    // Load cart from local storage
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartDisplay();
});

    function addToCart(product, price, qtyInputId, button) {
        let quantityInput = document.getElementById(qtyInputId); // ✅ Get correct input field
        
        if (!quantityInput) { 
            console.error(`❌ Quantity input not found for ${product}`); 
            return;
        }

        let quantity = parseInt(quantityInput.value) || 1; // ✅ Ensure a valid number

        if (quantity < 1) quantity = 1; // ✅ Prevent negative numbers

        let existingProduct = cart.find(item => item.product === product);
        if (existingProduct) {
            existingProduct.quantity += quantity; // ✅ Correctly updates quantity
        } else {
            cart.push({ product, price, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Saves updated cart
        updateCartDisplay();

        // ✅ Change button text and disable it temporarily
        if (button) {
            let originalText = button.innerHTML;
            button.innerHTML = "✔ Added!";
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        } else {
            console.warn(`⚠️ Button not found for ${product}`);
        }
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
/********************************* - + buttons in quantity****************************/
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("input.qty-product1").forEach(input => {
        let parent = input.parentNode;

        // Create Decrease Button (-)
        let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "−";
        decreaseBtn.id = "qty-btn";
        decreaseBtn.onclick = function () {
            let currentValue = parseInt(input.value) || 1;
            if (currentValue > 1) input.value = currentValue - 1;
        };

        // Create Increase Button (+)
        let increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.id = "qty-btn";
        increaseBtn.onclick = function () {
            let currentValue = parseInt(input.value) || 1;
            input.value = currentValue + 1;
        };

        // Insert buttons before and after the input field
        parent.insertBefore(decreaseBtn, input);
        parent.insertBefore(increaseBtn, input.nextSibling);
    });
});


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
    let cartList = document.getElementById("cart-list");  
    let totalAmount = 0;
    let totalItems = cart.length;
    cartList.innerHTML = "";

    if (totalItems === 0) {
        cartList.innerHTML = `<p id="empty-cart-message">🛒 Cart is empty! Add some products.</p>`;
    } else {
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
    }
    
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

    // Show extra fees message only if cart is not empty
    let extraFeesText = document.getElementById("extra-fees");
    if (cart.length > 0) {
        extraFeesText.style.display = "block";
    } else {
        extraFeesText.style.display = "none";
    }
}


document.getElementById("order-btn").addEventListener("click", function () {
    let orderButton = document.getElementById("order-btn");
    let originalText = orderButton.innerHTML;

    // ✅ Get the cart error message element or create it
    let cartError = document.getElementById("cart-error");
    if (!cartError) {
        cartError = document.createElement("p");
        cartError.id = "cart-error";
        cartError.style.color = "red";
        cartError.style.fontSize = "14px";
        cartError.style.marginTop = "5px";
        cartError.style.textAlign = "center";
        document.getElementById("cart-container").appendChild(cartError);
    }

    // 🔹 Check if cart is empty
    if (cart.length === 0) {
        cartError.innerText = "⚠ Your cart is empty. Add items before ordering!";
        cartError.style.display = "block";

        // 🔹 Hide the message after 3 seconds
        setTimeout(() => {
            cartError.style.display = "none";
        }, 3000);

        return; // Stop order process
    }

    let name = document.getElementById("customer-name").value.trim();
    let phoneInput = document.getElementById("customer-phone");
    let phone = phoneInput.value.trim();
    let phoneError = document.getElementById("phone-error");

    let addressInput = document.getElementById("customer-address");
    let addressError = document.getElementById("address-error");
    let address = addressInput.value.trim();

    let pinCodePattern = /\b\d{6}\b/; // Regex for 6-digit PIN code
    let phonePattern = /^\d{10,}$/;   // Phone number must be 10+ digits

    let hasError = false;

    // 🔹 Validate Phone Number
    if (!phonePattern.test(phone)) {
        phoneError.style.display = "block";
        phoneError.innerText = "⚠ Please enter a valid 10-digit phone number.";
        hasError = true;
    } else {
        phoneError.style.display = "none";
    }

    // 🔹 Validate Address
    if (!address || !pinCodePattern.test(address)) {
        addressError.style.display = "block";
        addressError.innerText = "⚠ Please enter a valid address with a 6-digit PIN code.";
        hasError = true;
    } else {
        addressError.style.display = "none";
    }

    if (hasError) return; // ✅ Stop execution if any error exists

    let itemsArray = cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
    }));

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let payment_status = "Pending";

    // ✅ Send order details to WhatsApp
    sendToWhatsApp(name, phone, address, itemsArray, total, payment_status);

    // Change button text to ✔ Ordered!
    orderButton.innerHTML = "✔ Ordered!";
    orderButton.disabled = true;

    // Reset button after 10 seconds
    setTimeout(() => {
        orderButton.innerHTML = originalText;
        orderButton.disabled = false;
    }, 10000);
});


function sendToWhatsApp(name, phone, address, itemsArray, total, payment_status) {
    let phoneNumber = "9074807045";
    let message = `🛒 *New Order Received!*\n\n`;
    
    message += `👤 *Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `🏠 *Address:* ${address}\n\n`;
    message += `📦 *Order Details:*\n`;

    itemsArray.forEach(item => {
        message += `- ${item.product} x${item.quantity}: ₹${item.price * item.quantity}\n`;
    });

    message += `\n💰 *Total:* ₹${total}`;

    let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    let newWindow = window.open(whatsappUrl, "_blank");

    // ✅ Check if the popup was blocked
    if (!newWindow) {
        console.error("❌ Popup blocked! Allow popups for this site.");
        alert("⚠️ Popups are blocked! Please allow popups to send order via WhatsApp.");
    }
}


/**************************************Search *****************/
function searchProducts() {
    let searchQuery = document.getElementById("search-bar").value.toLowerCase();
    let products = document.querySelectorAll(".oneblock"); // Select all product divs
    let categories = document.querySelectorAll(".hidden"); // Select all category headers
    let containers = document.querySelectorAll(".category-container"); // Get category containers
    let bigBlock = document.querySelector(".bigblock"); // Main container

    let categoryMatches = {}; // Track categories that have matching products
    let hasResults = false; // Track if any product is shown

    // Remove "No results found" message
    removeNoResultsMessage();

    products.forEach(product => {
        let productName = product.innerText.toLowerCase();
        let categoryClass = product.classList[1]; // Get category class (e.g., "banana", "sweet")

        if (productName.includes(searchQuery)) {
            product.style.display = "inline-block"; // Show matching product
            categoryMatches[categoryClass] = true; // Mark category as relevant
            hasResults = true;
        } else {
            product.style.display = "none"; // Hide non-matching products
        }
    });

    // Show only relevant categories
    categories.forEach(category => {
        let categoryClass = category.id.replace("category", ""); // Extract category name
        if (categoryMatches[categoryClass]) {
            category.style.display = "inline-block";
        } else {
            category.style.display = "none";
        }
    });

    // ✅ Restore max-height to allow dropdown expansion
    containers.forEach(container => {
        if (container.classList.contains("active")) {
            requestAnimationFrame(() => {
                let height = container.scrollHeight;
                container.style.maxHeight = height + "px"; // Restore proper height
                container.style.opacity = "1";
            });
        } else {
            container.style.maxHeight = "0px";
            container.style.opacity = "0";
        }
    });

    // ✅ Show "No results found" message if no matches exist
    if (!hasResults) {
        showNoResultsMessage(bigBlock);
    }
}

function showNoResultsMessage(bigBlock) {
    let existingMessage = document.getElementById("no-results");
    if (!existingMessage) {
        let noResults = document.createElement("div");
        noResults.id = "no-results";
        noResults.className = "hidden"; // Use same styling as .hidden elements
        noResults.textContent = "No results found";

        let searchContainer = document.getElementById("search-container");
        if (searchContainer) {
            bigBlock.insertBefore(noResults, searchContainer.nextSibling);
        }
    }
}

function removeNoResultsMessage() {
    let existingMessage = document.getElementById("no-results");
    if (existingMessage) {
        existingMessage.remove();
    }
}

function clearSearch() {
    document.getElementById("search-bar").value = ""; // Clear input
    searchProducts(); // Reset product visibility

    categories.forEach(category => {
        category.style.display = "inline-block"; // Keep category headers visible
    });

    products.forEach(product => {
        product.style.display = "none"; // Hide all products by default
    });
}






