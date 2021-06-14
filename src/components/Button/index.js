import React from 'react';
import styled from 'styled-components';

/**@typedef {import('../../../types/types').ButtonProps} ButtonProps */

const _ButtonStyle = styled.button`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2%;
  min-width: 10rem;
  height: 3rem;
  outline: none;
  border: none;
  background: ${props => props.preference === 'primary' ? 'linear-gradient(0deg, #007aff 10px, #fff 160px)' : '#c4c4c4aa'};
  transition: background 0.25s, transform 0.35s, box - shadow 0.35s;
`;

export default class Button extends React.Component {
    /** @param {ButtonProps} props */
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { text, preference } = this.props;

        return (
            <_ButtonStyle preference={preference} {...this.props}>
                {text}
            </_ButtonStyle>
        );
    }
}