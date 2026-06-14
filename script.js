const filters = document.querySelectorAll("[data-filter]");
const products = Array.from(document.querySelectorAll("[data-products] .shop-card"));
const count = document.querySelector("[data-count]");
const clearButton = document.querySelector("[data-clear]");

function productMatches(product, filter, value) {
  if (value === "all") return true;
  const productValue = product.dataset[filter] || "";
  return productValue.split(" ").includes(value);
}

function applyFilters() {
  let visible = 0;
  products.forEach((product) => {
    const isVisible = Array.from(filters).every((filter) => productMatches(product, filter.dataset.filter, filter.value));
    product.hidden = !isVisible;
    if (isVisible) visible += 1;
  });
  if (count) count.textContent = visible;
}

filters.forEach((filter) => filter.addEventListener("change", applyFilters));

if (clearButton) {
  clearButton.addEventListener("click", () => {
    filters.forEach((filter) => {
      filter.value = "all";
    });
    applyFilters();
  });
}

function highlightProductFromHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const product = document.getElementById(id);
  if (!product) return;

  product.classList.add("is-highlighted");
  product.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => product.classList.remove("is-highlighted"), 2400);
}

applyFilters();
window.addEventListener("load", highlightProductFromHash);
window.addEventListener("hashchange", highlightProductFromHash);
