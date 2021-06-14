import React from 'react';
import styled from 'styled-components';

/**
 * @typedef {import('../../../types/types').AutoCompletionProps} AutoCompletionProps
 */

const Container = styled.div`
  max-height: 100%;
  width: 50%;
  border-radius: 9px;
  box-shadow: ${props => props.theme === 'light' ? '4px 7.5px 20px 0 #00000030' : '4px 7.5px 20px 0 #00000010'};
  position: absolute;
  background:${props => props.theme === 'light' ? '#191919' : '#fff'};
  padding: 0px 0;
  top: 20%;
  right: 5%;
  overflow: hidden;
  transition: 0.25s;
  display: ${props => props.display};
  flex-direction: column;
`;

const Snippet = styled.div`
  height: 20px;
  font-size: 16px;
  font-weight: 600;
  margin: 2px 0;
  color: ${props => props.color};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 30px;
  & .active {
      background: #166edc;
      color: #fff;
  }
`;

/**
 * 
 * @param {string} value Value to test
 * @param {RegExp} regex Pattern to match
 * @return {boolean} Returns if it matches or not
 */
const matches = (value, regex) => {
    if (regex.test(value)) {
        return true;
    } else {
        return false;
    }
}

class SnippetLayout extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { snippets } = this.props;

        return (
            snippets.map((snip, i) => (
                <Snippet key={i}>
                    {snip.name}
                </Snippet>
            ))
        );
    }
}

class AutoCompletion extends React.Component {
    /**
     * 
     * @param {AutoCompletionProps} props 
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            shouldRemainOpen: false
        };

        this.handleState = this.handleState.bind(this);
    }

    /**
     * 
     * @param {boolean} value Value to append to state
     * @returns {Object}
     */
    handleState(value) {
        return this.state = {
            shouldRemainOpen: value
        };
    }

    render() {
        const { theme, snippets, source } = this.props;
        let activeWord = source.split(" ") || source.split("\n") || source.split("\r");

        activeWord = activeWord[activeWord.length - 1];

        let activeRegex = new RegExp(activeWord, 'gi');

        return (
            <Container display={this.state.shouldRemainOpen ? 'inherit' : 'none'} theme={theme}>
                {console.log('Test of pattern: word ->', snippets[0].name, ',', 'with regex', activeRegex)}
                {console.log(activeRegex.test(snippets[0].name))}
                {/**<SnippetLayout snippets={snippets} />*/}
            </Container>
        );
    }
}

export default AutoCompletion;