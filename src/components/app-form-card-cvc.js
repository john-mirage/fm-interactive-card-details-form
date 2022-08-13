const template = document.getElementById("template-app-form-card-cvc");

class AppFormCardCvc extends HTMLElement {
  constructor() {
    super();
    this.initialCall = true;
    this.labelElement = template.content.firstElementChild.cloneNode(true);
    this.inputElement = this.labelElement.querySelector('[data-name="input"]');
    this.inputBorderElement = this.labelElement.querySelector('[data-name="input-border"]');
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.appFormError = document.createElement("app-form-error");
  }

  get isValid() {
    if (this.hasOwnProperty("_isValid")) {
      return this._isValid;
    } else {
      return false;
    }
  }

  set isValid(isValid) {
    this._isValid = isValid;
    if (this.isValid) {
      if (this.inputBorderElement.classList.contains("before:bg-input-error")) this.inputBorderElement.classList.remove("before:bg-input-error");
      if (!this.inputBorderElement.classList.contains("before:bg-light-grayish-violet")) this.inputBorderElement.classList.add("before:bg-light-grayish-violet");
      if (this.appFormError.isConnected) this.labelElement.removeChild(this.appFormError);
    } else {
      if (this.inputBorderElement.classList.contains("before:bg-light-grayish-violet")) this.inputBorderElement.classList.remove("before:bg-light-grayish-violet");
      if (!this.inputBorderElement.classList.contains("before:bg-input-error")) this.inputBorderElement.classList.add("before:bg-input-error");
      if (!this.appFormError.isConnected) this.labelElement.append(this.appFormError);
    }
  }

  connectedCallback() {
    if (this.initialCall) {
      this.append(this.labelElement);
      this.initialCall = false;
    }
    this.inputElement.addEventListener("keyup", this.handleInputKeyUp);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("keyup", this.handleInputKeyUp);
  }

  computeCardCvc(cardCvcFromInput) {
    if (typeof cardCvcFromInput === "string") {
      const emptyCardCvc = ["0", "0", "0"];
      const cardCvcAsArray = emptyCardCvc.map((char, charIndex) => {
        return cardCvcFromInput[charIndex] ? cardCvcFromInput[charIndex].toUpperCase() : char;
      });
      return cardCvcAsArray.join("");
    } else {
      throw new Error("invalid parameter");
    }
  }

  handleInputKeyUp(event) {
    const cvc = event.target.value;
    if (typeof cvc === "string") {
      if (this.inputElement.validity.valid) {
        this.isValid = true;
      } else {
        this.isValid = false;
        if (this.inputElement.validity.valueMissing) {
          this.appFormError.message = "Can't be blank";
        } else if (this.inputElement.validity.tooShort) {
          this.appFormError.message = "Too short";
        } else if (this.inputElement.validity.patternMismatch) {
          this.appFormError.message = "Wrong format";
        }
      }
      const newCvc = this.computeCardCvc(cvc);
      const customEvent = new CustomEvent("update-card-cvc", {
        bubbles: true,
        detail: {
          cvc: newCvc,
        }
      });
      const formCustomEvent = new CustomEvent("update-form", { bubbles: true });
      this.dispatchEvent(customEvent);
      this.dispatchEvent(formCustomEvent);
    } else {
      throw new Error("the event value is not a string");
    }
  }
}

export default AppFormCardCvc;