/* ============================================================
   PRODUCT-DETAIL.JS — Sunvoz Product Details Panel Logic
   ============================================================ */

(function() {
    'use strict';

    // State Variables
    let product = null;
    let selectedQuantity = 1;
    let selectedGradientIndex = 0;

    // DOM References
    const breadcrumbProductName = document.getElementById('breadcrumbProductName');
    const container = document.getElementById('productDetailContainer');

    // Tab buttons & panes
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Related Products Grid
    const relatedGrid = document.getElementById('relatedProductsGrid');

    // Hardcoded gradients for thumbnail alternatives
    const thumbnailGradients = [
        'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
        'linear-gradient(180deg, #F6E6C8 0%, #FFECD2 100%)',
        'linear-gradient(45deg, #FFECD2 0%, #FCF5E5 100%)',
        'linear-gradient(225deg, #F6E6C8 0%, #FCF5E5 50%, #FFECD2 100%)'
    ];

    const categoryGradients = {
        kitchen: [
            'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
            'linear-gradient(180deg, #F5E5C0 0%, #FCF3DE 100%)',
            'linear-gradient(45deg, #F6E6C8 0%, #FFF3E0 100%)',
            'linear-gradient(225deg, #FFECD2 0%, #FCF5E5 100%)'
        ],
        bathroom: [
            'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
            'linear-gradient(180deg, #D4E9F7 0%, #F0F8FF 100%)',
            'linear-gradient(45deg, #E2F0FD 0%, #E8F4FD 100%)',
            'linear-gradient(225deg, #D4E9F7 0%, #E6F2FC 100%)'
        ],
        living: [
            'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
            'linear-gradient(180deg, #D8F3DC 0%, #F1F8E9 100%)',
            'linear-gradient(45deg, #E2F6E5 0%, #E8F5E9 100%)',
            'linear-gradient(225deg, #D8F3DC 0%, #E5F6E7 100%)'
        ],
        garden: [
            'linear-gradient(135deg, #C8E6C9 0%, #DCEDC8 50%, #F1F8E9 100%)',
            'linear-gradient(180deg, #C8E6C9 0%, #F1F8E9 100%)',
            'linear-gradient(45deg, #D5EDD6 0%, #E8F5E9 100%)',
            'linear-gradient(225deg, #C8E6C9 0%, #E3F2E4 100%)'
        ],
        office: [
            'linear-gradient(135deg, #F0EBE0 0%, #F5F0E8 50%, #FAF8F5 100%)',
            'linear-gradient(180deg, #F0EBE0 0%, #FAF8F5 100%)',
            'linear-gradient(45deg, #F3ECE2 0%, #FAF8F5 100%)',
            'linear-gradient(225deg, #F0EBE0 0%, #F4EFE5 100%)'
        ]
    };

    const categoryNames = {
        kitchen: 'Kitchen & Dining',
        bathroom: 'Bath & Body',
        living: 'Living Room',
        garden: 'Garden & Outdoor',
        office: 'Home Office'
    };

    // Category product icons
    const productDetailIcons = {
        kitchen: '<svg class="gallery-main-icon" id="mainImgIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
        bathroom: '<svg class="gallery-main-icon" id="mainImgIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M2 12h20"/><path d="M4 12V6a2 2 0 012-2h1"/><path d="M20 12v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4"/></svg>',
        living: '<svg class="gallery-main-icon" id="mainImgIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z"/></svg>',
        garden: '<svg class="gallery-main-icon" id="mainImgIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 22V8"/><path d="M12 8a6 6 0 00-6-6c0 3.3 2.7 6 6 6z"/><path d="M12 8a6 6 0 016-6c0 3.3-2.7 6-6 6z"/></svg>',
        office: '<svg class="gallery-main-icon" id="mainImgIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
    };

    // Initialize Page
    function init() {
        const productId = getProductIdFromUrl();
        if (!productId || !window.PRODUCTS) {
            showErrorState();
            return;
        }

        product = window.PRODUCTS.find(p => p.id === productId);
        if (!product) {
            showErrorState();
            return;
        }

        renderProductDetails();
        renderTabContent();
        renderRelatedProducts();
        setupTabSwitching();
    }

    // Parse URL parameter
    function getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'), 10);
        return isNaN(id) ? null : id;
    }

    // Render error page if product is invalid
    function showErrorState() {
        if (breadcrumbProductName) breadcrumbProductName.textContent = 'Error';
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <h3>Product not found</h3>
                    <p>We couldn't find the product you're looking for. It may have been discontinued or out of stock.</p>
                    <a href="products.html" class="btn btn-primary">Back to Shop</a>
                </div>`;
        }
    }

    // Bind data elements to main container
    function renderProductDetails() {
        if (!product) return;

        // Breadcrumb
        if (breadcrumbProductName) breadcrumbProductName.textContent = product.name;

        // Page title
        document.title = `${product.name} | Sunvoz`;

        const gradients = categoryGradients[product.category] || thumbnailGradients;
        const iconSvg = productDetailIcons[product.category] || productDetailIcons.kitchen;
        const catName = categoryNames[product.category] || product.category;

        // Badge
        let badgeHtml = '';
        if (product.badge) {
            badgeHtml = `<span class="badge badge-${product.badge} detail-badge-pos">${product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New' : product.badge === 'sale' ? 'Sale' : product.badge === 'eco' ? 'Eco Pick' : product.badge}</span>`;
        }

        // Stars
        const starsHtml = window.generateStars ? window.generateStars(product.rating) : '★★★★★';

        // Price
        let priceHtml = `$${product.price.toFixed(2)}`;
        if (product.originalPrice) {
            priceHtml += ` <span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
        }

        // Build main grids
        container.innerHTML = `
            <div class="detail-grid">
                <!-- Gallery Column -->
                <div class="gallery-container">
                    <div class="gallery-main" id="mainImgArea" style="background: ${gradients[0]}">
                        ${badgeHtml}
                        ${iconSvg}
                    </div>
                    <div class="gallery-thumbnails" id="galleryThumbnails">
                        ${gradients.map((grad, idx) => `
                            <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}" style="background: ${grad}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
                                </svg>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Buy Panel Column -->
                <div class="buy-panel">
                    <span class="buy-category">${catName}</span>
                    <h1 class="buy-title">${product.name}</h1>
                    
                    <div class="buy-rating">
                        <div class="stars">${starsHtml}</div>
                        <span class="count">(${product.reviewCount || 120} reviews)</span>
                    </div>

                    <div class="buy-price">${priceHtml}</div>

                    <p class="buy-short-desc">${product.shortDesc}</p>

                    <div class="buy-actions">
                        <div class="quantity-control">
                            <span class="qty-label">Quantity:</span>
                            <div class="qty-selector">
                                <button class="qty-btn" id="qtyMinus" aria-label="Decrease quantity">−</button>
                                <input type="number" class="qty-input" id="qtyInput" value="1" min="1" max="10" readonly>
                                <button class="qty-btn" id="qtyPlus" aria-label="Increase quantity">+</button>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <button class="btn btn-primary btn-add-to-cart" id="addToCartBtn">Add to Cart</button>
                            <button class="btn-wishlist" id="wishlistBtn" aria-label="Add to wishlist">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                            </button>
                        </div>
                    </div>

                    <div class="trust-indicators">
                        <div class="trust-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                            <span>Free Shipping</span>
                        </div>
                        <div class="trust-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"/></svg>
                            <span>30-Day Returns</span>
                        </div>
                        <div class="trust-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>Eco Certified</span>
                        </div>
                    </div>
                </div>
            </div>`;

        // Bind interactive event elements in buy-panel
        setupBuyPanelEvents();
    }

    // Set up listeners for quantity adjusters, thumbnail clicks, add to cart
    function setupBuyPanelEvents() {
        const qtyMinus = document.getElementById('qtyMinus');
        const qtyPlus = document.getElementById('qtyPlus');
        const qtyInput = document.getElementById('qtyInput');
        const addToCartBtn = document.getElementById('addToCartBtn');
        const wishlistBtn = document.getElementById('wishlistBtn');
        const mainImgArea = document.getElementById('mainImgArea');
        const mainImgIcon = document.getElementById('mainImgIcon');
        const thumbnailsContainer = document.getElementById('galleryThumbnails');

        const gradients = categoryGradients[product.category] || thumbnailGradients;

        // Minus click
        qtyMinus.addEventListener('click', () => {
            if (selectedQuantity > 1) {
                selectedQuantity--;
                qtyInput.value = selectedQuantity;
            }
        });

        // Plus click
        qtyPlus.addEventListener('click', () => {
            if (selectedQuantity < 10) {
                selectedQuantity++;
                qtyInput.value = selectedQuantity;
            }
        });

        // Thumbnail Click
        if (thumbnailsContainer) {
            thumbnailsContainer.addEventListener('click', (e) => {
                const thumb = e.target.closest('.gallery-thumb');
                if (!thumb) return;

                const index = parseInt(thumb.getAttribute('data-index'), 10);
                selectedGradientIndex = index;

                // Toggle active class
                document.querySelectorAll('.gallery-thumb').forEach(el => el.classList.remove('active'));
                thumb.classList.add('active');

                // Shift main area background
                mainImgArea.style.background = gradients[index];
                
                // Add tiny scale pop effect to icon
                if (mainImgIcon) {
                    mainImgIcon.style.transform = 'scale(0.85)';
                    setTimeout(() => {
                        mainImgIcon.style.transform = 'scale(1)';
                    }, 120);
                }
            });
        }

        // Add to Cart
        addToCartBtn.addEventListener('click', () => {
            if (window.SunvozCart) {
                window.SunvozCart.addItem(product.id, selectedQuantity);
            } else {
                // Fallback
                const cart = JSON.parse(localStorage.getItem('sunvoz_cart') || '[]');
                const existing = cart.find(item => item.id === product.id);
                if (existing) {
                    existing.qty += selectedQuantity;
                } else {
                    cart.push({ id: product.id, qty: selectedQuantity });
                }
                localStorage.setItem('sunvoz_cart', JSON.stringify(cart));
                const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
                const badge = document.getElementById('cartBadge');
                if (badge) {
                    badge.textContent = totalItems;
                    badge.classList.remove('bounce');
                    void badge.offsetWidth;
                    badge.classList.add('bounce');
                }
            }

            // Show toast notification
            if (window.SunvozToast && window.SunvozToast.show) {
                window.SunvozToast.show(`${selectedQuantity}x ${product.name} added to cart! 🛒`, 'success');
            }

            // Temporary button state update
            addToCartBtn.textContent = 'Added to Cart ✓';
            addToCartBtn.style.backgroundColor = 'var(--success)';
            addToCartBtn.style.borderColor = 'var(--success)';
            addToCartBtn.disabled = true;

            setTimeout(() => {
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.style.backgroundColor = '';
                addToCartBtn.style.borderColor = '';
                addToCartBtn.disabled = false;
            }, 1800);
        });

        // Wishlist click
        wishlistBtn.addEventListener('click', () => {
            const isWishlisted = wishlistBtn.classList.toggle('active');
            
            if (isWishlisted) {
                wishlistBtn.style.color = 'var(--error)';
                wishlistBtn.style.borderColor = 'var(--error)';
                wishlistBtn.style.backgroundColor = 'rgba(214, 69, 69, 0.08)';
                
                // Add heart animation
                wishlistBtn.querySelector('svg').style.transform = 'scale(1.3)';
                setTimeout(() => {
                    wishlistBtn.querySelector('svg').style.transform = '';
                }, 200);

                if (window.SunvozToast && window.SunvozToast.show) {
                    window.SunvozToast.show(`${product.name} added to wishlist! ❤️`, 'info');
                }
            } else {
                wishlistBtn.style.color = '';
                wishlistBtn.style.borderColor = '';
                wishlistBtn.style.backgroundColor = '';
                
                if (window.SunvozToast && window.SunvozToast.show) {
                    window.SunvozToast.show(`${product.name} removed from wishlist.`, 'info');
                }
            }
        });
    }

    // Render Tab Panels details
    function renderTabContent() {
        if (!product) return;

        // Description Tab
        const desc = document.getElementById('detailFullDesc');
        const featuresList = document.getElementById('detailFeaturesList');
        if (desc) desc.textContent = product.description || product.shortDesc;
        if (featuresList && product.features) {
            featuresList.innerHTML = product.features.map(feat => `<li>${feat}</li>`).join('');
        }

        // Details Tab
        const material = document.getElementById('detailMaterial');
        const dimensions = document.getElementById('detailDimensions');
        if (material) material.textContent = product.materials || 'Eco-friendly sustainable material';
        if (dimensions) dimensions.textContent = product.dimensions || 'N/A';

        // Reviews Tab
        const rCount = document.getElementById('tabReviewCount');
        const rCountText = document.getElementById('detailReviewCountText');
        const rNumber = document.getElementById('detailRatingNumber');
        const rStars = document.getElementById('detailStarsLarge');
        const rList = document.getElementById('detailReviewsList');

        const reviewCount = product.reviewCount || 120;
        if (rCount) rCount.textContent = reviewCount;
        if (rCountText) rCountText.textContent = reviewCount;
        if (rNumber) rNumber.textContent = product.rating.toFixed(1);
        if (rStars && window.generateStars) rStars.innerHTML = window.generateStars(product.rating);

        // Generate 3 mock reviews matching the rating
        if (rList) {
            // Pick 3 random matching reviews from data or hardcode realistic entries
            const mockReviews = [
                {
                    name: 'Sarah M.',
                    date: '2 weeks ago',
                    rating: 5,
                    text: 'Absolutely in love with this product! The sustainable quality is superb and it matches my minimalist home aesthetics perfectly. Packaging was completely plastic-free!'
                },
                {
                    name: 'Emily T.',
                    date: '1 month ago',
                    rating: Math.floor(product.rating),
                    text: 'Very functional and beautiful item. The craftsmanship is excellent. Deducted one star just because shipping took a day longer than expected, but otherwise highly recommend.'
                },
                {
                    name: 'Jason K.',
                    date: '2 months ago',
                    rating: 5,
                    text: 'Beautifully made and matches descriptions exactly. It is great to buy from a brand that takes eco certifications seriously. Will definitely buy more items from Sunvoz.'
                }
            ];

            rList.innerHTML = mockReviews.map(rev => {
                const initials = rev.name.split(' ').map(n => n[0]).join('');
                const stars = window.generateStars ? window.generateStars(rev.rating) : '★★★★★';
                return `
                    <div class="review-card">
                        <div class="review-meta">
                            <div class="review-author-info">
                                <div class="review-avatar">${initials}</div>
                                <div>
                                    <h5 class="review-name">${rev.name}</h5>
                                    <div class="review-stars">${stars}</div>
                                </div>
                            </div>
                            <span class="review-date">${rev.date}</span>
                        </div>
                        <p class="review-text">"${rev.text}"</p>
                    </div>`;
            }).join('');
        }
    }

    // Set up tabs triggers
    function setupTabSwitching() {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');

                // Update active tab buttons
                tabButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Toggle panels
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                });
                const activePane = document.getElementById(`tab-${target}`);
                if (activePane) activePane.classList.add('active');
            });
        });
    }

    // Render Related Products (same category, max 4, exclude current)
    function renderRelatedProducts() {
        if (!product || !relatedGrid || !window.PRODUCTS) return;

        const related = window.PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
        if (related.length === 0) {
            // fallback to any product
            related.push(...window.PRODUCTS.filter(p => p.id !== product.id).slice(0, 4));
        }

        relatedGrid.innerHTML = related.map((p, idx) => {
            if (window.SunvozHelpers && typeof window.SunvozHelpers.renderProductCard === 'function') {
                var cardHTML = window.SunvozHelpers.renderProductCard(p);
                return `<div class="col animate-on-scroll" style="animation-delay: ${idx * 50}ms">${cardHTML}</div>`;
            }
            var gradient = categoryGradients[p.category] || categoryGradients.kitchen;
            // custom icons or categories fallback
            var catName = categoryNames[p.category] || p.category;

            var badgeHtml = '';
            if (p.badge) {
                badgeHtml = `<span class="badge badge-${p.badge}">${p.badge === 'bestseller' ? 'Bestseller' : p.badge === 'new' ? 'New' : p.badge === 'sale' ? 'Sale' : p.badge === 'eco' ? 'Eco Pick' : p.badge}</span>`;
            }

            var stars = window.generateStars ? window.generateStars(p.rating) : '★★★★★';
            var priceHtml = `<span class="product-card-current-price">$${p.price.toFixed(2)}</span>`;
            if (p.originalPrice) {
                priceHtml += ` <span class="original-price">$${p.originalPrice.toFixed(2)}</span>`;
            }

            const iconMap = {
                kitchen: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
                bathroom: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M2 12h20"/><path d="M4 12V6a2 2 0 012-2h1"/><path d="M20 12v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4"/></svg>',
                living: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z"/></svg>',
                garden: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M12 22V8"/><path d="M12 8a6 6 0 00-6-6c0 3.3 2.7 6 6 6z"/><path d="M12 8a6 6 0 016-6c0 3.3-2.7 6-6 6z"/></svg>',
                office: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
            };

            var icon = iconMap[p.category] || iconMap.kitchen;

            return `
            <div class="col animate-on-scroll" style="animation-delay: ${idx * 50}ms">
                <div class="product-card" data-category="${p.category}">
                    <a href="product-detail.html?id=${p.id}">
                        <div class="product-card-img" style="background: ${gradient[0]}">
                            <div class="product-card-icon">${icon}</div>
                            ${badgeHtml}
                        </div>
                        <div class="product-card-info">
                            <span class="product-card-category">${catName}</span>
                            <h3 class="product-card-title">${p.name}</h3>
                            <div class="product-card-rating">
                                <div class="stars">${stars}</div>
                                <span class="review-count">(${p.reviewCount || 100})</span>
                            </div>
                            <div class="product-card-price">${priceHtml}</div>
                        </div>
                    </a>
                    <div class="product-card-actions">
                        <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
                    </div>
                </div>
            </div>`;
        }).join('');

        setupScrollAnimations();
    }

    // Related scroll trigger
    function setupScrollAnimations() {
        var elements = document.querySelectorAll('.animate-on-scroll');
        if (!('IntersectionObserver' in window)) {
            elements.forEach(function(el) { el.classList.add('visible'); });
            return;
        }
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        elements.forEach(function(el) { observer.observe(el); });
    }

    // Bootstrap
    init();

})();
