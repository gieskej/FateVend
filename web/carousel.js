// carousel.js
// The genre picker: the swipeable genre carousel (card + peek cards +
// indicator dots), its prev/next/jump navigation, and setGenre() — the single
// entry point that switches the active genre, syncs the toolbar <select> and
// the carousel to match, and kicks off that genre's icon preload. Owns the
// carousel's index state.
//
// Circular-import note: setGenre() calls preloadGenreIcons() (still in app.js,
// alongside the slot machine it feeds), so this imports it from app.js while
// app.js imports this module's navigation/render entry points. Safe in ESM —
// every cross-module reference is used at call time (a genre switch, a resize),
// never at module-evaluation time.

import { state } from "./state.js";
import { GENRE_CAROUSEL_DATA } from "./generator/manifests.js";
import { PACK_ICON_URLS, genreIconBase } from "./pack-assets.js";
import { preloadGenreIcons, clearRolledCharacter } from "./app.js";

// GENRE_CAROUSEL_DATA is imported from ./generator/manifests.js (derived from
// the per-genre manifests in display order).
let carouselIndex = 0;

// Prev/next cards only get room to peek out on desktop widths.
function carouselShowPeeks(width) {
  return width >= 600;
}

function genreCardHTML(g, modifierClass, onclick) {
  return `
    <div class="genre-card ${modifierClass}" ${onclick ? `onclick="${onclick}"` : ""} title="${modifierClass === "genre-card-peek" ? g.label : ""}">
      <div class="genre-card-image-wrap">
        <img class="genre-card-image"
          src="${PACK_ICON_URLS[g.id]?.["_genre.webp"] ?? `${genreIconBase(g.id)}_genre.webp`}"
          onerror="this.parentNode.innerHTML='<div class=&quot;genre-card-image-placeholder&quot;>⚙</div>'"
          alt="${g.label}" />
      </div>
      <div class="genre-card-info">
        <div class="genre-card-title">${g.label}</div>
        <div class="genre-card-desc">${g.desc}</div>
      </div>
    </div>`;
}

export function renderCarouselCard() {
  const n = GENRE_CAROUSEL_DATA.length;
  const g = GENRE_CAROUSEL_DATA[carouselIndex];

  let track = genreCardHTML(g, "genre-card-current", null);
  if (carouselShowPeeks(window.innerWidth)) {
    const prevIdx = (carouselIndex - 1 + n) % n;
    const nextIdx = (carouselIndex + 1) % n;
    track =
      genreCardHTML(
        GENRE_CAROUSEL_DATA[prevIdx],
        "genre-card-peek",
        `goToCarouselIndex(${prevIdx})`,
      ) +
      track +
      genreCardHTML(
        GENRE_CAROUSEL_DATA[nextIdx],
        "genre-card-peek",
        `goToCarouselIndex(${nextIdx})`,
      );
  }

  document.getElementById("genre-carousel").innerHTML =
    `<div class="genre-carousel-track">${track}</div>`;
}

export function renderCarouselIndicator() {
  document.getElementById("carousel-indicator").innerHTML =
    GENRE_CAROUSEL_DATA.map(
      (g, i) => `
    <div class="carousel-dot${i === carouselIndex ? " active" : ""}"
         onclick="goToCarouselIndex(${i})"
         title="${g.label}"></div>
  `,
    ).join("");
}

export function goToCarouselIndex(i, animate = true) {
  if (i === carouselIndex) return;
  carouselIndex =
    ((i % GENRE_CAROUSEL_DATA.length) + GENRE_CAROUSEL_DATA.length) %
    GENRE_CAROUSEL_DATA.length;
  const card = document.querySelector(".genre-card-current");
  if (animate && card) {
    card.classList.add("fading");
    setTimeout(() => {
      renderCarouselCard();
      renderCarouselIndicator();
      setGenre(GENRE_CAROUSEL_DATA[carouselIndex].id);
    }, 180);
  } else {
    renderCarouselCard();
    renderCarouselIndicator();
    setGenre(GENRE_CAROUSEL_DATA[carouselIndex].id);
  }
}

export function carouselStep(dir) {
  goToCarouselIndex(carouselIndex + dir);
}

export function onToolbarGenreChange(value) {
  const i = GENRE_CAROUSEL_DATA.findIndex((g) => g.id === value);
  if (i !== -1 && i !== carouselIndex) goToCarouselIndex(i);
  setGenre(value);
}

export function setGenre(genre) {
  // Only on an actual change: setGenre() is also called to re-assert the
  // current genre (toolbar/carousel syncing, initial load), and clearing there
  // would wipe a character the user just rolled.
  const changed = state.currentGenre !== genre;
  state.currentGenre = genre;
  // A skeleton is rolled from one genre's tables, so it stops being meaningful
  // the moment the genre changes.
  if (changed) clearRolledCharacter();
  const sel = document.getElementById("genre-select");
  if (sel && sel.value !== genre) sel.value = genre;
  preloadGenreIcons(genre);
  const idx = GENRE_CAROUSEL_DATA.findIndex((g) => g.id === genre);
  if (idx !== -1 && idx !== carouselIndex) {
    carouselIndex = idx;
    renderCarouselCard();
    renderCarouselIndicator();
  }
}

// Reset the carousel to the first genre's slot. Used by genre-pack removal when
// the genre being removed is the currently-active one.
export function resetCarouselIndex() {
  carouselIndex = 0;
}

// One-time carousel setup on load: point it at the current genre, render it, and
// wire the resize handler that re-renders the track when the viewport crosses
// the mobile/desktop peek breakpoint.
export function initCarousel() {
  carouselIndex = Math.max(
    0,
    GENRE_CAROUSEL_DATA.findIndex((g) => g.id === state.currentGenre),
  );
  renderCarouselCard();
  renderCarouselIndicator();

  let _lastShowPeeks = carouselShowPeeks(window.innerWidth);
  let _resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
      const showPeeks = carouselShowPeeks(window.innerWidth);
      if (showPeeks !== _lastShowPeeks) {
        _lastShowPeeks = showPeeks;
        renderCarouselCard();
      }
    }, 150);
  });
}
