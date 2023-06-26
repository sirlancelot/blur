import { MarkdownPostProcessor, Plugin} from 'obsidian';

// Redact w/ char '█'  &block;
const blockChar = String.fromCharCode(9608);
const tokenConfig = {
  '~[]': ['blur-brick', (content) => content.replace(/[^\s]/g, blockChar)],
  '~()': ['blur-bone', (content) => content],
  '~{}': ['blur-inline', (content) => content],
};

export default class BlurPlugin extends Plugin {
  onload() {
		this.registerMarkdownCodeBlockProcessor("blur", blurBlockHandler);
		this.registerMarkdownCodeBlockProcessor("blur-brick", blurBrickHandler);
		this.registerMarkdownCodeBlockProcessor("blur-bone", blurBoneHandler);
		this.registerMarkdownPostProcessor(buildPostProcessor());
	}
}

function blurBrickHandler(source: string, el: HTMLElement, ctx: any) {
  const block = el.createEl("div", {cls: "blur-brick-block"})
  const inputElement: HTMLElement = block.createEl("div", {text: '', cls: "blur-brick-innerblock"})
  const [cls, format] = tokenConfig['~[]']
  source.split(/\W+/).forEach((word) => {
    if (word.trim())
      inputElement.appendChild(createEl('code', { text: format(word), cls })); 
  })
}

function blurBoneHandler(source: string, el: HTMLElement, ctx: any) {
  const block = el.createEl("div", {cls: "blur-bone-block"})
  const inputElement: HTMLElement = block.createEl("div", {text: '', cls: "blur-bone-innerblock"})
  const [cls, format] = tokenConfig['~()']
  source.split(/\W+/).forEach((word) => {
    if (word.trim())
      inputElement.appendChild(createEl('code', { text: format(word), cls }));
  })
}

function blurBlockHandler(source: string, el: HTMLElement, ctx: any) {
  const block = el.createEl("div", {cls: "blur-block"})
  const inputElement: HTMLElement = block.createEl("div", {text: '', cls: "blur-innerblock"})
  const [cls, format] = tokenConfig['~{}']
  source.split(/\W+/).forEach((word) => {
    if (word.trim())
      inputElement.appendChild(createEl('code', { text: format(word), cls })); 
  })
}

function buildPostProcessor(): MarkdownPostProcessor {
	return (el) => {
    for (const node of el.querySelectorAll("code")) {
      const text = node.innerText.trim();
      const tokens = `${text.slice(0, 2)}${text.slice(-1)}`;
      const [cls, format] = tokenConfig[tokens] || [];
      if (!cls) return;

      node.addClass(cls);
      node.setAttribute('tabindex', '0'); // Support `:focus` CSS
      node.innerText = format(text.slice(2, -1));
    }
  }
}
