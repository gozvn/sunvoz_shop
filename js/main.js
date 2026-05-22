/* ========================================
   SUNVOZ — Main JS
   Navbar, mobile menu, language switcher, cart,
   toast, scroll animations, search overlay
   ======================================== */

(function () {
    'use strict';

    /* ========== Cart (SunvozCart) ========== */
    window.SunvozCart = {
        _key: 'sunvoz_cart',

        getCart: function () {
            try {
                return JSON.parse(localStorage.getItem(this._key)) || [];
            } catch (e) {
                return [];
            }
        },

        _save: function (cart) {
            localStorage.setItem(this._key, JSON.stringify(cart));
            this.updateBadge();
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        },

        addItem: function (productId, qty) {
            qty = qty || 1;
            var cart = this.getCart();
            var existing = cart.find(function (i) { return i.id === productId; });
            if (existing) {
                existing.qty += qty;
            } else {
                cart.push({ id: productId, qty: qty });
            }
            this._save(cart);
            window.dispatchEvent(new CustomEvent('cartItemAdded', { detail: { id: productId, qty: qty } }));
        },

        removeItem: function (productId) {
            var cart = this.getCart().filter(function (i) { return i.id !== productId; });
            this._save(cart);
        },

        updateQty: function (productId, qty) {
            if (qty < 1) { this.removeItem(productId); return; }
            var cart = this.getCart();
            var item = cart.find(function (i) { return i.id === productId; });
            if (item) { item.qty = qty; }
            this._save(cart);
        },

        getCount: function () {
            return this.getCart().reduce(function (s, i) { return s + i.qty; }, 0);
        },

        getTotal: function () {
            var products = window.PRODUCTS || [];
            return this.getCart().reduce(function (total, item) {
                var p = products.find(function (pr) { return pr.id === item.id; });
                return total + (p ? p.price * item.qty : 0);
            }, 0);
        },

        clear: function () {
            localStorage.removeItem(this._key);
            this.updateBadge();
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        },

        updateBadge: function () {
            var badge = document.getElementById('cartBadge');
            if (!badge) return;
            var count = this.getCount();
            badge.textContent = count;
            if (count > 0) {
                badge.classList.add('show');
            } else {
                badge.classList.remove('show');
            }
        }
    };

    /* ========== Navbar Scroll ========== */
    var navbar = document.getElementById('navbar');
    if (navbar) {
        var onScroll = function () {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ========== Mobile Menu ========== */
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    var navbarEl = document.getElementById('navbar');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var backdrop = document.getElementById('drawerBackdrop');
            var isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            if (navbarEl) navbarEl.classList.toggle('menu-open', isOpen);
            
            if (isOpen) {
                if (backdrop) backdrop.classList.add('active');
                document.body.classList.add('drawer-open');
                // Close cart drawer if open
                var cartDrawer = document.getElementById('cartDrawer');
                if (cartDrawer) cartDrawer.classList.remove('open');
            } else {
                if (backdrop) backdrop.classList.remove('active');
                document.body.classList.remove('drawer-open');
            }
        });
        
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                if (navbarEl) navbarEl.classList.remove('menu-open');
                var backdrop = document.getElementById('drawerBackdrop');
                if (backdrop) backdrop.classList.remove('active');
                document.body.classList.remove('drawer-open');
            });
        });
    }

    /* ========== Language Translation Settings ========== */
    window.SunvozTranslations = {
        en: {
            home: 'Home',
            shop: 'Shop',
            about: 'About',
            blog: 'Blog',
            searchPlaceholder: 'Search products, articles...',
            cartTitle: 'Your Cart',
            viewCart: 'View Cart',
            checkout: 'Proceed to Checkout',
            emptyCartTitle: 'Your cart is empty',
            emptyCartDesc: 'Add some sustainable essentials to start your journey.',
            shopCollection: 'Shop Collection',
            freeShippingUnlocked: 'Congratulations! You\'ve unlocked <span>FREE Shipping! 🚚</span>',
            freeShippingAway: 'You are <span>${needed}</span> away from <span>FREE Shipping!</span>',
            toastAdded: '${name} added to cart 🛒',
            subtotal: 'Subtotal',
            shipping: 'Shipping',
            estTotal: 'Estimated Total',
            free: 'FREE',
            welcomeNewsletter: 'Welcome to the Sunvoz community! 🌿'
        },
        vi: {
            home: 'Trang chủ',
            shop: 'Cửa hàng',
            about: 'Giới thiệu',
            blog: 'Tin tức',
            searchPlaceholder: 'Tìm kiếm sản phẩm, bài viết...',
            cartTitle: 'Giỏ hàng của bạn',
            viewCart: 'Xem giỏ hàng',
            checkout: 'Tiến hành thanh toán',
            emptyCartTitle: 'Giỏ hàng của bạn đang trống',
            emptyCartDesc: 'Hãy thêm những sản phẩm thân thiện với môi trường để bắt đầu.',
            shopCollection: 'Mua sắm ngay',
            freeShippingUnlocked: 'Chúc mừng! Bạn đã được <span>Miễn phí vận chuyển! 🚚</span>',
            freeShippingAway: 'Bạn còn thiếu <span>${needed}</span> để được <span>Miễn phí vận chuyển!</span>',
            toastAdded: 'Đã thêm ${name} vào giỏ hàng 🛒',
            subtotal: 'Tạm tính',
            shipping: 'Vận chuyển',
            estTotal: 'Tổng ước tính',
            free: 'MIỄN PHÍ',
            welcomeNewsletter: 'Chào mừng bạn đến với cộng đồng Sunvoz! 🌿'
        }
    };

    window.SunvozLang = {
        getCurrent: function () {
            return localStorage.getItem('sunvoz_lang') || 'en';
        },
        setCurrent: function (lang) {
            localStorage.setItem('sunvoz_lang', lang);
            this.apply();
            window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: lang } }));
        },
        get: function (key, replacements) {
            var lang = this.getCurrent();
            var t = window.SunvozTranslations[lang] || window.SunvozTranslations.en;
            var text = t[key] || key;
            if (replacements) {
                for (var rKey in replacements) {
                    text = text.replace('${' + rKey + '}', replacements[rKey]);
                }
            }
            return text;
        },
        apply: function () {
            var lang = this.getCurrent();
            var t = window.SunvozTranslations[lang] || window.SunvozTranslations.en;

            // Translate Navbar links
            var navLinks = document.getElementById('navLinks');
            if (navLinks) {
                navLinks.querySelectorAll('.nav-link').forEach(function (link) {
                    var page = link.getAttribute('data-page');
                    if (page && t[page]) {
                        link.textContent = t[page];
                    }
                });
            }

            // Translate Search Overlay Input placeholder
            var searchInput = document.getElementById('searchOverlayInput');
            if (searchInput) {
                searchInput.placeholder = t.searchPlaceholder;
            }

            // Update language btn text and options
            var langBtn = document.getElementById('langBtn');
            var langDropdown = document.getElementById('langDropdown');
            if (langBtn && langDropdown) {
                var btnSpan = langBtn.querySelector('span');
                if (btnSpan) btnSpan.textContent = lang.toUpperCase();
                langDropdown.querySelectorAll('.lang-option').forEach(function (opt) {
                    var dataLang = opt.getAttribute('data-lang') || opt.dataset.lang;
                    if (dataLang === lang) {
                        opt.classList.add('active');
                    } else {
                        opt.classList.remove('active');
                    }
                });
            }

            // Update cart drawer title if it exists
            var drawerCount = document.getElementById('cartDrawerCount');
            if (drawerCount) {
                var h2 = drawerCount.closest('h2');
                if (h2) {
                    var count = window.SunvozCart.getCount();
                    h2.innerHTML = t.cartTitle + ' (<span id="cartDrawerCount">' + count + '</span>)';
                }
            }

            // Re-render cart drawer if it is open
            if (window.SunvozCartDrawer && typeof window.SunvozCartDrawer.render === 'function') {
                window.SunvozCartDrawer.render();
            }
        }
    };

    /* ========== Language Switcher ========== */
    var langBtn = document.getElementById('langBtn');
    var langDropdown = document.getElementById('langDropdown');
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
        langDropdown.querySelectorAll('.lang-option').forEach(function (opt) {
            opt.addEventListener('click', function (e) {
                e.preventDefault();
                var selected = opt.getAttribute('data-lang') || opt.dataset.lang;
                window.SunvozLang.setCurrent(selected);
                langDropdown.classList.remove('show');
            });
        });
        document.addEventListener('click', function () {
            langDropdown.classList.remove('show');
        });
    }

    /* ========== Search Overlay ========== */
    var searchToggle = document.getElementById('searchToggle');
    var searchOverlay = document.getElementById('searchOverlay');
    if (searchToggle) {
        if (!searchOverlay) {
            var overlay = document.createElement('div');
            overlay.className = 'search-overlay';
            overlay.id = 'searchOverlay';
            overlay.innerHTML = '<div class="search-box">' +
                '<input type="text" class="search-input" placeholder="Search products, articles..." id="searchOverlayInput" autocomplete="off">' +
                '<button type="button" class="search-submit" id="searchSubmit" aria-label="Submit search">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
                '</button>' +
                '</div>' +
                '<button class="search-close" id="searchClose" aria-label="Close search" style="position:absolute;top:24px;right:24px;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.15);color:#fff;border:none;cursor:pointer;font-size:1.2rem;transition:background 0.2s;">&#10005;</button>';
            document.body.appendChild(overlay);
            searchOverlay = overlay;
        }

        var handleSearchSubmit = function () {
            var inp = document.getElementById('searchOverlayInput');
            if (inp) {
                var val = inp.value.trim();
                if (val) {
                    window.location.href = 'products.html?q=' + encodeURIComponent(val);
                }
            }
        };

        searchToggle.addEventListener('click', function () {
            var inp = document.getElementById('searchOverlayInput');
            if (inp) {
                inp.placeholder = window.SunvozLang.get('searchPlaceholder');
            }
            searchOverlay.classList.add('active');
            setTimeout(function () {
                if (inp) inp.focus();
            }, 200);
        });

        document.addEventListener('click', function (e) {
            if (e.target.id === 'searchSubmit' || e.target.closest('#searchSubmit')) {
                handleSearchSubmit();
            }
            if (e.target.id === 'searchClose' || e.target.closest('#searchClose')) {
                searchOverlay.classList.remove('active');
            }
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (searchOverlay.classList.contains('active')) {
                if (e.key === 'Enter') {
                    handleSearchSubmit();
                } else if (e.key === 'Escape') {
                    searchOverlay.classList.remove('active');
                }
            }
        });
    }

    /* ========== Toast Notifications ========== */
    window.SunvozToast = {
        show: function (message, type) {
            type = type || 'success';
            var container = document.getElementById('toastContainer');
            if (!container) {
                container = document.createElement('div');
                container.className = 'toast-container';
                container.id = 'toastContainer';
                document.body.appendChild(container);
            }
            var toast = document.createElement('div');
            toast.className = 'toast toast--' + type;
            toast.innerHTML = '<span>' + message + '</span>' +
                '<button class="toast-close" aria-label="Close">&#10005;</button>';
            container.appendChild(toast);
            requestAnimationFrame(function () {
                toast.classList.add('show');
            });
            toast.querySelector('.toast-close').addEventListener('click', function () {
                toast.classList.remove('show');
                setTimeout(function () { toast.remove(); }, 300);
            });
            setTimeout(function () {
                toast.classList.remove('show');
                setTimeout(function () { toast.remove(); }, 300);
            }, 3500);
        }
    };

    /* ========== Scroll Reveal ========== */
    var revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(function (el) { revealObserver.observe(el); });
    }

    /* ========== Newsletter Form ========== */
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = newsletterForm.querySelector('.newsletter-input');
            if (input && input.value.trim()) {
                var msg = window.SunvozLang.get('welcomeNewsletter');
                SunvozToast.show(msg, 'success');
                input.value = '';
            }
        });
    }

    /* ========== Init Cart Badge ========== */
    SunvozCart.updateBadge();

    /* ========== Helpers ========== */
    window.SunvozHelpers = {
        getCategoryGradient: function (category) {
            var gradients = {
                kitchen: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
                bathroom: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
                living: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
                garden: 'linear-gradient(135deg, #C8E6C9 0%, #DCEDC8 50%, #F1F8E9 100%)',
                office: 'linear-gradient(135deg, #F0EBE0 0%, #F5F0E8 50%, #FAF8F5 100%)'
            };
            return gradients[category] || gradients.living;
        },

        getCategoryName: function (categoryId) {
            var names = {
                kitchen: 'Kitchen & Dining',
                bathroom: 'Bath & Body',
                living: 'Living Room',
                garden: 'Garden & Outdoor',
                office: 'Home Office'
            };
            return names[categoryId] || categoryId;
        },

        getCategoryIcon: function (category) {
            var icons = {
                kitchen: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 8v20c0 4.4 3.6 8 8 8h8c4.4 0 8-3.6 8-8V8"/><line x1="32" y1="36" x2="32" y2="56"/><line x1="24" y1="56" x2="40" y2="56"/><line x1="20" y1="18" x2="44" y2="18"/></svg>',
                bathroom: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 32h40v4c0 8.8-7.2 16-16 16H28c-8.8 0-16-7.2-16-16v-4z"/><path d="M16 32V16c0-4.4 3.6-8 8-8h0c4.4 0 8 3.6 8 8v2"/><circle cx="38" cy="24" r="2"/><circle cx="44" cy="18" r="2"/></svg>',
                living: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 40V28c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v12"/><path d="M8 40c0-2.2 1.8-4 4-4v12h40V36c2.2 0 4 1.8 4 4v8H8v-8z"/><line x1="16" y1="52" x2="16" y2="56"/><line x1="48" y1="52" x2="48" y2="56"/></svg>',
                garden: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M32 56V32"/><path d="M32 32c-8-8-20-6-20 4 8 1 14-2 20-4z"/><path d="M32 24c6-10 18-10 20 0-6 2-14 0-20 0z"/><path d="M32 38c-4-4-6-12 0-18"/><path d="M24 56h16"/></svg>',
                office: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="14" y="8" width="36" height="28" rx="2"/><line x1="32" y1="36" x2="32" y2="44"/><line x1="22" y1="44" x2="42" y2="44"/><line x1="14" y1="18" x2="50" y2="18"/><circle cx="32" cy="28" r="4"/></svg>'
            };
            return icons[category] || icons.living;
        },

        getStarsHTML: function (rating) {
            var html = '<div class="stars">';
            for (var i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    html += '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.68l5.34-.78L10 1z"/></svg>';
                } else if (i - 0.5 <= rating) {
                    html += '<svg viewBox="0 0 20 20"><defs><linearGradient id="hg' + i + '"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#E8E5DF"/></linearGradient></defs><path fill="url(#hg' + i + ')" d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.68l5.34-.78L10 1z"/></svg>';
                } else {
                    html += '<svg viewBox="0 0 20 20" fill="#E8E5DF"><path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.68l5.34-.78L10 1z"/></svg>';
                }
            }
            html += '</div>';
            return html;
        },

        renderProductCard: function (product) {
            var gradient = this.getCategoryGradient(product.category);
            var icon = this.getCategoryIcon(product.category);
            var badgeHTML = '';
            if (product.badge === 'sale') {
                badgeHTML = '<span class="product-card-badge product-card-badge--sale">Sale</span>';
            } else if (product.badge === 'new' || product.isNew) {
                badgeHTML = '<span class="product-card-badge product-card-badge--new">New</span>';
            }
            var priceHTML = '<span class="price-current">$' + product.price.toFixed(2) + '</span>';
            if (product.originalPrice) {
                priceHTML += '<span class="price-original">$' + product.originalPrice.toFixed(2) + '</span>';
            }

            return '<article class="product-card" data-id="' + product.id + '">' +
                '<div class="product-card-img" style="background:' + gradient + '">' +
                icon +
                badgeHTML +
                '<button class="product-card-wishlist" aria-label="Add to wishlist"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>' +
                '</div>' +
                '<div class="product-card-body">' +
                '<div class="product-card-category">' + this.getCategoryName(product.category) + '</div>' +
                '<h3 class="product-card-name"><a href="product-detail.html?id=' + product.id + '">' + product.name + '</a></h3>' +
                '<div class="product-card-rating">' +
                this.getStarsHTML(product.rating) +
                '<span class="rating-count">(' + product.reviews + ')</span>' +
                '</div>' +
                '<div class="product-card-footer">' +
                '<div class="product-card-price">' + priceHTML + '</div>' +
                '<button class="product-card-cart-btn" data-product-id="' + product.id + '" aria-label="Add to cart">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</article>';
        }
    };

    /* ========== Global Add-to-Cart delegation ========== */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.product-card-cart-btn, .add-to-cart-btn');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            var productId = parseInt(btn.dataset.productId || btn.getAttribute('data-id'), 10);
            if (isNaN(productId)) return;
            var product = (window.PRODUCTS || []).find(function (p) { return p.id === productId; });
            SunvozCart.addItem(productId, 1);
            if (product) {
                var msg = window.SunvozLang.get('toastAdded', { name: product.name });
                SunvozToast.show(msg, 'success');
            }
            if (btn.classList.contains('add-to-cart-btn')) {
                var originalText = btn.textContent;
                btn.textContent = window.SunvozLang.getCurrent() === 'vi' ? 'Đã thêm ✓' : 'Added ✓';
                btn.classList.add('btn-added');
                btn.disabled = true;
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.classList.remove('btn-added');
                    btn.disabled = false;
                }, 1500);
            }
        }
    });

    var lastAddedId = null;

    /* ========== Cart Drawer UI Controller ========== */
    window.SunvozCartDrawer = {
        init: function () {
            // Create backdrop
            var backdrop = document.getElementById('drawerBackdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'drawer-backdrop';
                backdrop.id = 'drawerBackdrop';
                document.body.appendChild(backdrop);
            }

            // Create drawer panel
            var drawer = document.getElementById('cartDrawer');
            if (!drawer) {
                drawer = document.createElement('div');
                drawer.className = 'cart-drawer';
                drawer.id = 'cartDrawer';
                drawer.setAttribute('aria-modal', 'true');
                drawer.setAttribute('role', 'dialog');
                drawer.innerHTML = 
                    '<div class="cart-drawer-header">' +
                    '    <h2>Your Cart (<span id="cartDrawerCount">0</span>)</h2>' +
                    '    <button class="cart-drawer-close" id="cartDrawerClose" aria-label="Close cart">&#10005;</button>' +
                    '</div>' +
                    '<div class="cart-drawer-shipping-progress" id="cartDrawerProgressContainer"></div>' +
                    '<div class="cart-drawer-items" id="cartDrawerItems"></div>' +
                    '<div class="cart-drawer-footer" id="cartDrawerFooter"></div>';
                document.body.appendChild(drawer);
            }

            // Event Listeners
            var self = this;
            var closeBtn = document.getElementById('cartDrawerClose');
            if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                    self.close();
                });
            }

            if (backdrop) {
                backdrop.addEventListener('click', function () {
                    self.close();
                    var hamburger = document.getElementById('hamburger');
                    var navLinks = document.getElementById('navLinks');
                    if (hamburger && navLinks) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('open');
                    }
                    var navbarEl = document.getElementById('navbar');
                    if (navbarEl) navbarEl.classList.remove('menu-open');
                });
            }

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    self.close();
                    var hamburger = document.getElementById('hamburger');
                    var navLinks = document.getElementById('navLinks');
                    if (hamburger && navLinks) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('open');
                    }
                    var navbarEl = document.getElementById('navbar');
                    if (navbarEl) navbarEl.classList.remove('menu-open');
                }
            });

            var navCartBtn = document.getElementById('navCartBtn');
            if (navCartBtn) {
                navCartBtn.addEventListener('click', function (e) {
                    if (window.location.pathname.indexOf('cart.html') !== -1) {
                        return;
                    }
                    e.preventDefault();
                    self.open();
                });
            }

            window.addEventListener('cartUpdated', function () {
                self.render();
            });

            window.addEventListener('cartItemAdded', function (e) {
                if (e.detail && e.detail.id) {
                    lastAddedId = e.detail.id;
                }
                var badge = document.getElementById('cartBadge');
                if (badge) {
                    badge.classList.remove('bounce');
                    void badge.offsetWidth; // trigger reflow
                    badge.classList.add('bounce');
                }
                if (window.location.pathname.indexOf('cart.html') === -1) {
                    self.open();
                }
            });

            window.SunvozLang.apply();
            this.render();
        },

        open: function () {
            var drawer = document.getElementById('cartDrawer');
            var backdrop = document.getElementById('drawerBackdrop');
            if (drawer && backdrop) {
                this.render();
                drawer.classList.add('open');
                backdrop.classList.add('active');
                document.body.classList.add('drawer-open');
                // Close mobile menu if open
                var hamburger = document.getElementById('hamburger');
                var navLinks = document.getElementById('navLinks');
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('open');
                }
                var navbarEl = document.getElementById('navbar');
                if (navbarEl) navbarEl.classList.remove('menu-open');
            }
        },

        close: function () {
            var drawer = document.getElementById('cartDrawer');
            var backdrop = document.getElementById('drawerBackdrop');
            if (drawer && backdrop) {
                drawer.classList.remove('open');
                var navLinks = document.getElementById('navLinks');
                if (!navLinks || (!navLinks.classList.contains('open') && !navLinks.classList.contains('active'))) {
                    backdrop.classList.remove('active');
                    document.body.classList.remove('drawer-open');
                }
            }
        },

        render: function () {
            var countEl = document.getElementById('cartDrawerCount');
            var progressContainer = document.getElementById('cartDrawerProgressContainer');
            var itemsContainer = document.getElementById('cartDrawerItems');
            var footerContainer = document.getElementById('cartDrawerFooter');

            if (!itemsContainer || !footerContainer) return;

            var cart = window.SunvozCart.getCart();
            var products = window.PRODUCTS || [];
            var count = window.SunvozCart.getCount();
            if (countEl) countEl.textContent = count;

            if (cart.length === 0) {
                if (progressContainer) progressContainer.style.display = 'none';
                itemsContainer.innerHTML = 
                    '<div class="cart-drawer-empty">' +
                    '    <div class="cart-drawer-empty-icon">' +
                    '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:64px;height:64px;margin:0 auto 20px;color:var(--accent-sage);">' +
                    '            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>' +
                    '            <line x1="3" y1="6" x2="21" y2="6"/>' +
                    '            <path d="M16 10a4 4 0 01-8 0"/>' +
                    '        </svg>' +
                    '    </div>' +
                    '    <h3>' + window.SunvozLang.get('emptyCartTitle') + '</h3>' +
                    '    <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:24px;">' + window.SunvozLang.get('emptyCartDesc') + '</p>' +
                    '    <button class="btn btn-primary" id="drawerShopBtn">' + window.SunvozLang.get('shopCollection') + '</button>' +
                    '</div>';

                var shopBtn = document.getElementById('drawerShopBtn');
                if (shopBtn) {
                    var self = this;
                    shopBtn.addEventListener('click', function () {
                        self.close();
                        window.location.href = 'products.html';
                    });
                }
                footerContainer.innerHTML = '';
                footerContainer.style.display = 'none';
                return;
            }

            footerContainer.style.display = 'block';

            // Free shipping logic
            if (progressContainer) {
                progressContainer.style.display = 'block';
                var subtotalForShipping = window.SunvozCart.getTotal();
                var freeShippingThreshold = 100;
                var progressPercent = Math.min((subtotalForShipping / freeShippingThreshold) * 100, 100);
                
                if (subtotalForShipping >= freeShippingThreshold) {
                    progressContainer.innerHTML = 
                        '<div class="shipping-progress-text">' + window.SunvozLang.get('freeShippingUnlocked') + '</div>' +
                        '<div class="shipping-progress-bar-bg">' +
                        '    <div class="shipping-progress-bar" style="width: 100%"></div>' +
                        '</div>';
                } else {
                    var needed = freeShippingThreshold - subtotalForShipping;
                    progressContainer.innerHTML = 
                        '<div class="shipping-progress-text">' + window.SunvozLang.get('freeShippingAway', { needed: '$' + needed.toFixed(2) }) + '</div>' +
                        '<div class="shipping-progress-bar-bg">' +
                        '    <div class="shipping-progress-bar" style="width: ' + progressPercent + '%"></div>' +
                        '</div>';
                }
            }

            // Items
            var itemsHTML = '';
            cart.forEach(function (item) {
                var p = products.find(function (product) { return product.id === item.id; });
                if (!p) return;

                var gradient = window.SunvozHelpers ? window.SunvozHelpers.getCategoryGradient(p.category) : '';
                var icon = window.SunvozHelpers ? window.SunvozHelpers.getCategoryIcon(p.category) : '';
                var categoryName = window.SunvozHelpers ? window.SunvozHelpers.getCategoryName(p.category) : p.category;

                var isHighlight = (item.id === lastAddedId);
                var highlightClass = isHighlight ? ' highlight' : '';

                itemsHTML += 
                    '<div class="cart-drawer-item' + highlightClass + '" data-id="' + p.id + '">' +
                    '    <div class="cart-drawer-item-img" style="background: ' + gradient + '">' +
                    '        ' + icon +
                    '    </div>' +
                    '    <div class="cart-drawer-item-details">' +
                    '        <div class="cart-drawer-item-category">' + categoryName + '</div>' +
                    '        <h4 class="cart-drawer-item-name"><a href="product-detail.html?id=' + p.id + '">' + p.name + '</a></h4>' +
                    '        <div class="cart-drawer-item-bottom">' +
                    '            <div class="drawer-qty">' +
                    '                <button class="drawer-qty-btn decrease-qty" data-id="' + p.id + '">-</button>' +
                    '                <span class="drawer-qty-val">' + item.qty + '</span>' +
                    '                <button class="drawer-qty-btn increase-qty" data-id="' + p.id + '">+</button>' +
                    '            </div>' +
                    '            <div class="cart-drawer-item-price">$' + (p.price * item.qty).toFixed(2) + '</div>' +
                    '        </div>' +
                    '    </div>' +
                    '    <button class="cart-drawer-item-remove remove-item-btn" data-id="' + p.id + '" aria-label="Remove item">' +
                    '        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                    '            <polyline points="3 6 5 6 21 6"></polyline>' +
                    '            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                    '        </svg>' +
                    '    </button>' +
                    '</div>';
            });
            itemsContainer.innerHTML = itemsHTML;
            lastAddedId = null;

            // Footer
            var subtotal = window.SunvozCart.getTotal();
            footerContainer.innerHTML = 
                '<div class="drawer-summary-row">' +
                '    <span>' + window.SunvozLang.get('subtotal') + '</span>' +
                '    <span style="font-weight: 600; color: var(--text-primary);">$' + subtotal.toFixed(2) + '</span>' +
                '</div>' +
                '<div class="drawer-summary-row">' +
                '    <span>' + window.SunvozLang.get('shipping') + '</span>' +
                '    <span>' + (subtotal >= 100 ? window.SunvozLang.get('free') : '$9.99') + '</span>' +
                '</div>' +
                '<div class="drawer-summary-row total">' +
                '    <span>' + window.SunvozLang.get('estTotal') + '</span>' +
                '    <span>$' + (subtotal >= 100 ? subtotal : subtotal + 9.99).toFixed(2) + '</span>' +
                '</div>' +
                '<div class="cart-drawer-actions">' +
                '    <a href="cart.html" class="btn btn-outline">' + window.SunvozLang.get('viewCart') + '</a>' +
                '    <a href="cart.html?checkout=true" class="btn btn-primary">' + window.SunvozLang.get('checkout') + '</a>' +
                '</div>';

            // Handlers
            itemsContainer.querySelectorAll('.decrease-qty').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var id = parseInt(btn.dataset.id, 10);
                    var item = cart.find(function (i) { return i.id === id; });
                    if (item) {
                        window.SunvozCart.updateQty(id, item.qty - 1);
                    }
                });
            });

            itemsContainer.querySelectorAll('.increase-qty').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var id = parseInt(btn.dataset.id, 10);
                    var item = cart.find(function (i) { return i.id === id; });
                    if (item) {
                        window.SunvozCart.updateQty(id, item.qty + 1);
                    }
                });
            });

            itemsContainer.querySelectorAll('.remove-item-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var id = parseInt(btn.dataset.id, 10);
                    window.SunvozCart.removeItem(id);
                });
            });
        }
    };

    /* ========== Init Cart Drawer ========== */
    window.SunvozCartDrawer.init();

})();
