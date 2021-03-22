import styled, { createGlobalStyle } from "styled-components";
//@ts-ignore
import BGImage from './assets/photo-1616186627467-4b2ae8e864c1.jpg'

export const GlobalStyle = createGlobalStyle`
    html{
        height : 100%
    }
    body{
        background-image : url(${BGImage});
        background-size : cover;
        background-position :center;
        
        background-repeat : no-repeat;
        margin : 0;
        padding : 0 20px;
        display:flex;
        justify-content:center;
        position:relative
    }
    body::before{
        position:absolute;
        content:'';
        height:100vh;
        width:100vw;
        z-index : -1;
        top:0;
        left:0;
        background:rgba(0,0,0,.5)
    }
    *{
        color : '#fff';
        box-sizing: border-box;
        font-family: 'Playfair Display', serif;
    }

`
export const Wrapper = styled.div`
    display :flex;
    flex-direction:column;
    z-index:1;
    align-items:center;
    height:100vh;
    justify-content:center;
    color:#fff;
    >p{
        color:#fff;

    }
    .score{
        color:#fff;
        font-size:2rem;
        margin : 0
    }
    h1{
      
        color:#fff;
        margin:20px;
        font-weight:700;
    }
    .start,.next,.finish{
        background-color: rgba(0,0,0,0.5);
        border:none;
        outline:none;
        font-size:20px;
        margin:10px 0;
        padding : 10px 20px;
        border-radius:4px;
        cursor:pointer;
        color : #fff;
    }
    .difficulty-wrapper{
        width:100%;
        display:flex;
        aligh-items:center;
        justify-content:space-around;
    }
    .difficulty{
        background:black;
        border:none;
        outline:none;
        font-size:20px;
        margin:10px 0;
        padding : 10px 20px;
        border-radius:4px;
        cursor:pointer;
        color : #fff;
    }
    .difficulty.selected{
        background-color: rgba(0,0,0,0.5);

    }
    button:hover{
        background-color: black;
        
    }
    select{
        border:none;
        outline:none;
        margin:30px 0;
        width:100%;
        padding:10px 20px;
        font-size:20px;
        color:white;
        background-color: rgba(0,0,0,0.5);
    }
    .button-group {
        display: flex;
        justify-content:space-between;
        width: 100%;
      }
    
`