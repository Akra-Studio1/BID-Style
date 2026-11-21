
// Номер для демонстрационных заявок
const WHATSAPP_NUMBER = "77072727941";

// МОБИЛЬНОЕ МЕНЮ
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
    menuButton.classList.toggle("active");
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      menuButton.classList.remove("active");
    });
  });
}

// ПОДСТАНОВКА ВЫБРАННОГО НАПРАВЛЕНИЯ В ФОРМУ
document.querySelectorAll("[data-product]").forEach(link => {
  link.addEventListener("click", () => {
    const productSelect = document.querySelector("#productType");

    if (productSelect) {
      productSelect.value = link.dataset.product;
    }
  });
});

// ОТПРАВКА ЗАЯВКИ В WHATSAPP
const leadForm = document.querySelector("#leadForm");

if (leadForm) {
  leadForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.querySelector("#clientName").value.trim();
    const product = document.querySelector("#productType").value;
    const comment = document.querySelector("#clientComment").value.trim();
    const status = document.querySelector("#formStatus");

    if (!name || !product) {
      status.textContent = "Пожалуйста, заполните обязательные поля.";
      return;
    }

    const message =
      `Здравствуйте! Я оставляю заявку на сайте B.I.D Style.\n\n` +
      `Имя: ${name}\n` +
      `Интересует: ${product}\n` +
      `Комментарий: ${comment || "Не указан"}\n\n` +
      `Хотелось бы обсудить детали проекта.`;

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    status.textContent =
      "WhatsApp открыт. Нажмите «Отправить» в приложении, чтобы передать заявку.";
  });
}

// ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(section => {
  observer.observe(section);
});
