(() => {
  const $ = (selector) => document.querySelector(selector);
  const categoriesEl = $("#categories");
  const grid = $("#projectsGrid");
  const emptyState = $("#emptyState");
  const resultCount = $("#resultCount");
  const modal = $("#modal");
  const lightbox = $("#lightbox");
  let activeCategory = "all";
  let newestFirst = true;
  let lastFocused = null;

  const categoryMap = new Map(categories.map(c => [c.id, c]));

  function formatCount(n) {
    if (n === 1) return "1 работа";
    if (n >= 2 && n <= 4) return `${n} работы`;
    return `${n} работ`;
  }

  function projectDate(project) {
    return project.updated || project.published || 0;
  }

  function getCategoryProjects(categoryId) {
    return projects
      .filter(p => categoryId === "all" || p.category === categoryId)
      .sort((a, b) => newestFirst ? projectDate(b) - projectDate(a) : projectDate(a) - projectDate(b));
  }

  function renderCategories() {
    categoriesEl.innerHTML = "";
    categories.forEach(category => {
      const count = category.id === "all"
        ? projects.length
        : projects.filter(p => p.category === category.id).length;

      const button = document.createElement("button");
      button.className = `category-button ${activeCategory === category.id ? "active" : ""}`;
      button.type = "button";
      button.dataset.category = category.id;
      button.innerHTML = `<span>${escapeHtml(category.name)}</span><b>${count}</b>`;
      button.addEventListener("click", () => {
        activeCategory = category.id;
        renderCategories();
        renderProjects();
      });
      categoriesEl.appendChild(button);
    });
  }

  function renderProjects() {
    const visible = getCategoryProjects(activeCategory);
    resultCount.textContent = formatCount(visible.length);
    grid.innerHTML = "";
    emptyState.hidden = visible.length !== 0;

    visible.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.style.setProperty("--delay", `${Math.min(index * 45, 280)}ms`);
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Открыть проект ${project.title}`);
      card.innerHTML = `
        <div class="card-image-wrap">
          <img class="card-image" src="${safeAttr(project.image)}" alt="${safeAttr(project.title)}" loading="lazy">
          <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h2>${escapeHtml(project.title)}</h2>
            <span class="open-icon">↗</span>
          </div>
          <div class="card-year">${formatYears(project)}</div>
          <p>${escapeHtml(project.description)}</p>
          <div class="tags">${project.tags.map(tag => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      `;
      card.addEventListener("click", () => openProject(project));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject(project);
        }
      });
      grid.appendChild(card);
    });
  }

  function openProject(project) {
    lastFocused = document.activeElement;
    $("#modalCategory").textContent = categoryMap.get(project.category)?.name || "PROJECT";
    $("#modalTitle").textContent = project.title;
    $("#modalYear").textContent = formatYears(project);
    $("#modalDescription").textContent = project.description;

    const tags = $("#modalTags");
    tags.innerHTML = project.tags.map(tag => `<span>#${escapeHtml(tag)}</span>`).join("");

    const main = $("#modalMainImage");
    main.src = project.image;
    main.alt = project.title;

    const gallery = $("#modalGallery");
    gallery.innerHTML = "";
    const shots = project.screenshots?.length ? project.screenshots : [project.image];
    $("#galleryCount").textContent = `${shots.length} кадр${shots.length === 1 ? "" : "а"}`;

    shots.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${project.title} — скриншот ${i + 1}`;
      img.loading = "lazy";
      img.tabIndex = 0;
      img.addEventListener("click", () => openLightbox(src, img.alt));
      img.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") openLightbox(src, img.alt);
      });
      gallery.appendChild(img);
    });

    const workshop = $("#workshopButton");
    const status = $("#projectStatus");
    if (project.workshop) {
      workshop.href = project.workshop;
      workshop.hidden = false;
      status.hidden = true;
    } else {
      workshop.hidden = true;
      status.hidden = false;
      status.textContent = statusText(project.status);
      status.dataset.status = project.status || "unavailable";
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => $(".modal-close").focus());
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  function openLightbox(src, alt) {
    $("#lightboxImage").src = src;
    $("#lightboxImage").alt = alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  function statusText(status) {
    return ({
      unavailable: "НЕДОСТУПНО",
      soon: "СКОРО",
      locked: "ЗАБЛОКИРОВАНО",
      concept: "КОНЦЕПТ"
    })[status] || "НЕДОСТУПНО";
  }

  function formatYears(project) {
    if (!project.published) return "";
    return project.updated && project.updated !== project.published
      ? `${project.published} — ${project.updated}`
      : `${project.published}`;
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[c]));
  }

  function safeAttr(value = "") {
    return escapeHtml(value);
  }

  $("#sortToggle").addEventListener("click", () => {
    newestFirst = !newestFirst;
    $("#sortToggle").innerHTML = `<span>${newestFirst ? "Новые" : "Старые"}</span><span class="sort-arrow">${newestFirst ? "↓" : "↑"}</span>`;
    renderProjects();
  });

  document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  $("#lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (lightbox.classList.contains("open")) closeLightbox();
    else if (modal.classList.contains("open")) closeModal();
  });

  function renderFooter() {
    $("#year").textContent = new Date().getFullYear();
    const socialLinks = $("#socialLinks");
    socialLinks.innerHTML = siteConfig.socials
      .map(item => `<a href="${safeAttr(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.name)}</a>`)
      .join("");
    $("#donateLink").href = siteConfig.donateUrl;
    $("#donateLink").hidden = !siteConfig.donateUrl || siteConfig.donateUrl === "#";
  }

  renderCategories();
  renderProjects();
  renderFooter();
})();
