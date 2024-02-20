import "./index.css";
import { loadHeader, logoTxt } from "./header/header";
import { loadMain } from "./main/main";
import { removeClassOnSmallScreen, loadSide } from "./side/side";
import { loadEditLabels } from "./main/edit-labels/edit_labels";
function loadApp() {
  initializeArray();
  initializemodalState();
  loadEditLabels(getmodalStateFromLocalStorage());
  loadHeader();
  loadMain();
  loadSide();
}

loadApp();
function show() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("*").forEach((el) => {
      el.style.border = "1px solid red";
    });
  });
}

export function createSVGIcon(svgString) {
  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(svgString, "image/svg+xml");
  return svgDocument.documentElement;
}

export function provideContainer(El, grandParent, classes = "", type = "div") {
  const Container = document.createElement(type);
  Container.appendChild(El);
  Container.classList = classes;
  grandParent.appendChild(Container);
}

export function removeInlineStyling(El) {
  El.removeAttribute("style");
}

document.addEventListener("DOMContentLoaded", () => {
  {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    removeClassOnSmallScreen(mediaQuery);

    mediaQuery.addEventListener("change", function (event) {
      removeClassOnSmallScreen(event.target);
    });
  }

  focusOut();
});

const sideFeaturesElObj = {};

// this is very important
// sideFeaturesObj contains properties and values equal to
// sideFeature IDs and sideFeature Elements respectively
const sideFeatures = document.querySelectorAll(".side__feature");
sideFeatures.forEach((feature) => {
  if (feature.id) {
    sideFeaturesElObj[feature.id] = document.querySelector(`#${feature.id}`);
  }
});
Object.values(sideFeaturesElObj)[0].classList.add("active");

// // Object.keys(sideFeaturesElObj);
const logoContainer = document.querySelector(".logo-container");
const logoImg = document.querySelector(".logo-container img");
Object.values(sideFeaturesElObj).forEach((feature) => {
  feature.addEventListener("click", () => {
    Object.values(sideFeaturesElObj).forEach((feat) => {
      feat.classList.remove("active");
      if (feat.id === "Notes") {
        makeHoverable(logoTxt, "Keep");
        makeFocusable(logoTxt);
      } else {
        makeUnhoverable(logoTxt);
        makeUnfocusable(logoTxt);
      }
    });
    feature.classList.add("active");
    loadMain(feature.id);
    logoContainer.removeChild(logoTxt);
    if (feature.id !== "Notes" && feature.id !== "Edit-labels") {
      if (logoContainer.contains(logoImg)) {
        logoContainer.removeChild(logoImg);
      }
      logoTxt.textContent =
        feature.id === "Edit-labels"
          ? "Edit Labels"
          : feature.id.split("-").join(" ");
    } else if (feature.id === "Notes") {
      if (!logoContainer.contains(logoImg)) {
        logoContainer.appendChild(logoImg);
      }
      logoTxt.textContent = "Keep";
    }

    logoContainer.appendChild(logoTxt);
  });
});

export function makeFocusable(div) {
  div.setAttribute("role", "button");
  div.setAttribute("tabindex", "0");
}

export function makeHoverable(div, txt) {
  div.setAttribute("data-tool-tip", txt);
}

export function makeUnhoverable(div) {
  if (div.dataset.toolTip) {
    div.removeAttribute("data-tool-tip");
  }
}

export function makeUnfocusable(div) {
  div.removeAttribute("role");
  div.removeAttribute("tabindex");
}
export {};
let Icons = [];
Object.values(sideFeaturesElObj).forEach((el) => {
  Icons.push(el.firstChild.firstChild);
});
const body = document.querySelector("body");
body.addEventListener("click", () => {});

// document.addEventListener("keydown", function (event) {
//   if (event.key === "Enter" || event.key === " ") {
//     event.preventDefault(); // Prevent default behavior (e.g., submitting forms)
//     // Simulate a click when Enter or Space is pressed
//     document.activeElement.click();
//   }
// });
export { Icons, sideFeaturesElObj };

export function focusOut() {
  Object.values(sideFeaturesElObj).forEach((el) => {
    makeUnfocusable(el);
  });
  Icons.forEach((el) => {
    makeFocusable(el);
  });
}

export function focusIn() {
  Object.values(sideFeaturesElObj).forEach((el) => {
    makeFocusable(el);
  });
  Icons.forEach((el) => {
    makeUnfocusable(el);
  });
}
export function createEditableDiv(txt, parent, expandable = false) {
  const parentElement = document.createElement("div");
  const firstDiv = document.createElement("div");
  firstDiv.classList.add("placeholder");
  firstDiv.textContent = txt;
  parentElement.appendChild(firstDiv);
  // Create the second child div (contenteditable div)
  const secondDiv = document.createElement("div");
  secondDiv.classList.add("mainInput");
  secondDiv.contentEditable = true;
  secondDiv.setAttribute("aria-multiline", "true");
  secondDiv.setAttribute("role", "textbox");
  secondDiv.setAttribute("tabindex", "0");
  secondDiv.setAttribute("spellcheck", "true");
  secondDiv.setAttribute("aria-label", "Take a note…");
  secondDiv.classList.add("mainInput");
  parentElement.appendChild(secondDiv);
  // Get the contenteditable div and its parent element

  // Add event listener for the 'keydown' event
  secondDiv.addEventListener("keydown", function (event) {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      if (expandable) {
        // Prevent the default behavior of the Enter key (inserting a newline)
        event.preventDefault();

        // Insert a newline character
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const newline = document.createElement("br");
        range.deleteContents();
        range.insertNode(newline);

        // Move the cursor to the beginning of the inserted newline
        range.setStartAfter(newline);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        secondDiv.style.height = secondDiv.scrollHeight + "px";

        parentElement.style.height = secondDiv.scrollHeight + "px";
        parent.style.height = secondDiv.scrollHeight + "px";
      }

      return false;
    }
  });
  return parentElement;
}

export function initializeArray() {
  if (!localStorage.getItem("labels")) {
    localStorage.setItem("labels", JSON.stringify(["CSS3", "RANDOM THOUGHTS"]));
  }
}

export function getArrayFromLocalStorage() {
  return JSON.parse(localStorage.getItem("labels"));
}

export function updateArrayInLocalStorage(updatedArray) {
  localStorage.setItem("labels", JSON.stringify(updatedArray));
}

export function refresh() {
  location.reload();
}

export function initializemodalState() {
  if (!localStorage.getItem("modalState")) {
    localStorage.setItem("modalState", JSON.stringify(true));
  }
}

export function getmodalStateFromLocalStorage() {
  return JSON.parse(localStorage.getItem("modalState"));
}

export function updatemodalStateInLocalStorage(updatedArray) {
  localStorage.setItem("modalState", JSON.stringify(updatedArray));
}
