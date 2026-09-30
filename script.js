import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { db, isFirebaseConfigured } from "./firebase.js";

// ================= NAVIGATION =================
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

// ================= ACTIVE MENU =================
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 130;
    if (window.scrollY >= top) current = section.id;
  });

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ================= REVEAL ANIMATION =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ================= FIREBASE CONTACT FORM =================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = "Please fill in all fields.";
      formMessage.className = "form-error";
      return;
    }

    // Basic email validation on the client.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.className = "form-error";
      return;
    }

    if (!isFirebaseConfigured) {
      formMessage.textContent = "The contact form is not connected to Firebase yet. Please contact me by email.";
      formMessage.className = "form-error";
      return;
    }

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      formMessage.textContent = "";
      formMessage.className = "";

      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });

      formMessage.textContent = "Thank you! Your message has been sent successfully.";
      formMessage.className = "form-success";
      contactForm.reset();
    } catch (error) {
      console.error("Firebase contact form error:", error);
      formMessage.textContent = "Unable to send your message right now. Please try again.";
      formMessage.className = "form-error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}

// ================= YEAR =================
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// ================= BACK TO TOP =================
const backTop = document.getElementById("backTop");

if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= CV DOWNLOAD =================
const cvButton = document.getElementById("cvButton");
if (cvButton) {
  cvButton.addEventListener("click", (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "Bonsa-Bashir-CV.pdf";
    link.download = "Bonsa-Bashir-CV.pdf";
    link.click();
  });
}
