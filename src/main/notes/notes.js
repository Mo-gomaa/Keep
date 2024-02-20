import {
  createSVGIcon,
  createEditableDiv,
  makeHoverable,
  makeFocusable
} from "../..";
import { createSVGIcon_Container, toggleIcon } from "../main";
import { SideBarDiv } from "../../side/side";
let activeNoteContainer;
let toggleSide;
export function loadNotes() {
  const main = document.createElement("main");
  toggleSide = function () {
    document.querySelector("main").classList.toggle("minimize");
    SideBarDiv.classList.toggle("open");
  };
  const existingMain = document.querySelector("main");
  if (existingMain) {
    existingMain.remove();
  }

  const noteDiv = document.createElement("div");

  function loadTakeNoteDiv() {
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("take-note");
    const noteInputContainer = document.createElement("div");
    const noteInput = document.createElement("input");
    noteInput.placeholder = "Take a note...";
    noteInputContainer.appendChild(noteInput);
    const checkboxIconContainer = document.createElement("div");
    const checkboxIcon = createSVGIcon(
      `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`
    );
    checkboxIconContainer.appendChild(checkboxIcon);
    const newNoteIconContainer = document.createElement("div");
    const newNoteIcon = createSVGIcon(
      `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z"/></svg>`
    );
    newNoteIconContainer.appendChild(newNoteIcon);
    const noteImageIconContainer = document.createElement("div");
    const noteImageIcon = createSVGIcon(
      `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>`
    );
    noteImageIconContainer.appendChild(noteImageIcon);

    noteContainer.append(
      noteInputContainer,
      checkboxIconContainer,
      // newNoteIconContainer,
      noteImageIconContainer
    );
    noteDiv.appendChild(noteContainer);

    activeNoteContainer = function () {
      noteContainer.removeChild(noteInputContainer);
      noteContainer.removeChild(checkboxIconContainer);
      // noteContainer.removeChild(newNoteIconContainer);
      noteContainer.removeChild(noteImageIconContainer);
      noteContainer.classList.remove("take-note");
      noteContainer.classList.add("take-note--active");
      const top = document.createElement("div");
      const pinIconContainer = document.createElement("div");
      const titleInput = createEditableDiv("Title", top);
      titleInput.addEventListener(
        "keydown",
        () => (titleInput.firstChild.style.display = "none"),
        { once: true }
      );
      titleInput.addEventListener("click", () =>
        titleInput.classList.add("active")
      );
      const titleIcon = createSVGIcon(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>`
      );
      const filledTitleIcon = createSVGIcon(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Z"/></svg>
        `
      );

      pinIconContainer.addEventListener("click", () => {
        toggleIcon(pinIconContainer, titleIcon, filledTitleIcon);
      });
      pinIconContainer.appendChild(titleIcon);
      const IconDiv = document.createElement("div");
      IconDiv.appendChild(pinIconContainer);
      makeHoverable(pinIconContainer, "Pin note");
      makeFocusable(pinIconContainer);

      top.append(titleInput, IconDiv);
      const middle = document.createElement("div");
      const newnoteInput = createEditableDiv("Take a note...", middle, true);
      newnoteInput.addEventListener(
        "keydown",
        () => (newnoteInput.firstChild.style.display = "none"),
        { once: true }
      );
      newnoteInput.addEventListener("click", () =>
        newnoteInput.classList.add("active")
      );
      middle.appendChild(newnoteInput);
      const bottom = document.createElement("div");
      const actionsContainer = document.createElement("div");
      const IconsContainer = document.createElement("div");
      const remindMe = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-360h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>`
      );
      makeHoverable(remindMe, "Remind me");
      makeFocusable(remindMe);
      const collaborator = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>`
      );
      makeHoverable(collaborator, "Collaborator");
      makeFocusable(collaborator);
      const BGoptions = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`
      );
      makeHoverable(BGoptions, "Background options");
      makeFocusable(BGoptions);
      const addImage = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>`
      );
      makeHoverable(addImage, "Add image");
      makeFocusable(addImage);
      const archive = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z"/></svg>`
      );
      makeHoverable(archive, "Archive");
      makeFocusable(archive);
      const more = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>`
      );
      makeHoverable(more, "More");
      makeFocusable(more);
      const undo = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>`
      );
      makeHoverable(undo, "Undo");
      makeFocusable(undo);
      const redo = createSVGIcon_Container(
        `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/></svg>`
      );
      makeHoverable(redo, "Redo");
      makeFocusable(redo);

      IconsContainer.append(
        remindMe,
        collaborator,
        BGoptions,
        addImage,
        archive,
        more,
        undo,
        redo
      );

      const closeBtn = document.createElement("button");
      closeBtn.classList.add("special__button");
      closeBtn.textContent = "Close";

      const closeBtnContainer = document.createElement("div");
      closeBtnContainer.appendChild(closeBtn);

      actionsContainer.append(IconsContainer, closeBtnContainer);
      bottom.appendChild(actionsContainer);
      noteContainer.append(top, middle, bottom);
      top.classList.add("top");
      middle.classList.add("middle");
      bottom.classList.add("bottom");
    };

    noteContainer.childNodes.forEach((el) => {
      el.addEventListener("click", activeNoteContainer);
    });
  }
  function createNotes() {
    loadTakeNoteDiv();
    main.append(noteDiv);
    return main;
  }

  createNotes();

  const body = document.querySelector("body");
  body.appendChild(main);
}

export { activeNoteContainer, toggleSide };

// <button data-modal-target="#modal">Open Modal</button>
// <div class="modal" id="modal">
//   <div class="modal-header">
//     <div class="title">Example Modal</div>
//     <button data-close-button class="close-button">&times;</button>
//   </div>
//   <div class="modal-body">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod alias ut illo doloremque eum ipsum obcaecati distinctio debitis reiciendis quae quia soluta totam doloribus quos nesciunt necessitatibus, consectetur quisquam accusamus ex, dolorum, dicta vel? Nostrum voluptatem totam, molestiae rem at ad autem dolor ex aperiam. Amet assumenda eos architecto, dolor placeat deserunt voluptatibus tenetur sint officiis perferendis atque! Voluptatem maxime eius eum dolorem dolor exercitationem quis iusto totam! Repudiandae nobis nesciunt sequi iure! Eligendi, eius libero. Ex, repellat sapiente!
//   </div>
// </div>
// <div id="overlay"></div>
