import {
  createSVGIcon,
  getArrayFromLocalStorage,
  makeFocusable,
  makeHoverable,
  sideFeaturesElObj,
  updateArrayInLocalStorage,
  refresh,
  initializemodalState,
  getmodalStateFromLocalStorage,
  updatemodalStateInLocalStorage
} from "../..";
import { toggleIcon, createSVGIcon_Container } from "../main";
import { logoTxt } from "../../header/header";
let labels = getArrayFromLocalStorage();
let modalState = getmodalStateFromLocalStorage();
export function loadEditLabels(bool) {
  if (bool) {
    let DoneBtn;
    let oldValue;
    function loadModal() {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      const top = document.createElement("div");
      top.classList.add("modal__top");
      const topTitle = document.createElement("span");
      topTitle.textContent = "Edit labels";

      const topCreateNewLabel = document.createElement("div");
      topCreateNewLabel.classList.add("label");
      const firstBtnContainer = document.createElement("div");
      const addBtn = createSVGIcon(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>`
      );
      const cancelBtn = createSVGIcon(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" > <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /> </svg>`
      );
      firstBtnContainer.appendChild(addBtn);
      makeHoverable(firstBtnContainer, "Create label");
      makeFocusable(firstBtnContainer);
      const InputContainer = document.createElement("div");
      InputContainer.classList.add("modal__inputContainer");
      const input = document.createElement("input");
      input.classList.add("modal__input");
      input.placeholder = "Create new label";
      input.addEventListener("focus", () =>
        InputContainer.classList.add("focused")
      );
      input.addEventListener(
        "focus",
        () => {
          toggleIcon(firstBtnContainer, addBtn, cancelBtn);
          makeHoverable(firstBtnContainer, "Cancel");
          topCreateNewLabel.classList.add("block");
        },
        { once: true }
      );
      cancelBtn.addEventListener("click", () => {
        toggleIcon(firstBtnContainer, addBtn, cancelBtn);
        topCreateNewLabel.classList.remove("block");
        makeHoverable(firstBtnContainer, "Create label");

        input.value = "";

        input.addEventListener(
          "focus",
          () => {
            toggleIcon(firstBtnContainer, addBtn, cancelBtn);
            topCreateNewLabel.classList.add("block");
            makeHoverable(firstBtnContainer, "Cancel");
          },
          { once: true }
        );
      });
      addBtn.addEventListener("click", () => {
        toggleIcon(firstBtnContainer, addBtn, cancelBtn);
        topCreateNewLabel.classList.add("block");
        makeHoverable(firstBtnContainer, "Cancel");

        input.addEventListener(
          "focus",
          () => {
            toggleIcon(firstBtnContainer, addBtn, cancelBtn);
            topCreateNewLabel.classList.add("block");
            makeHoverable(firstBtnContainer, "Cancel");
          },
          { once: true }
        );
      });
      input.addEventListener("focus", () => {
        InputContainer.classList.add("focused");
      });
      input.addEventListener("blur", () =>
        InputContainer.classList.remove("focused")
      );
      InputContainer.appendChild(input);
      const createBtn = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`
      );

      createBtn.addEventListener("click", () => {
        if (isLabelUnique(labels, input.value)) {
          toggleIcon(firstBtnContainer, addBtn, cancelBtn);
          topCreateNewLabel.classList.remove("block");
          makeHoverable(firstBtnContainer, "Create label");
          labels.push(input.value);
          modalState = true;
          updatemodalStateInLocalStorage(modalState);
          updateArrayInLocalStorage(labels);
          refresh();
        }
      });

      makeHoverable(createBtn, "Create label");
      makeFocusable(createBtn);
      topCreateNewLabel.append(firstBtnContainer, InputContainer, createBtn);
      top.append(topTitle, topCreateNewLabel);
      createLabels();
      const bottom = document.createElement("div");
      bottom.classList.add("modal__bottom");
      DoneBtn = document.createElement("button");
      DoneBtn.classList.add("special__button");
      DoneBtn.textContent = "Done";
      bottom.appendChild(DoneBtn);

      modal.append(top, bottom);
      return modal;

      function createLabel(label) {
        const newLabel = document.createElement("div");
        newLabel.classList.add("label");
        const firstBtnContainer = document.createElement("div");
        makeFocusable(firstBtnContainer);
        makeHoverable(firstBtnContainer, "Delete note");
        const labelBtn = createSVGIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M840-480 666-234q-11 16-28.5 25t-37.5 9H200q-33 0-56.5-23.5T120-280v-400q0-33 23.5-56.5T200-760h400q20 0 37.5 9t28.5 25l174 246Z"/></svg>`
        );
        const deleteBtn = createSVGIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>`
        );
        firstBtnContainer.appendChild(labelBtn);
        firstBtnContainer.addEventListener("mouseenter", () => {
          toggleIcon(firstBtnContainer, labelBtn, deleteBtn);
        });
        firstBtnContainer.addEventListener("mouseleave", () => {
          toggleIcon(firstBtnContainer, labelBtn, deleteBtn);
        });

        const InputContainer = document.createElement("div");
        InputContainer.classList.add("modal__inputContainer");
        const input = document.createElement("input");
        input.classList.add("modal__input");
        input.value = label;
        oldValue = label;
        input.addEventListener("focus", () => {
          InputContainer.classList.add("focused");
        });
        input.addEventListener("blur", () =>
          InputContainer.classList.remove("focused")
        );
        InputContainer.appendChild(input);
        const editBtnContainer = document.createElement("div");

        const editBtn = createSVGIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path></svg>`
        );

        const renameBtn = createSVGIcon(
          `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/></svg>`
        );

        firstBtnContainer.addEventListener("click", () => {
          // you should confirm the deletion decision
          const order = labels.indexOf(input.value);
          labels.splice(order, 1);
          modalState = true;
          updatemodalStateInLocalStorage(modalState);
          updateArrayInLocalStorage(labels);
          refresh();
        });
        function changeLabel() {
          const order = Array.from(top.childNodes).indexOf(newLabel);
          labels[order - 2] = input.value;
          Object.values(sideFeaturesElObj)[order].id = input.value;
          if (logoTxt.textContent !== "Keep" && input.value !== oldValue) {
            logoTxt.textContent = input.value;
          }
          Object.values(sideFeaturesElObj)[
            order
          ].childNodes[1].firstChild.textContent = input.value;
        }
        editBtnContainer.appendChild(renameBtn);
        makeFocusable(editBtnContainer);
        makeHoverable(editBtnContainer, "Rename label");
        renameBtn.addEventListener("click", () => {
          input.focus();
          toggleIcon(editBtnContainer, editBtn, renameBtn);
        });
        editBtn.addEventListener("click", () => {
          if (isLabelUnique(labels, input.value)) {
            changeLabel();
            updateArrayInLocalStorage(labels);
            input.blur;
            toggleIcon(editBtnContainer, editBtn, renameBtn);
          }
        });

        makeHoverable(editBtnContainer, "Rename label");
        makeFocusable(editBtnContainer);
        newLabel.append(firstBtnContainer, InputContainer, editBtnContainer);
        top.appendChild(newLabel);
      }

      function createLabels() {
        for (let i = 0; i < labels.length; i++) {
          createLabel(labels[i]);
        }
      }
    }

    function loadOverlay() {
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      return overlay;
    }
    function addEditLabelsModal() {
      const modal = loadModal();
      const overlay = loadOverlay();

      const body = document.querySelector("body");
      body.append(modal, overlay);
      modalState = true;
      updatemodalStateInLocalStorage(modalState);
      overlay.addEventListener("click", () => {
        body.removeChild(modal);
        body.removeChild(overlay);

        modalState = false;
        updatemodalStateInLocalStorage(modalState);
      });
      DoneBtn.addEventListener("click", () => {
        body.removeChild(modal);
        body.removeChild(overlay);

        modalState = false;
        updatemodalStateInLocalStorage(modalState);
      });
    }

    addEditLabelsModal();
  }
}
function isLabelUnique(labels, newLabel) {
  return !labels.includes(newLabel);
}
