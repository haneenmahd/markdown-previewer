import React from "react";
import marked from "marked";
import "./styles.css";

marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function (href, text, title) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};
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
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
      fileName: "Hello World.md"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximized = this.handleEditorMaximized.bind(this);
    this.handlePreviewMaximized = this.handlePreviewMaximized.bind(this);
    this.handleFileName = this.handleFileName.bind(this);
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
  render() {
    return (
      <div className="App">
        <div
          className={`editor-window-mac ${
            this.state.editorMaximized
              ? "fullscreen"
              : this.state.previewMaximized
              ? "not-visible"
              : null
          }`}
        >
          <div className="top-bar">
            <div className="icons">
              <div className="icon close"></div>
              <div className="icon minimize"></div>
              <div
                onClick={this.handleEditorMaximized}
                className="icon maximize"
              ></div>
            </div>
            <input
              placeholder="Enter a file name"
              type="text"
              onChange={this.handleFileName}
              value={this.state.fileName}
            />
          </div>
          <textarea
            id="editor"
            onChange={this.handleChange}
            value={this.state.markdown}
            className="editor"
            contentEditable
            suppressContentEditableWarning
          >
            {this.props.value}
          </textarea>
        </div>
        <div
          className={`editor-window-mac ${
            this.state.editorMaximized
              ? "not-visible"
              : this.state.previewMaximized
              ? "fullscreen"
              : null
          }`}
        >
          <div className="top-bar">
            <div className="icons">
              <div className="icon close"></div>
              <div className="icon minimize"></div>
              <div
                onClick={this.handlePreviewMaximized}
                className="icon maximize"
              ></div>
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
            className="preview"
          ></div>
        </div>
      </div>
    );
  }
}
