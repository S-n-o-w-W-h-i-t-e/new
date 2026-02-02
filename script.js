//  Central product weight & price table
const productData = {
  "Avalose Podi Sugarless": { weight: "200g", price: 110 },
  "Avalose Podi With Sugar": { weight: "200g", price: 115 },
  "Avalose Unda": { weight: "150g", price: 125 },
  "Banana Chips": { weight: "250g", price: 200 },
  "Banana Chips Large": { weight: "350g", price: 275 },
  "Chakkavaratty (Jackfruit Jam)": { weight: "300g", price: 300 }, //hidden
  "Chamanthi Podi": { weight: "200g", price: 210 },
  "Chamanthi Podi Large": { weight: "750g", price: 750 },
  "Chembu Chips": { weight: "180g", price: 180 },
  "Dosapodi": { weight: "200g", price: 120 },
  "Ellunda": { weight: "140g", price: 125 },
  "Ellu Vilayichathu": { weight: "100g", price: 80 },
  "Kaliyadakka": { weight: "400g", price: 260 },
  "Kaliyadakka Small": { weight: "125g", price: 95 },
  "Kappa Chilli": { weight: "150g", price: 140 },
  "Kappa Kolli": { weight: "200g", price: 150 },
  "Kappa Papadam": { weight: "120g", price: 120 },
  "Kappa Plain": { weight: "150g", price: 135 },
  "Kayanurukk Small": { weight: "100g", price: 80 },
  "Kayanurukk": { weight: "300g", price: 240 },
  "Kayanurukk Large": { weight: "400g", price: 310 },
  "Kuzhalappam": { weight: "225g", price: 170},
  "Maladu": { weight: "100g", price: 90 },
  "Mixture Garlic": { weight: "350g", price: 240 },
  "Mixture Garlic Small": { weight: "100g", price: 85 },
  "Mixture Plain": { weight: "350g", price: 230 },
  "Mixture Plain Small": { weight: "100g", price: 80 },
  "Mixture Spicy": { weight: "350g", price: 230 },
  "Mixture Spicy Small": { weight: "100g", price: 80 },
  "Murukk": { weight: "250g", price: 175 },
  "Pakkavada": { weight: "200g", price: 150 },
  "Pappadam": { weight: "10 piece", price: 30 },
  "Pappadam Large": { weight: "25 piece", price: 75 }, 
  "Sambar Podi": { weight: "100g", price: 120 },
  "Sarkaravaratty": { weight: "350g", price: 300 },
  "Sarkaravaratty Small": { weight: "100g", price: 100 }, 
  "Spicy Roasted Peanut": { weight: "150gm", price: 75 },
  "Sweet Banana Chips": { weight: "250g", price: 200 },
  "Sweet Banana Chips Small": { weight: "80g", price: 80 }
  // Add more as needed
};







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

    const categories = ["banana", "sweet", "kappa", "murukk", "kadalamavu","chakka", "special", "other"];

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

    document.querySelectorAll(".oneblock").forEach(block => {
      const pTag = block.querySelector("p");
      if (!pTag) return;

      const lines = pTag.innerHTML.split("<br>");
      const name = lines[0].trim();

      const product = productData[name];
      if (!product) {
        console.warn(`⚠️ No product data found for: ${name}`);
        return;
      }

      // Update the weight and price line
      lines[1] = `${product.weight} - ₹${product.price}/-`;

      // Generate a consistent input ID
      const inputId = `qty-${name.replace(/\s+/g, "-")}`;

      // Replace quantity input + button
      lines[2] = `
        <input type="number" id="${inputId}" class="qty-product1" value="1" min="1">
        <button onclick="addToCart('${name}', ${product.price}, '${inputId}', this)">Add to Cart</button>
      `;

      pTag.innerHTML = lines.join("<br>");
    });


    console.log("✅ script.js fully initialized.");
});



//-------------------------------------------sliding images (ONLY on index.html) -------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        if (index < 0) { slideIndex = slides.length - 1; }
        if (index >= slides.length) { slideIndex = 0; }

        let translateValue = -slideIndex * 100 + "%";
        slidesContainer.style.transform = "translateX(" + translateValue + ")";
    }

    window.changeSlide = function (n) {
        slideIndex += n;
        showSlide(slideIndex);
    };

    function autoSlide() {
        slideIndex++;
        showSlide(slideIndex);
        setTimeout(autoSlide, 3000);
    }

    showSlide(slideIndex);
    setTimeout(autoSlide, 3000);
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
    if (!cartList) {
        console.log("⚠️ cart-list not found! Skipping update.");
        return;
    }
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

    //---------------------------------------------------------free delivery-----------------------------------

    let deliveryMsg = document.getElementById("delivery-msg");
    if (totalAmount >= 500) {
        deliveryMsg.textContent = "✅ You're eligible for free delivery!";
        deliveryMsg.style.color = "#00FF00"; // green
    } else if (totalAmount >= 0) {
        deliveryMsg.textContent = "🛍️ Free delivery on orders above ₹500!";
        deliveryMsg.style.color = "#FFFF00"; // orange
    } else {
        deliveryMsg.textContent = ""; // Hide if cart is empty
    }

    //---------------------------------------------------------free delivery-----------------------------------
    
    let cartBadge = document.getElementById("cart-badge");
    if (!cartBadge) {
        cartBadge = document.createElement("span");
        cartBadge.id = "cart-badge";
        document.getElementById("ShowCart").appendChild(cartBadge);
    }
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "block" : "none";

}

let orderButton = document.getElementById("order-btn");
if (orderButton) {
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
}


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


document.addEventListener("DOMContentLoaded", function () {
  const popupOverlay = document.getElementById("popup-overlay");
  const closeBtn = document.getElementById("close-popup");

  if (!sessionStorage.getItem("popupShown")) {
    popupOverlay.style.display = "flex";
    sessionStorage.setItem("popupShown", "true");
  }

  closeBtn.addEventListener("click", function () {
    popupOverlay.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const popupOverlay = document.getElementById("popup-overlay");
  const popupBox = document.getElementById("popup-box");
  const closeBtn = document.getElementById("close-popup");

  // Show the popup once on load
  popupOverlay.classList.add("show");

  // Close button
  closeBtn.addEventListener("click", () => {
    popupOverlay.classList.remove("show");
    popupOverlay.style.display = "none";
  });

  // Tap/click outside the box to close
  popupOverlay.addEventListener("click", (event) => {
    if (!popupBox.contains(event.target)) {
      popupOverlay.classList.remove("show");
      popupOverlay.style.display = "none";
    }
  });
});


