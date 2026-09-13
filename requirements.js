function collectFormData(form) {
  const websiteType = form.querySelector("input[name='websiteType']:checked")?.value || "";
  const businessCategory = form.querySelector("input[name='businessCategory']:checked")?.value || "";
  const style = form.querySelector("input[name='style']:checked")?.value || "";
  const content = form.querySelector("input[name='content']:checked")?.value || "";

  const data = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    company: form.elements.company.value.trim(),
    websiteType,
    websiteTypeOther: form.elements.websiteTypeOther ? form.elements.websiteTypeOther.value.trim() : "",
    businessCategory,
    businessCategoryOther: form.elements.businessCategoryOther ? form.elements.businessCategoryOther.value.trim() : "",
    features: Array.from(form.querySelectorAll("input[name='features']:checked")).map((item) => item.value),
    featuresOther: form.elements.featuresOther ? form.elements.featuresOther.value.trim() : "",
    specialFeatures: Array.from(form.querySelectorAll("input[name='specialFeatures']:checked")).map((item) => item.value),
    specialFeaturesOther: form.elements.specialFeaturesOther ? form.elements.specialFeaturesOther.value.trim() : "",
    style,
    styleOther: form.elements.styleOther ? form.elements.styleOther.value.trim() : "",
    content,
    referenceWebsite: form.elements.referenceWebsite ? form.elements.referenceWebsite.value.trim() : "",
    requirementsExtra: form.elements.requirementsExtra ? form.elements.requirementsExtra.value.trim() : "",
  };

  return data;
}

function saveFormData(data) {
  localStorage.setItem("veloxwebstudioRequirements", JSON.stringify(data));
}

function loadFormData() {
  try {
    const stored = localStorage.getItem("veloxwebstudioRequirements");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#requirementsForm");
  if (!form) return;

  const stored = loadFormData();
  if (stored) {
    Object.entries(stored).forEach(([key, value]) => {
      if (key === "features" || key === "specialFeatures") {
        if (Array.isArray(value)) {
          const boxes = Array.from(document.querySelectorAll(`input[name='${key}']`));
          boxes.forEach((box) => {
            if (value.includes(box.value)) box.checked = true;
          });
        }
      } else if (["name", "email", "company", "websiteTypeOther", "businessCategoryOther", "featuresOther", "specialFeaturesOther", "styleOther", "referenceWebsite", "requirementsExtra"].includes(key)) {
        const field = form.elements[key];
        if (field) field.value = value || "";
      } else if (key === "websiteType" || key === "businessCategory" || key === "style" || key === "content") {
        const radio = form.querySelector(`[name="${key}"][value="${value}"]`);
        if (radio) radio.checked = true;
      }
    });
  }

  const syncOtherVisibility = () => {
    const websiteType = form.querySelector('input[name="websiteType"]:checked');
    const businessCategory = form.querySelector('input[name="businessCategory"]:checked');
    const features = Array.from(form.querySelectorAll('input[name="features"]:checked'));
    const specialFeatures = Array.from(form.querySelectorAll('input[name="specialFeatures"]:checked'));
    const style = form.querySelector('input[name="style"]:checked');

    const websiteTypeOtherWrap = document.getElementById("websiteTypeOtherWrap");
    const businessCategoryOtherWrap = document.getElementById("businessCategoryOtherWrap");
    const featuresOtherWrap = document.getElementById("featuresOtherWrap");
    const specialFeaturesOtherWrap = document.getElementById("specialFeaturesOtherWrap");
    const styleOtherWrap = document.getElementById("styleOtherWrap");

    if (websiteTypeOtherWrap) websiteTypeOtherWrap.hidden = !(websiteType && websiteType.value === "Other");
    if (businessCategoryOtherWrap) businessCategoryOtherWrap.hidden = !(businessCategory && businessCategory.value === "Other");
    if (featuresOtherWrap) featuresOtherWrap.hidden = !features.some((item) => item.value === "Other");
    if (specialFeaturesOtherWrap) specialFeaturesOtherWrap.hidden = !specialFeatures.some((item) => item.value === "Other");
    if (styleOtherWrap) styleOtherWrap.hidden = !(style && style.value === "Other");
  };

  const choiceCards = Array.from(document.querySelectorAll(".choice-card"));
  const checkCards = Array.from(document.querySelectorAll(".check-card"));

  const syncSelections = () => {
    choiceCards.forEach((card) => {
      const radio = card.querySelector('input[type="radio"]');
      card.classList.toggle("selected", Boolean(radio && radio.checked));
    });

    checkCards.forEach((card) => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      card.classList.toggle("selected", Boolean(checkbox && checkbox.checked));
    });
  };

  syncSelections();
  syncOtherVisibility();

  choiceCards.forEach((card) => {
    const radio = card.querySelector('input[type="radio"]');
    if (!radio) return;
    card.addEventListener("click", () => {
      radio.checked = true;
      card.parentElement.querySelectorAll(".choice-card").forEach((c) => c.classList.toggle("selected", c === card));
      syncSelections();
      syncOtherVisibility();
    });
  });

  checkCards.forEach((card) => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    checkbox.addEventListener("change", () => {
      card.classList.toggle("selected", checkbox.checked);
      syncOtherVisibility();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = collectFormData(form);
    saveFormData(data);
    window.location.assign("contact.html");
  });
});
