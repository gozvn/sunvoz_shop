/* ============================================================
   SUNVOZ — Cart & Checkout JS (Vietnamese Localized)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Elements
    var cartGrid = document.getElementById('cartGrid');
    var emptyCartState = document.getElementById('emptyCartState');
    var cartItemsList = document.getElementById('cartItemsList');
    var summaryItemsList = document.getElementById('summaryItemsList');
    
    var subtotalEl = document.getElementById('summarySubtotal');
    var shippingEl = document.getElementById('summaryShipping');
    var discountRow = document.getElementById('discountRow');
    var discountLabel = document.getElementById('discountLabel');
    var discountEl = document.getElementById('summaryDiscount');
    var totalEl = document.getElementById('summaryTotal');
    
    var shippingProgressContainer = document.getElementById('shippingProgressContainer');
    var shippingProgressText = document.getElementById('shippingProgressText');
    var shippingProgressFill = document.getElementById('shippingProgressFill');

    var promoForm = document.getElementById('promoForm');
    var promoInput = document.getElementById('promoInput');
    var promoMessage = document.getElementById('promoMessage');

    var proceedBtn = document.getElementById('proceedBtn');
    var backToCartBtn = document.getElementById('backToCartBtn');
    var checkoutFormContainer = document.getElementById('checkoutFormContainer');
    var checkoutForm = document.getElementById('checkoutForm');
    var placeOrderBtn = document.getElementById('placeOrderBtn');

    // Success Modal Elements
    var successModalOverlay = document.getElementById('successModalOverlay');
    var successOrderId = document.getElementById('successOrderId');
    var successOrderEmail = document.getElementById('successOrderEmail');
    var successOrderCount = document.getElementById('successOrderCount');
    var successOrderTotal = document.getElementById('successOrderTotal');
    var successCloseBtn = document.getElementById('successCloseBtn');

    // Config & State
    var SHIPPING_FREE_THRESHOLD = 150.00;
    var SHIPPING_FLAT_RATE = 7.50;
    var activePromoCode = '';
    var activeDiscountPercent = 0;

    // Promo Code Map
    var PROMO_CODES = {
        'NATURE10': 0.10, // 10% off
        'SUNVOZ20': 0.20  // 20% off
    };

    /* ================= Render Cart Items ================= */
    function renderCart() {
        var cart = window.SunvozCart.getCart();
        var products = window.PRODUCTS || [];

        if (cart.length === 0) {
            cartGrid.style.display = 'none';
            emptyCartState.style.display = 'block';
            return;
        }

        cartGrid.style.display = 'flex';
        emptyCartState.style.display = 'none';
        cartItemsList.innerHTML = '';

        // 1. Render editable items list (for Cart view)
        cart.forEach(function (item) {
            var p = products.find(function (pr) { return pr.id === item.id; });
            if (!p) return;

            var gradient = window.SunvozHelpers ? window.SunvozHelpers.getCategoryGradient(p.category) : '#FAFAF8';
            var icon = window.SunvozHelpers ? window.SunvozHelpers.getCategoryIcon(p.category) : '';
            var price = p.price;
            var itemTotal = price * item.qty;

            var itemHTML = 
                '<div class="cart-item" data-product-id="' + p.id + '">' +
                    '<div class="cart-item-img-wrapper" style="background: ' + gradient + '">' +
                        icon +
                    '</div>' +
                    '<div class="cart-item-details">' +
                        '<h3 class="cart-item-name"><a href="product-detail.html?id=' + p.id + '">' + p.name + '</a></h3>' +
                        '<p class="cart-item-meta">Material: ' + (p.materials || 'Eco-friendly') + '</p>' +
                        '<div class="quantity-adjuster">' +
                            '<button class="qty-btn dec-btn" aria-label="Decrease quantity" data-id="' + p.id + '">-</button>' +
                            '<input type="number" class="qty-input" value="' + item.qty + '" min="1" data-id="' + p.id + '" aria-label="Quantity">' +
                            '<button class="qty-btn inc-btn" aria-label="Increase quantity" data-id="' + p.id + '">+</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cart-item-price-block">' +
                        '<div class="cart-item-price">$' + itemTotal.toFixed(2) + '</div>' +
                        '<button class="cart-item-remove-btn" data-id="' + p.id + '" aria-label="Remove item">' +
                            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>' +
                        '</button>' +
                    '</div>' +
                '</div>';
            
            cartItemsList.insertAdjacentHTML('beforeend', itemHTML);
        });

        // 2. Render compact items list (for Order Summary in Checkout view)
        if (summaryItemsList) {
            summaryItemsList.innerHTML = '';
            cart.forEach(function (item) {
                var p = products.find(function (pr) { return pr.id === item.id; });
                if (!p) return;

                var gradient = window.SunvozHelpers ? window.SunvozHelpers.getCategoryGradient(p.category) : '#FAFAF8';
                var icon = window.SunvozHelpers ? window.SunvozHelpers.getCategoryIcon(p.category) : '';
                var price = p.price;
                var itemTotal = price * item.qty;

                var summaryItemHTML = 
                    '<div class="summary-item">' +
                        '<div class="summary-item-img-wrapper" style="background: ' + gradient + '">' +
                            icon +
                            '<span class="summary-item-qty-badge">' + item.qty + '</span>' +
                        '</div>' +
                        '<div class="summary-item-name">' + p.name + '</div>' +
                        '<div class="summary-item-price">$' + itemTotal.toFixed(2) + '</div>' +
                    '</div>';
                
                summaryItemsList.insertAdjacentHTML('beforeend', summaryItemHTML);
            });
        }

        // Event Listeners for render-dependent elements
        cartItemsList.querySelectorAll('.dec-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var pid = parseInt(btn.dataset.id, 10);
                var qtyInput = cartItemsList.querySelector('.qty-input[data-id="' + pid + '"]');
                var currentVal = parseInt(qtyInput.value, 10);
                if (currentVal > 1) {
                    window.SunvozCart.updateQty(pid, currentVal - 1);
                    renderCart();
                } else {
                    window.SunvozCart.removeItem(pid);
                    renderCart();
                    if (window.SunvozToast) {
                        window.SunvozToast.show('Removed product from cart 🗑️', 'info');
                    }
                }
            });
        });

        cartItemsList.querySelectorAll('.inc-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var pid = parseInt(btn.dataset.id, 10);
                var qtyInput = cartItemsList.querySelector('.qty-input[data-id="' + pid + '"]');
                var currentVal = parseInt(qtyInput.value, 10);
                window.SunvozCart.updateQty(pid, currentVal + 1);
                renderCart();
            });
        });

        cartItemsList.querySelectorAll('.qty-input').forEach(function (input) {
            input.addEventListener('change', function () {
                var pid = parseInt(input.dataset.id, 10);
                var val = parseInt(input.value, 10);
                if (isNaN(val) || val < 1) {
                    val = 1;
                }
                window.SunvozCart.updateQty(pid, val);
                renderCart();
            });
        });

        cartItemsList.querySelectorAll('.cart-item-remove-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var pid = parseInt(btn.dataset.id, 10);
                window.SunvozCart.removeItem(pid);
                renderCart();
                if (window.SunvozToast) {
                    window.SunvozToast.show('Removed product from cart 🗑️', 'info');
                }
            });
        });

        calculateSummary();
    }

    /* ================= Calculate Totals ================= */
    function calculateSummary() {
        var subtotal = window.SunvozCart.getTotal();
        subtotalEl.textContent = '$' + subtotal.toFixed(2);

        // Shipping Progress
        if (subtotal >= SHIPPING_FREE_THRESHOLD) {
            shippingProgressText.innerHTML = 'Congratulations! You\'ve unlocked <strong>FREE Shipping!</strong> 🌿';
            shippingProgressFill.style.width = '100%';
            var shipping = 0;
        } else {
            var diff = SHIPPING_FREE_THRESHOLD - subtotal;
            shippingProgressText.innerHTML = 'Add <strong>$' + diff.toFixed(2) + '</strong> more for FREE Shipping!';
            var percentage = Math.min((subtotal / SHIPPING_FREE_THRESHOLD) * 100, 100);
            shippingProgressFill.style.width = percentage + '%';
            var shipping = SHIPPING_FLAT_RATE;
        }

        shippingEl.textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);

        // Discount
        var discount = 0;
        if (activeDiscountPercent > 0) {
            discount = subtotal * activeDiscountPercent;
            discountLabel.textContent = 'Discount (' + activePromoCode + ' -' + (activeDiscountPercent * 100) + '%)';
            summaryDiscount.textContent = '-$' + discount.toFixed(2);
            discountRow.style.display = 'flex';
        } else {
            discountRow.style.display = 'none';
        }

        var total = subtotal + shipping - discount;
        totalEl.textContent = '$' + Math.max(total, 0).toFixed(2);

        // Update the form CTA text
        var totalCtaVal = Math.max(total, 0).toFixed(2);
        placeOrderBtn.textContent = 'Place Order ($' + totalCtaVal + ')';
    }

    /* ================= Promo Form Submit ================= */
    if (promoForm) {
        promoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var code = promoInput.value.trim().toUpperCase();

            if (!code) {
                promoMessage.textContent = '';
                return;
            }

            if (PROMO_CODES.hasOwnProperty(code)) {
                activePromoCode = code;
                activeDiscountPercent = PROMO_CODES[code];
                promoMessage.className = 'promo-message mt-2 success';
                promoMessage.textContent = 'Applied promo code ' + code + ' successfully!';
                calculateSummary();
                if (window.SunvozToast) {
                    window.SunvozToast.show('Promo code applied! 🏷️', 'success');
                }
            } else {
                promoMessage.className = 'promo-message mt-2 error';
                promoMessage.textContent = 'Invalid promo code. Try NATURE10 or SUNVOZ20.';
            }
        });
    }

    /* ================= Toggle Checkout Form ================= */
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function () {
            cartGrid.classList.add('checkout-active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function (e) {
            e.preventDefault();
            cartGrid.classList.remove('checkout-active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ================= Input Mask Formatting ================= */
    // Card Number Mask (#### #### #### ####)
    var cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', function (e) {
            var value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            var formatted = '';
            for (var i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            e.target.value = formatted;
        });
    }

    // Expiry Mask (MM/YY)
    var expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function (e) {
            var value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 2) {
                e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                e.target.value = value;
            }
        });
    }

    // CVV Mask (###)
    var cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
        });
    }

    /* ================= Form Field Validations ================= */
    function validateField(input) {
        var isValid = true;
        var value = input.value.trim();

        if (input.required && !value) {
            isValid = false;
        } else if (input.type === 'email' && value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (input.id === 'cardNumber' && value) {
            var cardDigits = value.replace(/\s+/g, '');
            isValid = cardDigits.length === 16;
        } else if (input.id === 'expiry' && value) {
            var expParts = value.split('/');
            if (expParts.length === 2) {
                var mm = parseInt(expParts[0], 10);
                var yy = parseInt(expParts[1], 10);
                isValid = mm >= 1 && mm <= 12 && yy >= 26; // Mock validation starting 2026
            } else {
                isValid = false;
            }
        } else if (input.id === 'cvv' && value) {
            isValid = value.length === 3;
        }

        if (isValid) {
            input.classList.remove('is-invalid');
        } else {
            input.classList.add('is-invalid');
        }

        return isValid;
    }

    // Real-time blur validation
    if (checkoutForm) {
        checkoutForm.querySelectorAll('.form-input').forEach(function (input) {
            input.addEventListener('blur', function () {
                validateField(input);
            });
            input.addEventListener('input', function () {
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });
    }

    /* ================= Place Order / Submit Form ================= */
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formFields = checkoutForm.querySelectorAll('.form-input');
            var isFormValid = true;

            formFields.forEach(function (input) {
                var isFieldValid = validateField(input);
                if (!isFieldValid) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                if (window.SunvozToast) {
                    window.SunvozToast.show('Please fill in all shipping & payment fields correctly.', 'error');
                }
                // Scroll to the first error
                var firstErr = checkoutForm.querySelector('.form-input.is-invalid');
                if (firstErr) {
                    firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Simulated Checkout successful!
            var orderId = '#SVZ-' + Math.floor(100000 + Math.random() * 900000);
            var emailVal = document.getElementById('email').value;
            var cartItemsCount = window.SunvozCart.getCount();
            var cartTotalVal = totalEl.textContent;

            // Infill Success modal details
            successOrderId.textContent = orderId;
            successOrderEmail.textContent = emailVal;
            successOrderCount.textContent = cartItemsCount + (cartItemsCount === 1 ? ' item' : ' items');
            successOrderTotal.textContent = cartTotalVal;

            // Show success overlay modal
            var modal = bootstrap.Modal.getOrCreateInstance(successModalOverlay);
            modal.show();

            // Clear the actual cart from localStorage
            window.SunvozCart.clear();
        });
    }

    /* ================= Modal Close & Shop Redirection ================= */
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', function () {
            var modal = bootstrap.Modal.getOrCreateInstance(successModalOverlay);
            modal.hide();
            window.location.href = 'products.html';
        });
    }

    // Auto-open checkout if URL has ?checkout=true or similar
    if (window.location.search.indexOf('checkout=') !== -1) {
        if (proceedBtn) {
            setTimeout(function () {
                proceedBtn.click();
            }, 300);
        }
    }

    // Trigger initial render
    renderCart();
});
