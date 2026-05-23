/* ============================================================
   SUNVOZ — Blog List JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Elements
    var featuredPostContainer = document.getElementById('featuredPostContainer');
    var blogGrid = document.getElementById('blogGrid');
    var blogEmptyState = document.getElementById('blogEmptyState');
    var blogSearchInput = document.getElementById('blogSearchInput');
    var blogCategories = document.getElementById('blogCategories');
    var blogResetBtn = document.getElementById('blogResetBtn');

    // State
    var currentCategory = 'all';
    var searchQuery = '';

    // Leaf Icon SVG to represent articles
    var articleSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a7 7 0 0 1-8 10zm0 0v-5"/>' +
        '</svg>';

    /* ================= Render Blog Page ================= */
    function renderBlog() {
        var posts = window.BLOG_POSTS || [];

        // Apply filters
        var filtered = posts.filter(function (post) {
            var matchesCategory = (currentCategory === 'all') || (post.category === currentCategory);
            
            var matchesSearch = true;
            if (searchQuery) {
                var query = searchQuery.toLowerCase();
                matchesSearch = post.title.toLowerCase().indexOf(query) !== -1 ||
                                post.excerpt.toLowerCase().indexOf(query) !== -1 ||
                                post.author.toLowerCase().indexOf(query) !== -1 ||
                                post.category.toLowerCase().indexOf(query) !== -1;
            }

            return matchesCategory && matchesSearch;
        });

        // Toggle visibility
        if (filtered.length === 0) {
            featuredPostContainer.style.display = 'none';
            blogGrid.style.display = 'none';
            blogEmptyState.style.display = 'block';
            return;
        }

        blogEmptyState.style.display = 'none';

        // If no filter is active (category is all, search is empty), show first post as Featured
        var showFeatured = (currentCategory === 'all' && !searchQuery);
        var gridPosts = [];

        if (showFeatured && filtered.length > 0) {
            featuredPostContainer.style.display = 'block';
            renderFeatured(filtered[0]);
            gridPosts = filtered.slice(1);
        } else {
            featuredPostContainer.style.display = 'none';
            gridPosts = filtered;
        }

        renderGrid(gridPosts);
    }

    /* ================= Render Featured Post ================= */
    function renderFeatured(post) {
        var formattedDate = formatDate(post.date);
        
        var html = 
            '<article class="featured-article-card">' +
                '<div class="featured-img-wrapper" style="background: ' + post.gradient + '">' +
                    articleSvg +
                '</div>' +
                '<div class="featured-content">' +
                    '<span class="article-tag">' + post.category + '</span>' +
                    '<h2 class="featured-title">' +
                        '<a href="blog-post.html?slug=' + post.slug + '" style="text-decoration:none;color:inherit;">' + post.title + '</a>' +
                    '</h2>' +
                    '<p class="featured-excerpt">' + post.excerpt + '</p>' +
                    '<div class="article-meta">' +
                        '<span>By ' + post.author + '</span>' +
                        '<span class="meta-dot"></span>' +
                        '<span>' + formattedDate + '</span>' +
                        '<span class="meta-dot"></span>' +
                        '<span>' + post.readTime + '</span>' +
                    '</div>' +
                    '<a href="blog-post.html?slug=' + post.slug + '" class="read-more-link mt-4">' +
                        'Read Article' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
                    '</a>' +
                '</div>' +
            '</article>';
        
        featuredPostContainer.innerHTML = html;
    }

    /* ================= Render Post Grid ================= */
    function renderGrid(posts) {
        if (posts.length === 0) {
            blogGrid.style.display = 'none';
            return;
        }

        blogGrid.style.display = '';
        blogGrid.innerHTML = '';

        posts.forEach(function (post) {
            var formattedDate = formatDate(post.date);

            var cardHTML = 
                '<div class="col reveal">' +
                '<article class="blog-card h-100">' +
                    '<div class="blog-card-img-wrapper" style="background: ' + post.gradient + '">' +
                        articleSvg +
                    '</div>' +
                    '<div class="blog-card-body d-flex flex-column">' +
                        '<span class="article-tag">' + post.category + '</span>' +
                        '<h3 class="blog-card-title">' +
                            '<a href="blog-post.html?slug=' + post.slug + '">' + post.title + '</a>' +
                        '</h3>' +
                        '<p class="blog-card-excerpt">' + post.excerpt + '</p>' +
                        '<div class="article-meta mt-auto">' +
                            '<span>' + formattedDate + '</span>' +
                            '<span class="meta-dot"></span>' +
                            '<span>' + post.readTime + '</span>' +
                        '</div>' +
                        '<a href="blog-post.html?slug=' + post.slug + '" class="read-more-link mt-4">' +
                            'Read Article' +
                            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
                        '</a>' +
                    '</div>' +
                '</article>' +
                '</div>';
            
            blogGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Trigger animations for loaded cards
        var reveals = blogGrid.querySelectorAll('.reveal');
        if (reveals.length > 0 && typeof IntersectionObserver !== 'undefined') {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            reveals.forEach(function (el) { observer.observe(el); });
        } else {
            reveals.forEach(function (el) { el.classList.add('visible'); });
        }
    }

    /* ================= Helper: Format Date ================= */
    function formatDate(dateString) {
        try {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
        } catch (e) {
            return dateString;
        }
    }

    /* ================= Event Handlers ================= */
    // Category selection
    if (blogCategories) {
        blogCategories.querySelectorAll('.blog-cat-tag').forEach(function (tag) {
            tag.addEventListener('click', function () {
                blogCategories.querySelectorAll('.blog-cat-tag').forEach(function (t) { t.classList.remove('active'); });
                tag.classList.add('active');
                currentCategory = tag.dataset.category;
                renderBlog();
            });
        });
    }

    // Keyword search
    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', function (e) {
            searchQuery = e.target.value;
            renderBlog();
        });
    }

    // Reset button
    if (blogResetBtn) {
        blogResetBtn.addEventListener('click', function () {
            blogSearchInput.value = '';
            searchQuery = '';
            renderBlog();
        });
    }

    // Initial render
    renderBlog();
});
