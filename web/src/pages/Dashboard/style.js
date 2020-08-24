import styled from 'styled-components'

export const List = styled.ul`
        width:100%;
        
`
export const SpotItem = styled.li`
        display:flex;
        flex-direction:column;
        border-radius:4px;
        margin-bottom:40px;
      
        header{
            
            img{
                width:100%;
                height:250px;
                background-size:cover;
                border-radius:2px;
                @media screen and (width:480px) {
                    height:120px;
                }
            }
            
        }
        strong{
            margin-top:5px;
            font-size:18px;
            line-height:30px;
        }
        span{
            font-size:15px;
        }
`
export const Content = styled.div`
        max-width:600px;
        min-width:400px;
        background:#B2AFAF;
        border-radius:4px;
        margin:20px auto 0;
        padding:40px;
        @media screen and (width:480px) {
            max-width:250px;
        }
`;
export const Info = styled.div`
    text-align:center;
    margin-top:20px;
    color:white;
    font-family:'Fira Code';
    font-size:17px;
    a{
        text-align:center;
        color:white;
     
        margin-top:-10px;
       &:hover{
            /* color:#000; */
            transition: all .3s ease;
            border-radius:3px;
            padding:10px;
            background: #FF6978;
       }
       &:hover >svg{
           
       }
   }
`
export const Notification = styled.ul`
    list-style:none;
    margin-bottom:15px;

    li.request-item
    {
      font-size:16px;
      line-height:24px; 
      margin-bottom:30px; 
    }
    button{
        margin-right:10px;
        border:0;
        font-weight:bold;
         margin-top:20px; 
        background:none;
    }
    button.accept{
        color:#26413C;  
       
    }
    button.reject{
        color:#E55e5e;
    }
    .carousel-control-prev{
        width:20px;
        ;
    }
   
`;