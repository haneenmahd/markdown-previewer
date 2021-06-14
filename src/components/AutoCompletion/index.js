import React from 'react';
import styled from 'styled-components';

/**
 * @typedef {import('../../../types/types').AutoCompletionProps} AutoCompletionProps
 */

const Container = styled.div`
  position: relative;
  max-height: 100%;
  min-height: 70px;
  width: 50%;
  border-radius: 9px;
  box-shadow: ${props => props.theme === 'light' ? '4px 7.5px 20px 0 #00000030' : '4px 7.5px 20px 0 #00000010'};
  position: absolute;
  background:${props => props.theme === 'light' ? '#191919' : '#fff'};
  padding-bottom: 20px;
  top: 20%;
  right: 10%;
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
  padding-bottom: 40px;
  & .active {
      background: #166edc;
      color: #fff;
  }
`;

const SnippetDefenition = styled.div`
  height: auto;
  min-height: 18px;
  border-top: 0.5px solid #c4c4c4aa;
  background-color: #c4c4c430;
  padding: 2.5px 0px 4.5px 20px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  color: #111111aa;
`;

function validateRegex(regex) {
    try {
        new RegExp(regex);
        return true;
    } catch (e) {
        return false;
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
            shouldRemainOpen: false,
            activeSnippet: this.props.snippets[0]
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

        activeWord = activeWord.replace(/(\\)|(\*)|(\))|(\()/gi, '');
        var activeRegex = validateRegex(new RegExp(activeWord, 'g')) === true ? new RegExp(activeWord, 'g') : new RegExp('\w+', 'g');

        return (
            <Container display={this.state.shouldRemainOpen ? 'inherit' : 'flex'} theme={theme}>
                {snippets.map((snip, i) => (
                    activeRegex.test(snip.name) ?
                        <>
                            <Snippet key={i}>{snip.name}</Snippet>
                            <SnippetDefenition key={snip.name}>{snip.definition}</SnippetDefenition>
                        </> : ''
                ))}
            </Container>
        );
    }
}

/**
 * Testing
 * console.log('Test of pattern: word ->', snip.name, ',', 'with regex', activeRegex)
                    console.log(activeRegex.test(snip.name) ? `Does match: ${snip.name}` : `Does not match: ${snip.name}`)
 */

export default AutoCompletion;