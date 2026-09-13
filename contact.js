const TELEGRAM_USERNAME = "Lathi_404";
const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;
const INSTAGRAM_USERNAME = "veloxwebstudio";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
const GMAIL_ADDRESS = "lathisanlathi12@gmail.com";

function collectFormData(form) {
  const data = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    company: form.elements.company.value.trim(),
    websiteType: form.elements.websiteType ? form.elements.websiteType.value : "",
    websiteTypeOther: form.elements.websiteTypeOther ? form.elements.websiteTypeOther.value.trim() : "",
    businessCategory: form.elements.businessCategory ? form.elements.businessCategory.value : "",
    businessCategoryOther: form.elements.businessCategoryOther ? form.elements.businessCategoryOther.value.trim() : "",
    features: Array.from(form.querySelectorAll("input[name='features']:checked")).map((item) => item.value),
    featuresOther: form.elements.featuresOther ? form.elements.featuresOther.value.trim() : "",
    specialFeatures: Array.from(form.querySelectorAll("input[name='specialFeatures']:checked")).map((item) => item.value),
    specialFeaturesOther: form.elements.specialFeaturesOther ? form.elements.specialFeaturesOther.value.trim() : "",
    style: form.elements.style ? form.elements.style.value : "",
    styleOther: form.elements.styleOther ? form.elements.styleOther.value.trim() : "",
    content: form.elements.content ? form.elements.content.value : "",
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
    return JSON.parse(localStorage.getItem("veloxwebstudioRequirements") || "{}");
  } catch (error) {
    return {};
  }
}

function generateProjectMessage(data) {
  const websiteType = data.websiteType === "Other" ? (data.websiteTypeOther || "Not specified") : (data.websiteType || "Not specified");
  const businessCategory = data.businessCategory === "Other" ? (data.businessCategoryOther || "Not specified") : (data.businessCategory || "Not specified");
  const style = data.style === "Other" ? (data.styleOther || "Not specified") : (data.style || "Not specified");
  const features = Array.isArray(data.features) && data.features.length ? data.features : ["Not specified"];
  const sections = features.map((item) => item === "Other" ? (data.featuresOther || "Other website sections") : item);
  const packedSpecialFeatures = Array.isArray(data.specialFeatures) && data.specialFeatures.length ? data.specialFeatures : ["Not specified"];
  const specialFeatures = packedSpecialFeatures.map((item) => item === "Other" ? (data.specialFeaturesOther || "Other special feature") : item);
  const referenceWebsite = data.referenceWebsite && data.referenceWebsite.trim() ? data.referenceWebsite : "Not provided";
  const extra = data.requirementsExtra && data.requirementsExtra.trim() ? data.requirementsExtra : "None";

  const lines = [];
  lines.push("Hello VeloxWebStudio! 👋");
  lines.push("");
  lines.push("I'd like to discuss a website project.");
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("CUSTOMER DETAILS");
  lines.push(`Name: ${data.name || "Not provided"}`);
  lines.push(`Email: ${data.email || "Not provided"}`);
  lines.push(`Company / Business: ${data.company || "Not provided"}`);
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("WEBSITE REQUIREMENTS");
  lines.push(`Website Type: ${websiteType}`);
  lines.push(`Business Category: ${businessCategory}`);
  lines.push(`Design Style: ${style}`);
  lines.push("");
  lines.push("WEBSITE SECTIONS:");
  sections.forEach((section) => lines.push(`• ${section}`));
  lines.push("");
  lines.push("SPECIAL FEATURES:");
  specialFeatures.forEach((feature) => lines.push(`• ${feature}`));
  lines.push("");
  lines.push("CONTENT:");
  lines.push(data.content || "Not specified");
  lines.push("");
  lines.push("REFERENCE WEBSITE:");
  lines.push(referenceWebsite);
  lines.push("");
  lines.push("ADDITIONAL REQUIREMENTS:");
  lines.push(extra);
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push("PROJECT BUDGET:");
  lines.push("Starting from $15");
  lines.push("");
  lines.push("I'd like to discuss the requirements, final scope and pricing.");
  lines.push("");
  lines.push("Thank you! 🙌");

  return lines.join("\n");
}

function copyProjectMessage(message) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(message);
  }

  const textarea = document.createElement("textarea");
  textarea.value = message;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  return Promise.resolve();
}

function openTelegram(message) {
  const url = `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function openInstagram(message) {
  const messagePanel = document.querySelector("#messagePanel");
  const orderMessageField = document.querySelector("#orderMessage");
  const copyButton = document.querySelector("#copyOrderMessage");

  copyProjectMessage(message)
    .then(() => {
      if (copyButton) copyButton.querySelector("span").textContent = "✓ Message copied — opening Instagram...";
      if (orderMessageField) orderMessageField.textContent = message;
      if (messagePanel) messagePanel.classList.remove("hidden");
      window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    })
    .catch(() => {
      const fallback = document.createElement("button");
      fallback.type = "button";
      fallback.className = "btn btn-outline-light small-btn";
      fallback.textContent = "Copy Project Message";
      fallback.addEventListener("click", () => copyProjectMessage(message));

      const messagePanel = document.querySelector("#messagePanel");
      if (messagePanel) {
        const panel = document.createElement("div");
        panel.className = "copy-fallback";
        panel.appendChild(fallback);
        messagePanel.appendChild(panel);
      }

      alert("Copy Project Message");
      window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    });
}

function openEmail(message) {
  const subject = encodeURIComponent("VeloxWebStudio Website Project Request");
  const body = encodeURIComponent(message);
  const mailto = `mailto:${GMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  alert("Your email draft will open with your project details already prepared.");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#requirementsForm");
  const stored = loadFormData();
  const orderMessage = generateProjectMessage(stored || {});

  const messagePanel = document.querySelector("#messagePanel");
  const orderMessageField = document.querySelector("#orderMessage");
  const contactButtons = Array.from(document.querySelectorAll("[data-contact]"));
  const copyButton = document.querySelector("#copyOrderMessage");

  if (orderMessageField) orderMessageField.textContent = orderMessage;

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      try {
        await copyProjectMessage(orderMessage);
        copyButton.querySelector("span").textContent = "✓ Message copied!";
      } catch (error) {
        copyButton.querySelector("span").textContent = "Copy Message";
      }
    });
  }

  contactButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const method = button.dataset.contact;
      const data = loadFormData();
      const message = generateProjectMessage(data);

      if (orderMessageField) orderMessageField.textContent = message;

      if (method === "telegram") {
        openTelegram(message);
      }

      if (method === "instagram") {
        openInstagram(message);
      }

      if (method === "gmail") {
        openEmail(message);
      }
    });
  });
});
