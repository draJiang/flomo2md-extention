import styled, { css } from 'styled-components';

export const Button = styled.button<{ type?: 'primary' | 'second' | 'link', disable?: boolean }>`

  width:${props => props.type === 'link' ? 'auto' : '300px'};
  height:${props => props.type === 'link' ? 'auto' : '48px'};
  
  flex-shrink: 0;
  border-radius: 14px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.8px;
  text-transform: uppercase;

  &:active {
    opacity: 1.0;
  }

  &:hover {
    opacity: 0.9;
  }

  ${props => props.type === 'primary' && css`
    color: white;
    border: 0;
    background: #30D07A;
    // box-shadow: 0px 4px 0px 0px #1899D6;
  `}

  ${props => props.type === 'second' && css`
    color: #30D07A;
    border: 1px solid #30D07A;
    background: #FFF;
    // box-shadow: 0px 2px 0px 0px #E5E5E5;
  `}

  ${props => props.type === 'link' && css`
    text-decoration: none;
    color: #30D07A;
    background: transparent;
    border: none;
    box-shadow: none;
  `}

  ${props => props.disable && css`
  
    pointer-events: none;
    opacity: 0.5;
  
`}

  ${props => props.style}
  
`;

export const Divider = styled.hr`
  color: rgb(190 190 190);
  width:100%;
  margin:20px,0;

  ${props => props.style}

`

export const Input = styled.input`
  
  border-radius: 16px;
  border: 2px solid #E5E5E5;
  background: #F7F7F7;
  display: flex;
  width: 300px;
  height: 49px;
  padding: 15.758px 19.8px 14.242px 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  &:focus-visible {
    border-color:red;
  }

  ${props => props.style}

`



export const IconLink = styled.a`

  color:rgb(107 114 128);

  &:hover {
      color:rgb(17 24 39);
  }

`

