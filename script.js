document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop) {
      // Scroll down
      navbar.classList.add('hidden');
    } else {
      // Scroll up
      navbar.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    if (currentScroll > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fadeInUp, .animate-slideInLeft, .animate-slideInRight').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    observer.observe(el);
  });

  // Form submission handling
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      submitBtn.style.background = 'var(--gradient-3)';
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          submitBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Message Sent!';
          submitBtn.style.background = 'var(--gradient-4)';
          form.reset();
          
          const successMsg = document.createElement('div');
          successMsg.className = 'alert alert-success mt-3';
          successMsg.style.background = 'rgba(67, 233, 123, 0.2)';
          successMsg.style.border = '1px solid rgba(67, 233, 123, 0.3)';
          successMsg.style.color = '#fff';
          successMsg.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully!';
          form.appendChild(successMsg);
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'var(--gradient-1)';
            successMsg.remove();
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Failed to Send';
        submitBtn.style.background = 'var(--gradient-2)';
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'alert alert-danger mt-3';
        errorMsg.style.background = 'rgba(245, 87, 108, 0.2)';
        errorMsg.style.border = '1px solid rgba(245, 87, 108, 0.3)';
        errorMsg.style.color = '#fff';
        errorMsg.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Sorry, something went wrong. Please try again later.';
        form.appendChild(errorMsg);
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = 'var(--gradient-1)';
          errorMsg.remove();
        }, 3000);
      }
    });
  }

  // Card hover effects
  document.querySelectorAll('.glass-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Update year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });

  // Typewriter effect for hero title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    };
    
    setTimeout(typeWriter, 800);
  }
});