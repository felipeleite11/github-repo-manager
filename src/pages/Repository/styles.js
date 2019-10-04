import Styled from 'styled-components'

export const Loading = Styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const Owner = Styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        font-size: 14px;
        margin-top: 5px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }

    a {
        color: #7159c1;
        font-size: 14px;
        text-decoration: none;
    }
`

export const IssueList = Styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: solid 1px #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: solid 1px #eee;
        border-radius: 4px;
    }

    &+li {
        margin-top: 10px;
    }

    img {
        width: 36px;
        height: 36px;
        border: solid 2p #eee;
        border-radius: 50%;
    }

    div {
        flex: 1;
        margin-left: 15px;

        strong {
            font-size: 16px;

            a {
                text-decoration: none;
                color: #333;

                &:hover {
                    color: #7159c1;
                }
            }

            span {
                background: #eee;
                border-radius: 2px;
                color: #333;
                font-size: 12px;
                font-weight: 600;
                height: 20px;
                padding: 3px 4px;
                margin-left: 10px;
            }
        }

        p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
    }
`