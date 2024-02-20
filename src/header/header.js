// TODO ==> Fix the hoverability of the logoTxt
import keepImg from "../assets/images/keep_2020q4_48dp.png";
let logoTxt;
import {
  createSVGIcon,
  makeHoverable,
  makeFocusable,
  provideContainer
} from "..";
import { SideBarDiv } from "../side/side";
import { toggleSide } from "../main/notes/notes.js";
export function loadHeader() {
  const header = document.createElement("header");
  const headerleftDiv = document.createElement("div");
  headerleftDiv.classList.add("left");
  const headermidDiv = document.createElement("div");
  headermidDiv.classList.add("middle");
  const headerrightDiv = document.createElement("div");
  headerrightDiv.classList.add("right");

  const menuIconContainer = document.createElement("div");

  function loadMenuIcon() {
    const menuIcon = createSVGIcon(
      `<svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
        width="24"
      >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
      `
    );
    const menuIconDiv = document.createElement("div");
    menuIconContainer.addEventListener("click", () => {
      menuIconContainer.classList.add("active");
      SideBarDiv.classList.toggle("clicked");
      toggleSide();
    });

    menuIconDiv.appendChild(menuIcon);
    makeFocusable(menuIconDiv);
    menuIconContainer.appendChild(menuIconDiv);
    makeHoverable(menuIconDiv, "Main menu");
    headerleftDiv.appendChild(menuIconContainer);
  }

  function loadLogo() {
    const logoContainer = document.createElement("a");
    logoContainer.classList.add("logo-container");
    logoTxt = document.createElement("span");

    const logoImg = document.createElement("img");
    logoImg.src = keepImg;
    logoContainer.appendChild(logoImg);
    logoTxt.textContent = "Keep";

    logoContainer.appendChild(logoTxt);
    const logoContainerContainer = document.createElement("div");
    logoContainerContainer.appendChild(logoContainer);
    headerleftDiv.appendChild(logoContainerContainer);
  }

  function loadSearchField() {
    const searchField = document.createElement("div");
    makeFocusable(searchField);
    const searchIcon = createSVGIcon(
      `  <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
      </svg>`
    );
    // create a parent div for the button,
    // make a button as a container and then wrap the button using the provide container function
    const searchIconBtn = document.createElement("button");
    makeHoverable(searchIconBtn, "Search");
    makeFocusable(searchIconBtn);
    searchIconBtn.appendChild(searchIcon);
    provideContainer(searchIconBtn, searchField, "", "div");
    const searchInput = document.createElement("input");
    searchInput.classList.add("persistent-placeholder");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search");

    searchInput.addEventListener("focus", () => {
      searchInput.placeholder = "Search";
    });
    searchInput.addEventListener("keydown", () => {
      searchInput.placeholder = "";
      if (searchInput.textContent === "") {
        searchInput.placeholder = "Search";
      }
    });
    searchInput.addEventListener("blur", () => {
      if (!searchInput.textContent.length) {
        searchInput.placeholder = "Search";
      }
    });

    searchField.append(searchInput);
    const searchClear = createSVGIcon(
      `<svg
      xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>`
    );
    const searchClearBtn = document.createElement("button");
    makeHoverable(searchClearBtn, "Clear search");
    makeFocusable(searchClearBtn);
    searchClearBtn.appendChild(searchClear);
    provideContainer(searchClearBtn, searchField, "", "div");
    searchField.classList.add("search-field");
    headermidDiv.appendChild(searchField);
    searchClearBtn.addEventListener("click", () => {
      searchInput.textContent = "";
    });
    function activateSearch() {
      searchField.classList.add("focused");
      searchIconBtn.classList.add("focused");
      searchClearBtn.classList.add("focused");
    }
    function deactivateSearch() {
      // removeInlineStyling(searchClearBtn);

      searchIconBtn.classList.remove("focused");
      searchClearBtn.classList.remove("focused");
      searchField.classList.remove("focused");
    }

    searchField.addEventListener("click", activateSearch);
    document.addEventListener("click", function (event) {
      const targetElement = event.target;

      // Check if the clicked element is not the input itself
      if (
        targetElement !== searchField &&
        targetElement !== searchIconBtn &&
        targetElement !== searchInput
      ) {
        deactivateSearch();
      }
    });
  }

  function loadAdditionalBtns() {
    const AdditionalBtns = document.createElement("div");
    const refresh = createSVGIcon(
      `    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
      </svg>`
    );
    const refreshContainer = document.createElement("div");
    makeHoverable(refreshContainer, "Refresh");
    makeFocusable(refreshContainer);
    refreshContainer.appendChild(refresh);
    provideContainer(refreshContainer, AdditionalBtns);
    const grid = createSVGIcon(
      `   <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0-80h560v-160H200v160Zm0 480q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H200Zm0-80h560v-160H200v160Zm0-400v-160 160Zm0 400v-160 160Z" />
      </svg>`
    );
    const gridContainer = document.createElement("div");
    gridContainer.appendChild(grid);
    makeHoverable(gridContainer, "List view");
    makeFocusable(gridContainer);
    provideContainer(gridContainer, AdditionalBtns);
    const gear = createSVGIcon(
      `    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
      </svg>`
    );
    const gearContainer = document.createElement("div");
    gearContainer.appendChild(gear);
    makeHoverable(gearContainer, "Settings");
    makeFocusable(gearContainer);
    provideContainer(gearContainer, AdditionalBtns);

    headerrightDiv.appendChild(AdditionalBtns);
    AdditionalBtns.classList.add("additional-btns");
  }

  function createHeader() {
    loadMenuIcon();
    loadLogo();
    loadSearchField();
    loadAdditionalBtns();
    header.append(headerleftDiv, headermidDiv, headerrightDiv);
    return header;
  }

  createHeader();
  const body = document.querySelector("body");
  body.appendChild(header);
}

export { logoTxt };
