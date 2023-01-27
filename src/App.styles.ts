import styled from "styled-components";

export const Container = styled.div`
    width: 100%;    
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    gap:5em;
    background-color: #191919;
    @media (max-width: 750px){
        padding: 2em 0;
        flex-direction: column;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;

    @media (max-width: 750px){
        margin-bottom: 50px;
        align-items: center
    }
`;

export const LogoLink = styled.a`
    display: block;
`;

export const InforArea = styled.div`
    width: 100%;
    margin: 10px 0;

    @media (max-width: 750px){
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const GridArea = styled.div`
    display: flex;
    justify-content: flex-end;
    @media (max-width: 750px){
        justify-content: center;
        margin: 0 20px;
    }
`;

export const Grid = styled.div`
    width: 430px;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 10px;
    height: 20%;
    @media (max-width:750px){
        grid-template-columns: repeat(3,1fr);
    }
`;
