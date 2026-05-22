/* ============================================================
   SUNVOZ — Blog Post Reader JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // 1. Parse URL Parameters
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('slug');
    var id = params.get('id');

    var posts = window.BLOG_POSTS || [];
    var currentPost = null;

    if (slug) {
        currentPost = posts.find(function (p) { return p.slug === slug; });
    } else if (id) {
        var numericId = parseInt(id, 10);
        currentPost = posts.find(function (p) { return p.id === numericId; });
    }

    // Fallback if no post matched
    if (!currentPost) {
        window.location.href = 'blog.html';
        return;
    }

    // Leaf Icon SVG for related cards
    var articleSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a7 7 0 0 1-8 10zm0 0v-5"/>' +
        '</svg>';

    // 2. Full Article HTML Database
    var articleContentDB = {
        '10-ways-eco-friendly-kitchen': 
            '<p>The kitchen is often called the heart of the home, but it is also one of the largest sources of household waste. From single-use plastic wraps to synthetic sponges and excessive energy consumption, our daily culinary habits can take a heavy toll on the environment. Fortunately, transforming your kitchen into an eco-friendly sanctuary is easier than you think. It does not require a complete remodel—instead, it starts with small, intentional swaps that yield a massive impact over time.</p>' +
            
            '<h2>1. Replace Plastic Wrap with Beeswax Wraps</h2>' +
            '<p>Single-use plastic wrap is one of the most stubborn pollutants in modern kitchens. It is hard to recycle, releases toxins, and ends up in our oceans. Natural beeswax wraps are a beautiful, reusable alternative. Crafted from organic cotton, pure beeswax, jojoba oil, and tree resin, these wraps are self-adhesive. The warmth of your hands helps mould the wrap over bowls, half-cut fruits, or sandwiches.</p>' +
            
            '<div class="article-tip-box">' +
                '<span class="article-tip-icon">🌿</span>' +
                '<div class="article-tip-content">' +
                    '<strong>Beeswax Wrap Care Tip:</strong>' +
                    'Always wash your beeswax food wraps in cool, soapy water. Using hot water will melt the wax base and shorten the lifespan of your wraps.' +
                '</div>' +
            '</div>' +
            
            '<h2>2. Transition to Bamboo Cooking Utensils</h2>' +
            '<p>Plastic utensils can leach harmful chemicals under high heat, while metal versions can scratch your premium non-stick pans. Bamboo is the perfect middle ground. It is incredibly durable, naturally antimicrobial, and heat-resistant. Best of all, bamboo is a fast-growing grass that regenerates rapidly, making it one of the most sustainable wood alternatives on Earth.</p>' +
            
            '<blockquote>' +
                '"Every organic fork, wooden bowl, and beeswax wrap we choose is a small step towards restoring our relationship with the natural world. Our kitchen choices matter."' +
            '</blockquote>' +
            
            '<h2>3. Banish Synthetic Sponges</h2>' +
            '<p>Did you know standard kitchen sponges are made of synthetic foam and plastic polymers? As you wash dishes, they shed microplastics directly into the water supply. Swap them for natural sea sponges, loofahs, or brushes made from coconut fibres or horsehair. These tools scrub just as effectively and degrade naturally at the end of their life cycle.</p>' +
            
            '<h2>4. Embrace Bulk Buying & Storage Jars</h2>' +
            '<p>Reduce packaging waste by purchasing grains, spices, oils, and snacks from bulk stores. Bring your own organic cotton bags, then transfer items into stylish, airtight glass jars. This not only keeps your food fresher for longer but also creates a gorgeous, organized pantry display that feels warm and modern.</p>' +
            
            '<p>By incorporating these simple adjustments into your daily routine, you will dramatically reduce your environmental footprint while creating a kitchen that is beautiful, mindful, and functional. Take it one swap at a time!</p>',

        'art-of-slow-living-beginners-guide':
            '<p>In today’s fast-paced world, the pressure to constant produce and hurry is omnipresent. The "hustle" culture has crept into our weekends, our families, and our homes. Slow living is the gentle counter-revolution. It is not about doing everything at a snail’s pace; rather, it is about doing things at the right pace. It is the conscious choice to cultivate presence, appreciation, and simplicity in our daily routines and living spaces.</p>' +
            
            '<h2>Designing a Home for Stillness</h2>' +
            '<p>Our physical environment shapes our internal state. A cluttered, chaotic room fosters a cluttered, anxious mind. To practice slow living, look at your home as a sanctuary. Introduce organic materials like raw linen, wicker baskets, and solid wood that age gracefully and connect you with the outdoor world. Choose soft, earth-toned color palettes that reflect natural light and calm the nervous system.</p>' +
            
            '<blockquote>' +
                '"Slow living is not about stopping; it is about choosing to be present in whatever you are doing, from brewing your morning tea to folding your laundry."' +
            '</blockquote>' +
            
            '<h2>Slowing Down Your Daily Routines</h2>' +
            '<p>How do you start your day? Checking emails in bed creates instant urgency. Instead, try building a slow morning ritual. Brew your coffee or tea manually using a pour-over or teapot. Sit by the window, feel the warmth of the ceramic mug in your hands, and watch the day wake up. This small act of mindfulness creates a buffer of peace that carries through the rest of the day.</p>' +
            
            '<div class="article-tip-box">' +
                '<span class="article-tip-icon">🧘</span>' +
                '<div class="article-tip-content">' +
                    '<strong>A Simple Slow Ritual:</strong>' +
                    'Light a natural soy or coconut wax candle while writing in a leather journal for 5 minutes before bed. This sends a physical signal to your brain that it is safe to unwind.' +
                '</div>' +
            '</div>' +
            
            '<h2>Connecting with the Seasons</h2>' +
            '<p>Slow living is deeply tied to the rhythms of nature. Notice the shifting light, eat seasonal produce, and bring natural elements indoors. In spring, gather fresh flowers; in autumn, display dried herbs. Aligning your life with the earth’s natural tempo reminds us that everything has its season to bloom and its season to rest.</p>',

        'why-natural-materials-better-for-home':
            '<p>The materials we bring into our homes do more than fill physical space—they actively interact with our senses, our health, and our well-being. Modern residential design is saturated with synthetics, plastics, and petroleum-based sealants. However, returning to natural materials like bamboo, organic cotton, cork, and stoneware is not just an aesthetic trend; it is a vital step toward healthier living.</p>' +
            
            '<h2>1. Better Air Quality & Fewer Toxins</h2>' +
            '<p>Synthetic carpets, plastic organizers, and particleboard furniture often release Volatile Organic Compounds (VOCs) through a process called off-gassing. These chemicals pollute indoor air and can trigger allergies, headaches, and respiratory issues. Natural materials like solid wood, rattan, and linen do not off-gas, creating a cleaner, toxin-free breathing environment for you and your family.</p>' +
            
            '<div class="article-tip-box">' +
                '<span class="article-tip-icon">🍃</span>' +
                '<div class="article-tip-content">' +
                    '<strong>Did you know?</strong>' +
                    'NASA research shows that incorporating plants alongside natural porous surfaces (like cork and clay pots) can reduce indoor dust and chemical pollutants by up to 20%.' +
                '</div>' +
            '</div>' +
            
            '<h2>2. Tactile Warmth & Mental Well-being</h2>' +
            '<p>Biophilia is the innate human tendency to seek connections with nature. When we touch raw wood grain, soft organic cotton towels, or textured cork coaster sets, our stress levels decrease. Natural materials carry a tactile warmth and minor imperfections that synthetics cannot replicate. These elements ground us, making our living spaces feel cozy and inviting.</p>' +
            
            '<blockquote>' +
                '"Nature does not create plastic. By surrounding ourselves with materials that grew from the earth, we restore a vital biological connection that modern city life often severs."' +
            '</blockquote>' +
            
            '<h2>3. Durability & Graceful Aging</h2>' +
            '<p>Plastic items wear down, crack, and end up in landfills. Natural materials, on the other hand, are built to last. An acacia wood salad bowl or hand-stitched leather journal grows more beautiful with age, developing a unique patina that tells the story of your home. They are investments in longevity and sustainability.</p>',

        'indoor-gardening-101-herbs-year-round':
            '<p>You do not need acres of land or a sprawling greenhouse to enjoy the satisfaction of growing your own food. Indoor herb gardening allows you to cultivate fresh, vibrant flavors right on your kitchen windowsill. Whether you are an absolute beginner or a seasoned gardener, growing herbs indoors is an accessible way to green your space and elevate your culinary creations.</p>' +
            
            '<h2>Finding the Perfect Windowsill</h2>' +
            '<p>Herbs are sun lovers. Most culinary herbs require at least six hours of direct sunlight daily. A south- or west-facing window is ideal. If your kitchen does not receive enough natural light, do not worry—you can easily supplement with compact LED grow lights designed specifically for indoor herbs.</p>' +
            
            '<div class="article-tip-box">' +
                '<span class="article-tip-icon">🌱</span>' +
                '<div class="article-tip-content">' +
                    '<strong>Top 3 Beginner Herbs:</strong>' +
                    '<strong>1. Basil:</strong> Loves warmth and water. Excellent for pastas.<br>' +
                    '<strong>2. Rosemary:</strong> Prefers drier soil. Smells incredible.<br>' +
                    '<strong>3. Mint:</strong> Incredibly hardy, grows rapidly in almost any pot.' +
                '</div>' +
            '</div>' +
            
            '<h2>Watering & Soil Basics</h2>' +
            '<p>The number one killer of indoor herbs is overwatering. Sitting in soggy soil causes root rot. Always choose pots with proper drainage holes and a saucer underneath. Use a lightweight, organic potting soil combined with coconut coir to ensure excellent drainage. Water only when the top inch of soil feels completely dry to the touch.</p>' +
            
            '<blockquote>' +
                '"Growing a garden, no matter how small, is a quiet act of faith in tomorrow. Picking fresh basil from your windowsill brings a simple, profound joy."' +
            '</blockquote>' +
            
            '<h2>Harvesting Your Bounty</h2>' +
            '<p>Regular harvesting actually encourages your herbs to grow bushier and produce more leaves. However, follow the golden rule: never harvest more than one-third of the plant at a single time. Snip leaves from the top rather than the bottom to stimulate healthy new side branches.</p>',

        'minimalist-bathroom-7-products':
            '<p>The bathroom is often the most plastic-heavy room in the entire house. Shampoos, conditioners, body washes, toothbrushes, and cosmetics create a constant stream of empty plastic bottles and packaging. Transitioning to a minimalist, zero-waste bathroom is not about throwing everything away—it is about curating a few high-quality, eco-friendly essentials that serve multiple purposes.</p>' +
            
            '<h2>The Simple Toothbrush Swap</h2>' +
            '<p>Every plastic toothbrush you have ever used still exists somewhere on this planet. Swapping to a biodegradable bamboo toothbrush set is the easiest change you can make. The Moso bamboo handles decompose naturally in a few months, while charcoal-infused bristles keep your teeth clean and white without synthetic chemicals.</p>' +
            
            '<h2>Artisan Bar Soaps Over Liquid Soap</h2>' +
            '<p>Liquid body washes are mostly water packaged in heavy plastic bottles. Cold-pressed artisan soaps, infused with organic lavender and shea butter, cleanse gently, moisturise deeply, and require zero plastic wrap. They look beautiful on a simple bamboo dish and last longer than liquid soap.</p>' +
            
            '<div class="article-tip-box">' +
                '<span class="article-tip-icon">🧼</span>' +
                '<div class="article-tip-content">' +
                    '<strong>Bathroom Care Tip:</strong>' +
                    'Always keep bar soaps on a slatted wood or bamboo dish. Allowing the bar to dry between uses prevents it from getting mushy and doubles its lifespan.' +
                '</div>' +
            '</div>' +
            
            '<h2>Natural Sea Sponges</h2>' +
            '<p>Ditch the colorful plastic bath loofahs. They trap bacteria and shed microplastics. Natural Mediterranean sea sponges are hypoallergenic, incredibly soft, and resist odor naturally. They create a rich lather and can be composted at the end of their lifecycle.</p>' +
            
            '<p>By embracing these minimalist essentials, you will clear off your countertops, simplify your morning routine, and create a calm, spa-like atmosphere that respects the environment.</p>',

        'how-we-source-behind-sunvoz-supply-chain':
            '<p>In the modern retail world, the journey of a product is often hidden behind closed doors. At Sunvoz, we believe in radical transparency. We believe you have the right to know exactly where our materials come from, who crafted them, and the environmental footprint of their journey to your doorstep.</p>' +
            
            '<h2>Partnering with Local Artisans</h2>' +
            '<p>We do not mass-produce our goods in giant industrial factories. Instead, we partner with small artisan cooperatives and family farms. For instance, our rattan storage baskets are hand-woven in Indonesia by local weavers using traditional techniques passed down through generations. These partnerships secure fair wages and preserve indigenous cultural crafts.</p>' +
            
            '<blockquote>' +
                '"Sustainability is not just about environmental protection; it is about social responsibility and honoring the human hands that shape the products we use every day."' +
            '</blockquote>' +
            
            '<h2>Sourcing Certified Raw Materials</h2>' +
            '<p>Every material is vetted against strict ecological standards. Our Moso bamboo is certified organic and harvested from managed forests. Our towels and linen are GOTS and OEKO-TEX certified, meaning they contain zero harmful chemical residues. We prioritize materials that are either rapidly renewable or recycled, such as ocean plastics and cork.</p>' +
            
            '<div class="article-tip-box">' +
                '<span class="article-tip-icon">📦</span>' +
                '<div class="article-tip-content">' +
                    '<strong>100% Plastic-free Packaging:</strong>' +
                    'We never use bubble wrap or plastic tape. Every Sunvoz shipment arrives in recycled kraft paper boxes, sealed with water-activated paper tape, and padded with cornstarch packing peanuts that dissolve in water.' +
                '</div>' +
            '</div>' +
            
            '<h2>Reducing the Carbon Footprint</h2>' +
            '<p>We optimize our logistics to minimize transit emissions, prioritizing sea freight over air. We offset 100% of our carbon emissions from shipping by investing in forest conservation and renewable energy initiatives. By choosing Sunvoz, you are supporting a carbon-neutral loop that respects the planet.</p>'
    };

    // 3. Render Post Contents
    function renderPost() {
        var formattedDate = formatDate(currentPost.date);

        // Header Metadata
        document.getElementById('breadcrumbPostTitle').textContent = currentPost.title;
        document.getElementById('articleCategory').textContent = currentPost.category;
        document.getElementById('articleTitle').textContent = currentPost.title;
        document.getElementById('articleAuthor').textContent = 'By ' + currentPost.author;
        document.getElementById('articleDate').textContent = formattedDate;
        document.getElementById('articleReadTime').textContent = currentPost.readTime;

        // Banner Styling
        var banner = document.getElementById('articleBanner');
        banner.style.background = currentPost.gradient;

        // Infill dynamic body text
        var bodyContainer = document.getElementById('articleBodyContent');
        var fullHTML = articleContentDB[currentPost.slug] || '<p>' + currentPost.excerpt + '</p><p>Full content is coming soon.</p>';
        bodyContainer.innerHTML = fullHTML;

        // Render Related articles
        renderRelated();
    }

    /* ================= Render Related Articles ================= */
    function renderRelated() {
        var relatedGrid = document.getElementById('relatedGrid');
        if (!relatedGrid) return;

        // Get 2 articles other than current one
        var relatedPosts = posts.filter(function (p) { return p.id !== currentPost.id; }).slice(0, 2);

        relatedGrid.innerHTML = '';

        relatedPosts.forEach(function (post) {
            var cardDate = formatDate(post.date);

            var relatedHTML = 
                '<article class="blog-card reveal">' +
                    '<div class="blog-card-img-wrapper" style="background: ' + post.gradient + '">' +
                        articleSvg +
                    '</div>' +
                    '<div class="blog-card-body">' +
                        '<span class="article-tag">' + post.category + '</span>' +
                        '<h3 class="blog-card-title">' +
                            '<a href="blog-post.html?slug=' + post.slug + '">' + post.title + '</a>' +
                        '</h3>' +
                        '<p class="blog-card-excerpt">' + post.excerpt + '</p>' +
                        '<div class="article-meta mt-auto">' +
                            '<span>' + cardDate + '</span>' +
                            '<span class="meta-dot"></span>' +
                            '<span>' + post.readTime + '</span>' +
                        '</div>' +
                        '<a href="blog-post.html?slug=' + post.slug + '" class="read-more-link mt-4">' +
                            'Read Article' +
                            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
                        '</a>' +
                    '</div>' +
                '</article>';

            relatedGrid.insertAdjacentHTML('beforeend', relatedHTML);
        });

        // Trigger animations for loaded cards
        var reveals = relatedGrid.querySelectorAll('.reveal');
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

    /* ================= Social Share Button Events ================= */
    document.querySelectorAll('.share-btn-icon').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var platform = btn.dataset.share;
            var url = window.location.href;
            var text = encodeURIComponent('Read "' + currentPost.title + '" on Sunvoz Journal! 🌿');

            if (platform === 'facebook') {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'width=600,height=400');
            } else if (platform === 'twitter') {
                window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + text, '_blank', 'width=600,height=300');
            } else if (platform === 'pinterest') {
                window.open('https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) + '&description=' + text, '_blank', 'width=600,height=500');
            }

            if (window.SunvozToast) {
                window.SunvozToast.show('Sharing window opened! Thanks for spreading the word 🌿', 'success');
            }
        });
    });

    // Run Initializer
    renderPost();
});
