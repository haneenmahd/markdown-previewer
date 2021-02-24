import React from "react";
import marked from "marked";
import { DropDown } from "./components/dropdown";
import "./styles.css";
import "./readme-styles.css";
import { fstat } from "fs";

// File download feature
const fileDownload = require("js-file-download");

marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------- | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Pic](https://www.gannett-cdn.com/presto/2018/12/15/USAT/2e7b9863-85ac-4faa-aad3-096fc1826c20-GettyImages-841647034.jpg)
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: placeholder,
      isDark: false,
      editorMaximized: false,
      previewMaximized: false,
      fileName: "👋🏻New Comer.md",
      isDropOpen: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.handleEditorMaximized = this.handleEditorMaximized.bind(this);
    this.handlePreviewMaximized = this.handlePreviewMaximized.bind(this);
    this.handleFileName = this.handleFileName.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleDropSelect = this.handleDropSelect.bind(this);
  }
  handleDropDown(e) {
    if (e.target.id === "add-icon") {
      this.setState({
        isDropOpen: true
      });
    } else {
      this.setState({
        isDropOpen: false
      });
    }
  }
  handleTheme() {
    this.setState({
      isDark: !this.state.isDark
    });
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximized() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximized() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  handleFileName(e) {
    this.setState({
      fileName: e.target.value
    });
  }
  handleDropSelect(element, subElement, text="Change this text", src="https://www.gannett-cdn.com/presto/2018/12/15/USAT/2e7b9863-85ac-4faa-aad3-096fc1826c20-GettyImages-841647034.jpg", placeholder="TextField:") {
    if (element !== "img" && element !== "input") {
     if (subElement) {
      this.setState({
        markdown: this.state.markdown + `<${element}><${subElement}>${text}</${subElement}></${element}> \n`
      });
     } else {
       this.setState({
         markdown: this.state.markdown + `<${element}>${text}</${element}> \n`
       });
     }
    } else if (element === "img") {
       this.setState({
         markdown: this.state.markdown + `<${element} alt="readme-image" src="${src}" /> \n`
       });
     } else if (element === "input") {
       this.setState({
         markdown: this.state.markdown + `<${element} placeholder="${placeholder}" type="text" /> \n`
       });
     }
    } 
  render() {
    const readmeCode = () => {
      const styles = require("./readme-styles.css");
      const html = this.state.markdown;

      return `
             ${html}
             <style>
                ${styles}
             </style>
      `;
    };
    const handleCode = () => {
      fileDownload(readmeCode(), `${this.state.fileName}`);
    };
    
    return (
      <div className={`App ${this.state.isDark ? "dark": null}`}>
       <div className="workspace">
        <div
          onClick={this.handleDropDown}
          className={`editor-window-mac ${
            this.state.editorMaximized
              ? "fullscreen"
              : this.state.previewMaximized
              ? "not-visible"
              : null
          } ${this.state.isDark ? "dark": null}`}>
          <DropDown isOpen={this.state.isDropOpen ? true : false}>
            <div onClick={() => this.handleDropSelect("h1")} className="option">Add a Header</div>
            <div onClick={() => this.handleDropSelect("p")} className="option">Add a paragraph</div>
            <div onClick={() => this.handleDropSelect("ul", "li")} className="option">Add a unordered list</div>
            <div onClick={() => this.handleDropSelect("ol", "li")} className="option">Add a ordered list</div>
            <div onClick={() => this.handleDropSelect("img", null, null)} className="option">Add a Image</div>
            <div onClick={() => this.handleDropSelect("button", null, "Button")} className="option">Add a Button</div>
            <div onClick={() => this.handleDropSelect("input")} className="option">Add a TextField</div>
            <div onClick={() => this.handleDropSelect("style", null, "h1 { text-align: center; }")} className="option">Add custom styling</div>
          </DropDown>
          <div className={`top-bar ${this.state.isDark ? "dark": null}`}>
            <div className="icons">
              <div className="icon close"></div>
              <div className="icon minimize"></div>
              <div
                onClick={this.handleEditorMaximized}
                className="icon maximize"></div>
            </div>
            <input
              placeholder="Enter a file name"
              type="text"
              onChange={this.handleFileName}
              value={this.state.fileName}
            />
            <svg id="add-icon" width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path className="add-icon-path" d="M16.5 21.0044C16.9067 21.0044 17.2471 20.6807 17.2471 20.2822V14.7622H22.6094C23.0078 14.7622 23.3481 14.4219 23.3481 14.0151C23.3481 13.6084 23.0078 13.2764 22.6094 13.2764H17.2471V7.74805C17.2471 7.34961 16.9067 7.02588 16.5 7.02588C16.0933 7.02588 15.7612 7.34961 15.7612 7.74805V13.2764H10.3906C9.99219 13.2764 9.65186 13.6084 9.65186 14.0151C9.65186 14.4219 9.99219 14.7622 10.3906 14.7622H15.7612V20.2822C15.7612 20.6807 16.0933 21.0044 16.5 21.0044Z" fill="#737373"/>
            </svg>
          </div>
          <label>
          <textarea
            id="editor"
            onChange={this.handleChange}
            value={this.state.markdown}
            className="editor"
            contentEditable
            suppressContentEditableWarning>
            {this.props.value}
          </textarea>
          </label>
        </div>
        <div
          className={`editor-window-mac ${
            this.state.editorMaximized
              ? "not-visible"
              : this.state.previewMaximized
              ? "fullscreen"
              : this.state.isDark ? "dark"
              : null
          } ${this.state.isDark ? "dark": null}`}>
          <div className={`top-bar preview ${this.state.isDark ? "dark": null}`}>
            <div className="icons">
              <div className="icon close"></div>
              <div className="icon minimize"></div>
              <div
                onTouchMove={() => console.log("touch started!")}
                onClick={this.handlePreviewMaximized}
                className="icon maximize"></div>
            </div>
            <p>Preview</p>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(this.state.markdown, {
                renderer: renderer
              })
            }}
            id="preview"
            className="preview"></div>
        </div>
        </div>
        <div className="switch-container">
          <div className={`theme-toggle ${this.state.isDark ? "enabled" : null}`}>
             <div onClick={this.handleTheme} className={`switch ${this.state.isDark ? "enabled" : null}`}></div>
          </div>
          <p>Switch Theme to {this.state.isDark ? <strong>Light</strong> : <strong>Dark</strong>}</p>
        </div>
        <div className="download-container">
           <button id="btn-download" onClick={() => handleCode()}>Download File</button>
        </div>
      </div>
    );
  }
}