const template = document.createElement('template');
template.innerHTML = `
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :host{
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .headerButton{
    height: 100%;
    width: 30px;
    margin: 0 15px;
    cursor: pointer;
  }

  .nameConteiner{
    flex: auto;
    height: 100%;
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .nameConteiner .userImage{
    height: 44px;
    width: 44px;
    border-radius: 25px;
    margin-right: 15px;
  }

  .nameConteiner .userName{
    /*flex: auto;*/
    height: 100%;
    padding-top: 5px;
    text-shadow: 1px 1px 0 #222;
  }

  .userName .name{
    font-size: var(--fontMinSize);
  }

  .userName .status{
    font-size: var(--fontMinMinSize);
    color: #9A9B9D;
  }

  .backButton{
    background: url(static/images/back.png) no-repeat center center;
    background-size: 100%;
  }

  .searchButton{
    background: url(static/images/search.png) no-repeat center center;
    background-size: 90%;
    margin-right: 0;
  }

  .optionsButton{
    background: url(static/images/options.png) no-repeat center center;
    background-size: 90%;
  }

  .headerButton{
    height: 100%;
    width: 30px;
    opacity: 0.5;
    transition-duration: 0.15s;
  }

  .headerButton:hover{
    opacity: 1.0;
  }

  .headerButton:active{
    opacity: 0.7;
  }
</style>
<div class="headerButton backButton"></div>
<div class="nameConteiner">
  <div class="userImage" style="background: url(static/images/image.jpg) no-repeat center center; background-size: cover;"></div>
  <div class="userName">
    <div class="name">Виталий Кисель</div>
    <div class="status">в сети 5 минут назад</div>
  </div>
</div>
<div class="headerButton searchButton"></div>
<div class="headerButton optionsButton"></div>
`;

class DialogInformation extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$backButton = this.shadowRoot.querySelector('.backButton');
    this.$searchButton = this.shadowRoot.querySelector('.searchButton');
    this.$optionButton = this.shadowRoot.querySelector('.optionsButton');

    this.$backButton.addEventListener('click', this.backButton.bind(this));
    this.$searchButton.addEventListener('click', this.searchButton.bind(this));
    this.$optionButton.addEventListener('click', this.optionButton.bind(this));
  }

  backButton() {
    this.dispatchEvent(new Event('clickBackButton'));
  }

  searchButton() {
    this.dispatchEvent(new Event('clickSearchButton'));
  }

  optionButton() {
    this.dispatchEvent(new Event('clickOptionButton'));
  }

  /* static get observedAttributes() {
      return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if(name == "value") this.$input.value = newValue;
      this.$input.setAttribute(name, newValue);
  } */
}

customElements.define('dialog-info', DialogInformation);
