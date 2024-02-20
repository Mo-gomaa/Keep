const SideBarDiv = document.createElement("div");
export { SideBarDiv };

import {
  createSVGIcon,
  focusIn,
  focusOut,
  getArrayFromLocalStorage,
  initializeArray,
  makeHoverable
} from "..";
let labels = getArrayFromLocalStorage();
function createFeature(txt, svg) {
  const featureDiv = document.createElement("div");
  featureDiv.classList.add("side__feature");

  featureDiv.id = (txt.charAt(0).toUpperCase() + txt.slice(1))
    .split(" ")
    .join("-");

  const IconDiv = document.createElement("div");
  const Icon = createSVGIcon(svg);
  const IconContainer = document.createElement("div");
  IconContainer.classList.add("side__feature--Icon");
  IconContainer.appendChild(Icon);
  IconDiv.appendChild(IconContainer);
  const featureTxtDiv = document.createElement("div");
  const featureTxt = document.createElement("span");
  featureTxt.classList.add("side__feature--txt");
  featureTxt.textContent = txt.charAt(0).toUpperCase() + txt.slice(1);
  makeHoverable(IconContainer, featureTxt.textContent);

  featureTxtDiv.appendChild(featureTxt);
  featureDiv.append(IconDiv, featureTxtDiv);

  SideBarDiv.appendChild(featureDiv);
}

function createLabelsFeatures() {
  function createLabelFeature(txt) {
    const featureDiv = document.createElement("div");
    featureDiv.classList.add("side__feature");

    featureDiv.id = txt.split(" ").join("-");
    const IconDiv = document.createElement("div");
    const Icon = createSVGIcon(
      `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M840-480 666-234q-11 16-28.5 25t-37.5 9H200q-33 0-56.5-23.5T120-280v-400q0-33 23.5-56.5T200-760h400q20 0 37.5 9t28.5 25l174 246Zm-98 0L600-680H200v400h400l142-200Zm-542 0v200-400 200Z"/></svg>`
    );
    const IconContainer = document.createElement("div");
    IconContainer.classList.add("side__feature--Icon");
    makeHoverable(IconContainer, txt);
    IconContainer.appendChild(Icon);
    IconDiv.appendChild(IconContainer);
    const featureTxtDiv = document.createElement("div");
    const featureTxt = document.createElement("span");
    featureTxt.classList.add("side__feature--txt");
    featureTxt.textContent = txt;
    featureTxtDiv.appendChild(featureTxt);
    featureDiv.append(IconDiv, featureTxtDiv);

    SideBarDiv.appendChild(featureDiv);
  }

  for (let i = 0; i < labels.length; i++) {
    createLabelFeature(labels[i]);
  }
}

export function loadSide() {
  const body = document.querySelector("body");

  // const exisitingSide = document.querySelectorAll(".side");
  // const exisitingSideFeature = document.querySelectorAll(".side__feature");
  // exisitingSide.forEach(() => {
  //   if (exisitingSide) {
  //     exisitingSideFeature.forEach(() => {
  //       if (exisitingSideFeature) {
  //         exisitingSide.remove(exisitingSideFeature);
  //       }
  //     });
  //   body.removeChild(exisitingSide);
  // });
  SideBarDiv.classList.add("side");
  createFeature(
    "notes",
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg>`
  );
  createFeature(
    "reminders",
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>`
  );
  createLabelsFeatures();
  createFeature(
    "edit labels",
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`
  );
  createFeature(
    "archive",
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z"/></svg>`
  );
  createFeature(
    "trash",
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`
  );

  body.appendChild(SideBarDiv);
}

export function removeClassOnSmallScreen(mediaQuery) {
  let i = 0;
  if (SideBarDiv.classList.contains("clicked") && i === 0) {
    if (mediaQuery.matches) {
      SideBarDiv.classList.remove("open");
      SideBarDiv.classList.remove("clicked");
      i++;
    }
  }
}

SideBarDiv.addEventListener("mouseenter", () => {
  setTimeout(() => {
    SideBarDiv.classList.add("open");
  }, 250);
  focusIn();
});
SideBarDiv.addEventListener("mouseleave", () => {
  if (!SideBarDiv.classList.contains("clicked")) {
    SideBarDiv.classList.remove("open");
    focusOut();
  }
});
