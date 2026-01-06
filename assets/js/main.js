(function(html) {
    "use strict";
    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';

    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');


    const ssPreloader = function() {
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });
    };

    const ssMobileMenu = function() {
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    };

    const ssScrollSpy = function() {
        const sections = document.querySelectorAll(".target-section");
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
            let scrollY = window.pageYOffset;

            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }
    };

    const ssViewAnimate = function() {
        const blocks = document.querySelectorAll("[data-animate-block]");
        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {
            let scrollY = window.pageYOffset;
            blocks.forEach(function(current) {
                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }
    };

    const blogs = [
        {
          id: "01",
          date: "Oct 09, 2025",
          title: "The Rise of No-Code + Low-Code: Should Developers Be Worried?",
          category: "Developer Career & Growth",
          tags: "#no-code, #low-code, #software-development, #AI, #futureofcoding",
          description: "This article examines the fast-growing rise of no-code and low-code platforms in 2025 and whether developers should be concerned. It highlights how these tools make simple websites, internal tools, and workflows easier to build, but still fall short when it comes to complex systems, scalability, integrations, and security. Instead of replacing developers, the article explains how no-code is reshaping their role—opening new opportunities for those who adapt, combine both approaches, and focus on higher-level problem-solving.",
          link: "https://rutvi-dhameliya.hashnode.dev/the-rise-of-no-code-low-code-should-developers-be-worried"
        },
        {
          id: "02",
          date: "Oct 09, 2025",
          title: "MVC in the Age of Microservices: Is It Still Useful?",
          category: "System Design & Architecture",
          tags: "#mvc, #software-architecture, #microservices, #webdev, #programming, #backend",
          description: "This article examines the relevance of the MVC (Model-View-Controller) design pattern in the age of microservices, component-based frontends, and serverless architectures. It discusses how MVC continues to provide structure and separation of concerns in traditional web apps while modern patterns like React components, API-first development, and microservices offer alternative approaches. The piece highlights that, although MVC may not be strictly applied everywhere, its principles remain foundational for building maintainable and scalable applications.",
          link: "https://rutvi-dhameliya.hashnode.dev/mvc-in-the-age-of-microservices-is-it-still-useful"
        },
        {
          id: "03",
          date: "Oct 09, 2025",
          title: "Why I Still Use CodeIgniter 3 (And Why That's Okay)",
          category: "Frameworks & Legacy Systems",
          tags: "#codeigniter3, #php, #webdev, #productivity, #legacy-code",
          description: "This article explains why CodeIgniter 3 remains relevant in 2025 despite being considered “old” by some developers. It highlights CI3's simplicity, speed, control, and predichility, and shows how modern practices—like versioned controllers, Composer autoloading, and frontend integrations—can extend its usefulness. The piece emphasizes that stability and maintainability often matter more than chasing the latest frameworks, making CI3 a practical choice for many production projects.",
          link: "https://rutvi-dhameliya.hashnode.dev/still-using-codeigniter-3"
        },
        {
          id: "04",
          date: "Oct 02, 2025",
          title: "How to Stay Updated in the Fast-Moving Tech World",
          category: "Developer Career & Growth",
          tags: "#programming, #tech-trends, #webdev, #learning-resources, #developer, #programming-news",
          description: "This article provides practical strategies for staying current in the rapidly evolving tech landscape. It covers ways to follow key news sources, leverage social media and newsletters, join communities, experiment with new tools, attend events, set learning goals, and automate content curation. The focus is on building sustainable habits that allow developers to continuously learn and adapt without feeling overwhelmed, ensuring their skills remain relevant and up-to-date.",
          link: "https://rutvi-dhameliya.hashnode.dev/stay-updated-in-tech"
        },
        {
          id: "05",
          date: "AUG 20, 2025",
          title: "Why My Portfolio Doesn't Have a Contact Form",
          category: "Portfolio & Personal Branding",
          tags: "#portfoliowebsite, #developerportfolio, #personalbrand",
          description: "This article explains why a contact form isn't always necessary on personal portfolios. It highlights that direct email links and professional profiles often build more trust, reduce friction, and prevent lost opportunities caused by form failures. The piece emphasizes simplifying the portfolio experience, making it easier for visitors to reach out, and focusing on meaningful conversations rather than collecting form submissions.",
          link: "https://rutvi-dhameliya.hashnode.dev/why-my-portfolio-doesnt-have-a-contact-form"
        },
        {
          id: "06",
          date: "AUG 12, 2025",
          title: "Prompt Engineering for Developers: Turning AI into a Backend Teammate",
          category: "AI for Developers",
          tags: "#promptengineering, #ai, #developertips",
          description: "This article explores how developers can leverage prompt engineering to turn AI into an effective backend teammate. It highlights practical strategies for accelerating problem-solving, generating optimized code, automating documentation, and reviewing code. By treating AI like a collaborative partner—providing context, roles, and iterative prompts—developers can save time, improve code quality, and enhance project architecture while learning new technologies more efficiently.",
          link: "https://rutvi-dhameliya.hashnode.dev/prompt-engineering-for-developers-turning-ai-into-a-backend-teammate"
        },
        {
          id: "07",
          date: "AUG 07, 2025",
          title: "Versioning Your 100+ Controllers in CI3 Without Changing a Single Route",
          category: "Backend Development",
          tags: "#php, #codeigniter, #legacy-code, #refactoring, #webdev",
          description: "This article demonstrates a practical method for refactoring and versioning 100+ controllers in a live CodeIgniter 3 application without altering routes or breaking frontend calls. It introduces a router-level controller versioning approach, using a localized/ directory and custom routing logic to seamlessly roll out new features while preserving existing endpoints. The piece highlights how thoughtful architecture and clever CI3 techniques can modernize legacy projects safely, reduce downtime, and prevent tech debt in production systems.",
          link: "https://rutvi-dhameliya.hashnode.dev/versioning-your-100-controllers-in-ci3-without-changing-a-single-route"
        }
    ];
    
    const list = document.querySelector(".blog-list");
    
    if (list) {
        blogs.forEach(b => { 
            list.innerHTML += `<a href="${b.link}" class="blog-item" target="_blank">
                                    <span class="blog-meta">${b.date} — ${b.category}</span>
                                    <h2 class="blog-title">${b.title}</h2>
                                    <p class="excerpt">${b.description}</p>
                                    <p class="tags">${b.tags}</p>
                                </a>`; 
        });
    }

    const ssSwiper = function() {
        const mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
        });
    }; 

    const ssLightbox = function() {
        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });
    };


    const ssAlertBoxes = function() {
        const boxes = document.querySelectorAll('.alert-box');
        boxes.forEach(function(box){
            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })
    };

    const ssMoveTo = function(){
        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });
    };

    (function ssInit() {
        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();
    })();

})(document.documentElement);