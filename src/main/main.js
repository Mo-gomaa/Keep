import { loadEditLabels } from "./edit-labels/edit_labels.js";
import { loadNotes, activeNoteContainer } from "./notes/notes";

export function loadMain(elementId) {
  switch (elementId) {
    case "Notes":
      loadNotes();
      break;
    case "Edit-labels":
      loadEditLabels(true);
      break;
    default:
      loadNotes();
  }
}

export function createSVGIcon_Container(svgString, type = "div") {
  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(svgString, "image/svg+xml");
  const SVGContainer = document.createElement(type);
  SVGContainer.appendChild(svgDocument.documentElement);
  return SVGContainer;
}

export function toggleIcon(element, childIcon1, childIcon2) {
  const currentIcon = element.firstChild;
  const newIcon = currentIcon === childIcon1 ? childIcon2 : childIcon1;
  element.removeChild(currentIcon);
  element.appendChild(newIcon);
}
