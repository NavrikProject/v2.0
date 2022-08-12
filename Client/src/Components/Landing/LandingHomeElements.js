import styled from "styled-components";

export const LandingSection = styled.section`
  width: 100%;
  //background-color: #541690;
  height: auto;
  background-image: url("https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 600px;
`;

export const LandingDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  height: auto;
  padding: 30px 0;
`;
export const DisplayDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 40px;
  @media only screen and (max-width: 968px) {
    display: block;
  }
`;

export const DisplayDivItem1 = styled.div`
  padding: 100px 0px;
  width: 50%;
  animation: move-right 500ms ease-in-out forwards;
  animation-delay: 1s;
  visibility: hidden;
  @keyframes move-right {
    0% {
      transform: translateX(-100px);
      opacity: 0.5;
      visibility: hidden;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
      visibility: visible;
    }
  }
`;
export const DisplayDivItem2 = styled.div`
  padding: 80px 0px;
  width: 50%;
`;
export const CorporateImage = styled.img`
  width: 100%;
`;
export const PractiwizButton = styled.button`
  outline: none;
  padding: 15px 40px;
  background: transparent;
  background-color: #9926f0;
  border: none;
  cursor: pointer;
  font-size: 21px;
  color: white;
  margin-top: 20px;
`;
export const DisplayDivItemTitleWhite = styled.h1`
  color: #fff;
  font-size: 45px;

  @media only screen and (max-width: 968px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 35px;
  }
`;

export const DisplayDivItemTitleGold = styled.h1`
  color: gold;
  font-size: 43px;
`;

export const DisplayFlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const DisplayFlexItems = styled.div`
  width: 100%;
`;

export const RpaCoeBox = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  cursor: pointer;
  padding: 20px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
`;
export const RpaCoeTitle = styled.h1`
  color: black;
  text-align: center;
  padding: 20px 0;
`;
export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const KnowMoreButton = styled.button`
  padding: 10px 30px;
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
