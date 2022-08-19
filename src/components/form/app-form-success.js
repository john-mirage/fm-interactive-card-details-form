class AppFormSuccess extends HTMLDivElement {
  #initialCall = true;
  imageElement = document.createElement("img");
  titleElement = document.createElement("h2");
  descriptionElement = document.createElement("p");
  buttonElement = document.createElement("button");

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialCall) {
      this.imageElement.classList.add("success-view__icon");
      this.titleElement.classList.add("success-view__title");
      this.descriptionElement.classList.add("success-view__description");
      this.buttonElement.classList.add("success-view__button");
      this.classList.add("success-view");
      this.imageElement.setAttribute("src", "/src/images/icon-complete.svg");
      this.imageElement.setAttribute("alt", "Icon complete");
      this.titleElement.textContent = "thank you!";
      this.descriptionElement.textContent = "We've added your card details";
      this.buttonElement.textContent = "Continue";
      this.#initialCall = false;
    }
  }
}

export default AppFormSuccess;