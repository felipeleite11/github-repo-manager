import Styled, { keyframes, css } from 'styled-components'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

export const Form = Styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
`

export const InputText = Styled.input`
    flex: 1;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    border: solid 1px #eee;
    background: ${props => props.notFound ? 'rgba(255, 0, 0, .4)' : '#fff'};
`

export const SubmitButton = Styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: .6;
    }

    ${props => props.loading && css`
        svg {
            animation: ${rotate} 2s linear infinite;
        }
    `}
`

export const List = Styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &+li {
            border-top: solid 1px #eee;
        }

        a {
            color: #7159c1;
            text-decoration: none;
        }
    }
`

export const ErrorSpan = Styled.span`
    color: red;
    font-size: 10px;
    margin-left: 15px;
`