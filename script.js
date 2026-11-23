
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// ROOM FILTERS
const filterButtons = document.querySelectorAll(".room-filter");
const roomCards = document.querySelectorAll(".room-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    roomCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});


// ROOM DETAILS MODAL
const roomModal = document.getElementById("roomModal");
const modalClose = document.getElementById("modalClose");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalBook = document.getElementById("modalBook");

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    modalName.textContent = button.dataset.name;
    modalPrice.textContent = button.dataset.price;
    modalDescription.textContent = button.dataset.description;

    roomModal.classList.add("open");
    roomModal.setAttribute("aria-hidden", "false");
    modalClose.focus();
  });
});

function closeRoomModal() {
  roomModal.classList.remove("open");
  roomModal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeRoomModal);

roomModal.addEventListener("click", event => {
  if (event.target === roomModal) {
    closeRoomModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeRoomModal();
  }
});

modalBook.addEventListener("click", closeRoomModal);


// BOOKING FORM DATE RULES
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

checkIn.min = getToday();
checkOut.min = getToday();

checkIn.addEventListener("change", () => {
  checkOut.min = checkIn.value || getToday();

  if (checkOut.value && checkOut.value <= checkIn.value) {
    checkOut.value = "";
  }
});


// BOOKING FORM DEMONSTRATION
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const email = document.getElementById("guestEmail").value.trim();
  const room = document.getElementById("roomChoice").value;
  const guests = document.getElementById("guestCount").value;

  if (checkIn.value < getToday()) {
    formMessage.textContent = "Please choose a valid check-in date.";
    return;
  }

  if (checkOut.value <= checkIn.value) {
    formMessage.textContent = "Check-out must be after check-in.";
    return;
  }

  formMessage.textContent =
    `Thank you, ${name}! Your sample booking enquiry for the ${room} has been recorded in this demonstration. No real reservation has been made.`;

  bookingForm.reset();
  checkIn.min = getToday();
  checkOut.min = getToday();
});


// INITIAL PAGE SETUP
closeRoomModal();

// GRANDORA SCROLL REVEAL ANIMATION

const grandoraElements = document.querySelectorAll(
  '.room-card, .section-heading, .amenity-card, .gallery-item'
);

const grandoraObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('grandora-reveal', 'active');
      grandoraObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

grandoraElements.forEach((element) => {
  element.classList.add('grandora-reveal');
  grandoraObserver.observe(element);
});