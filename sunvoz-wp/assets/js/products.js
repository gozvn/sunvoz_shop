/* ============================================================
   PRODUCTS.JS — Sunvoz Product Catalog Logic
   Handles: filter, search, sort, param mapping, dynamic cards
   ============================================================ */

(function() {
    'use strict';

    // State Variables
    let currentFilters = {
        search: '',
        category: '',
        material: ''
    };
    let currentSort = 'featured';

    // DOM Elements
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const materialFilter = document.getElementById('materialFilter');
    const sortFilter = document.getElementById('sortFilter');
    const activeFiltersContainer = document.getElementById('activeFilters');
    const emptyState = document.getElementById('emptyState');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    // Helper mappings
    const categoryGradients = {
        kitchen: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
        bathroom: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
        living: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
        garden: 'linear-gradient(135deg, #C8E6C9 0%, #DCEDC8 50%, #F1F8E9 100%)',
        office: 'linear-gradient(135deg, #F0EBE0 0%, #F5F0E8 50%, #FAF8F5 100%)'
    };

    const categoryNames = {
        kitchen: 'Kitchen & Dining',
        bathroom: 'Bath & Body',
        living: 'Living Room',
        garden: 'Garden & Outdoor',
        office: 'Home Office'
    };

    const productIconsByCat = {
        kitchen: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
        bathroom: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M2 12h20"/><path d="M4 12V6a2 2 0 012-2h1"/><path d="M20 12v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4"/></svg>',
        living: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z"/></svg>',
        garden: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><path d="M12 22V8"/><path d="M12 8a6 6 0 00-6-6c0 3.3 2.7 6 6 6z"/><path d="M12 8a6 6 0 016-6c0 3.3-2.7 6-6 6z"/></svg>',
        office: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
    };

    // Initialize Page
    function init() {
        parseUrlParams();
        setupEventListeners();
        filterAndRenderProducts();
    }

    // Parse URL params for pre-filtering (e.g. ?category=kitchen)
    function parseUrlParams() {
        const params = new URLSearchParams(window.location.search);
        
        // Category
        const cat = params.get('category');
        if (cat) {
            // Find id matching slug if they differ, or map directly
            const matched = window.CATEGORIES ? window.CATEGORIES.find(c => c.id === cat) : null;
            if (matched || ['kitchen', 'bathroom', 'living', 'garden', 'office'].includes(cat)) {
                currentFilters.category = cat;
                if (categoryFilter) categoryFilter.value = cat;
            }
        }

        // Material
        const mat = params.get('material');
        if (mat && window.MATERIALS && window.MATERIALS.includes(mat)) {
            currentFilters.material = mat;
            if (materialFilter) materialFilter.value = mat;
        }

        // Search
        const q = params.get('q');
        if (q) {
            currentFilters.search = q;
            if (searchInput) searchInput.value = q;
        }
    }

    // Set up form listeners
    function setupEventListeners() {
        // Search Input (Real-time)
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentFilters.search = e.target.value.trim();
                filterAndRenderProducts();
            });
        }

        // Category Filter
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                currentFilters.category = e.target.value;
                filterAndRenderProducts();
            });
        }

        // Material Filter
        if (materialFilter) {
            materialFilter.addEventListener('change', (e) => {
                currentFilters.material = e.target.value;
                filterAndRenderProducts();
            });
        }

        // Sort Filter
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                currentSort = e.target.value;
                filterAndRenderProducts();
            });
        }

        // Reset Button inside Empty State
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetAllFilters);
        }

        // Clear active filters via chips
        if (activeFiltersContainer) {
            activeFiltersContainer.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.filter-chip-remove');
                if (!removeBtn) return;
                
                const filterType = removeBtn.getAttribute('data-type');
                if (filterType) {
                    currentFilters[filterType] = '';
                    if (filterType === 'category' && categoryFilter) categoryFilter.value = '';
                    if (filterType === 'material' && materialFilter) materialFilter.value = '';
                    if (filterType === 'search' && searchInput) searchInput.value = '';
                    
                    filterAndRenderProducts();
                }
            });
        }
    }

    // Reset filters
    function resetAllFilters() {
        currentFilters = { search: '', category: '', material: '' };
        currentSort = 'featured';

        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (materialFilter) materialFilter.value = '';
        if (sortFilter) sortFilter.value = 'featured';

        filterAndRenderProducts();
    }

    // Core function to filter, sort, and render products
    function filterAndRenderProducts() {
        if (!window.PRODUCTS) return;

        // 1. Filter
        let filtered = window.PRODUCTS.filter(product => {
            // Search match (name or description)
            if (currentFilters.search) {
                const searchLower = currentFilters.search.toLowerCase();
                const matchName = product.name.toLowerCase().includes(searchLower);
                const matchDesc = product.shortDesc.toLowerCase().includes(searchLower);
                if (!matchName && !matchDesc) return false;
            }

            // Category match
            if (currentFilters.category && product.category !== currentFilters.category) {
                return false;
            }

            // Material match
            if (currentFilters.material) {
                // Ensure features or materials field checks
                const inMaterials = product.materials && product.materials.toLowerCase().includes(currentFilters.material.toLowerCase());
                const inFeatures = product.features && product.features.some(f => f.toLowerCase().includes(currentFilters.material.toLowerCase()));
                if (!inMaterials && !inFeatures) return false;
            }

            return true;
        });

        // 2. Sort
        if (currentSort === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (currentSort === 'newest') {
            filtered.sort((a, b) => b.id - a.id);
        } else {
            // 'featured' sorting - keeps order of data
            filtered.sort((a, b) => {
                // Prioritize bestseller badge first, then normal order
                const badgeA = a.badge === 'bestseller' ? 0 : 1;
                const badgeB = b.badge === 'bestseller' ? 0 : 1;
                return badgeA - badgeB || a.id - b.id;
            });
        }

        // Update counts
        if (productCount) {
            productCount.textContent = `(${filtered.length} product${filtered.length !== 1 ? 's' : ''})`;
        }

        // Render chips
        renderChips();

        // 3. Render
        if (filtered.length === 0) {
            productGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            productGrid.style.display = '';
            emptyState.style.display = 'none';
            
            productGrid.innerHTML = filtered.map((product, index) => {
                if (window.SunvozHelpers && typeof window.SunvozHelpers.renderProductCard === 'function') {
                    var cardHTML = window.SunvozHelpers.renderProductCard(product);
                    return `<div class="col animate-on-scroll" style="animation-delay: ${index * 50}ms">${cardHTML}</div>`;
                }
                var gradient = categoryGradients[product.category] || categoryGradients.kitchen;
                var icon = productIconsByCat[product.category] || productIconsByCat.kitchen;
                var catName = categoryNames[product.category] || product.category;
                
                var badgeHtml = '';
                if (product.badge) {
                    badgeHtml = `<span class="badge badge-${product.badge}">${product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New' : product.badge === 'sale' ? 'Sale' : product.badge === 'eco' ? 'Eco Pick' : product.badge}</span>`;
                }

                var stars = window.generateStars ? window.generateStars(product.rating) : '★★★★★';
                var priceHtml = `<span class="product-card-current-price">$${product.price.toFixed(2)}</span>`;
                if (product.originalPrice) {
                    priceHtml += ` <span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
                }

                // Add delay for stagger animation
                return `
                <div class="col animate-on-scroll" style="animation-delay: ${index * 50}ms">
                    <div class="product-card" data-category="${product.category}">
                        <a href="product-detail.html?id=${product.id}">
                            <div class="product-card-img" style="background: ${gradient}">
                                <div class="product-card-icon">${icon}</div>
                                ${badgeHtml}
                            </div>
                            <div class="product-card-info">
                                <span class="product-card-category">${catName}</span>
                                <h3 class="product-card-title">${product.name}</h3>
                                <div class="product-card-rating">
                                    <div class="stars">${stars}</div>
                                    <span class="review-count">(${product.reviewCount || 100})</span>
                                </div>
                                <div class="product-card-price">${priceHtml}</div>
                            </div>
                        </a>
                        <div class="product-card-actions">
                            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>`;
            }).join('');

            // Trigger scroll trigger animation setup
            setupScrollAnimations();
        }
    }

    // Render Filter Chips
    function renderChips() {
        if (!activeFiltersContainer) return;

        let chipsHtml = [];

        if (currentFilters.search) {
            chipsHtml.push(`
                <span class="filter-chip">
                    Search: "${currentFilters.search}"
                    <button class="filter-chip-remove" data-type="search" aria-label="Clear Search">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </span>`);
        }

        if (currentFilters.category) {
            chipsHtml.push(`
                <span class="filter-chip">
                    Category: ${categoryNames[currentFilters.category] || currentFilters.category}
                    <button class="filter-chip-remove" data-type="category" aria-label="Clear Category">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </span>`);
        }

        if (currentFilters.material) {
            chipsHtml.push(`
                <span class="filter-chip">
                    Material: ${currentFilters.material}
                    <button class="filter-chip-remove" data-type="material" aria-label="Clear Material">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </span>`);
        }

        activeFiltersContainer.innerHTML = chipsHtml.join('');
    }

    // Setup scroll reveal animation for filtered items
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
    document.addEventListener('DOMContentLoaded', init);

})();
