import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  h1 {
    color: ${({ theme }) => theme.colors.secondary};
  }

  a {
    margin-top: 15px;

    padding: 18px 35px;

    border-radius: 50px;

    font-weight: 800;
    font-size: 20px;
    min-width: 150px;

    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.39);
    text-align: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  span {
    margin-top: 15px;
    padding: 10px 35px;
    border-radius: 50px;
    background: ${({ theme }) => theme.colors.secondary};

    flex-direction: row;

    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
`
