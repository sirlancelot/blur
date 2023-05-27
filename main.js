/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  buildPostProcessor: () => buildPostProcessor,
  default: () => BlurPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var BlurPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("blur", this.blurBlockHandler.bind(this, null));
    this.registerMarkdownCodeBlockProcessor("blur-brick", this.blurBlockHandler.bind(this, null));
    this.registerMarkdownCodeBlockProcessor("blur-bone", this.blurBlockHandler.bind(this, null));
    this.registerMarkdownPostProcessor(buildPostProcessor());
    console.log("%c Blur plugin loaded", "color:lime;");
  }
  onunload() {
    console.log("%c Blur plugin unloaded", "color:lime;");
  }
  async blurBlockHandler(type, source, el, ctx) {
    if (el.className === "block-language-blur-brick") {
      const block = el.createEl("div", { cls: "blur-brick-block" });
      let inputElement;
      inputElement = block.createEl("div", { text: "", cls: "blur-brick-innerblock" });
      source.split(/\W+/).forEach((w) => {
        let word = w.trim();
        if (word !== "") {
          inputElement.appendChild(createEl("code", { text: word.replace(/[^\s]/g, "\u2588"), cls: "blur-brick" }));
        }
      });
    } else if (el.className === "block-language-blur-bone") {
      const block = el.createEl("div", { cls: "blur-bone-block" });
      let inputElement;
      inputElement = block.createEl("div", { text: "", cls: "blur-bone-innerblock" });
      source.split(/\W+/).forEach((w) => {
        let word = w.trim();
        if (word !== "") {
          inputElement.appendChild(createEl("code", { text: word, cls: "blur-bone" }));
        }
      });
    } else if (el.className === "block-language-blur") {
      const block = el.createEl("div", { cls: "blur-block" });
      let inputElement;
      inputElement = block.createEl("div", { text: "", cls: "blur-innerblock" });
      source.split(/\W+/).forEach((w) => {
        let word = w.trim();
        if (word !== "") {
          inputElement.appendChild(createEl("code", { text: word, cls: "blur-inline" }));
        }
      });
    }
  }
};
function buildPostProcessor() {
  return (el) => {
    el.findAll("code").forEach((code) => {
      let text = code.innerText.trim();
      if (text.startsWith("~[") && text.endsWith("]")) {
        let part = text.substring(1);
        let content = part.substring(part.length - 1, 1);
        code.addClass("blur-brick");
        code.innerText = content.replace(/[^\s]/g, "\u2588");
      } else if (text.startsWith("~(") && text.endsWith(")")) {
        let part = text.substring(1);
        let content = part.substring(part.length - 1, 1);
        code.addClass("blur-bone");
        code.innerText = content;
      } else if (text.startsWith("~{") && text.endsWith("}")) {
        let part = text.substring(1);
        let content = part.substring(part.length - 1, 1);
        code.addClass("blur-inline");
        code.innerText = content;
      }
    });
  };
}
