import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-Sora);
  background-color: #25272E;
  position: relative;
  z-index: 1;

  &.blur {
    filter: blur(4px);
  }
`;

export const ImageHome = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 55%;
  min-height: 300px;
`;

export const ImageToggle = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
`;

export const ImageToggleRender = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 200px;
`;


export const AnimationData = styled.div`
  height: 300px;
  width: 1000px;
  border: 1px solid #fff;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing space between components
export const SpacerSuperLarge = styled.div`
  height: 52px;
  width: 52px;
`;

// Used for providing space between components
export const SpacerUnTraLarge = styled.div`
  height: 82px;
  width: 82px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "#373943" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
`;

export const Containertoggle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #272A34;
  width: 100%;
  height: 40vh;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  visibility: hidden;
  box-shadow: 2rem 0.5rem 2rem 1rem rgba(0, 0, 0, 0.3);
  
  &.active-tab {
    visibility: visible;
  }
`;

export const ContainertoggleBreed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* &.open {
    visibility: visible;
  }

  &.close {
    visibility: hidden;
  } */
`;

export const ContainertoggleBreedShow = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  width: 1330px;
  box-sizing: border-box;
  background-color: #373943;
  border-radius: 0.8rem;
  position: relative;
  ;

  /* &.open {
    visibility: visible;
  }

  &.close {
    visibility: hidden;
  } */
`;

export const ContainerTabBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373943;
  width: 70%;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  border-radius: 0.8rem;
  padding: 15px;
  /* border: 1px solid #ffffff; */
`;

export const ContainerHome = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "#373943" : "none")};
  width: 70%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  background-color: #373943;
  border-radius: 0.8rem;
`;

export const ContainerHomeProp = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "#373943" : "none")};
  width: 100%; 
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  background-color: #373943;
  border-radius: 0.8rem;
`;

export const Containerfooter = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ test }) => (test ? "#373943" : "none")};
  width: 70%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
`;

export const BoxHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`;

export const InputTransfer = styled.input.attrs({type: "text"})`
  display: inline-block;
  width: 100%;
  height: 45px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: #333;
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 0 10px;
  font-size: 16px;
  color: #fff;
`;

export const InputTransferNumber = styled.input.attrs({type: "number"})`
  display: inline-block;
  width: 100%;
  height: 45px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: #333;
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 0 10px;
  font-size: 16px;
  color: #fff;
`;
// Details
export const StyledTextBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const TextDescriptionDetail = styled.p`
  color: #ffffff;
  font-size: 30px;
  letter-spacing: 0.8px;
  font-weight: 600;
`;


export const TextSubTitleDetail = styled.p`
  color: rgb(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.8px;
  line-height: 2px;
`;

export const TextTitleDetails  = styled.p`
  color: #ffffff;
  font-size: 18px;
  letter-spacing: 0.2px;
  line-height: 0;
  font-weight: 400;
`;

export const StyledTextBoxAround = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const StyledImgDetails = styled.div`
  width: 400px;
  border-radius: 0.8rem;
  box-shadow: 0 0 1em 20px rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;

export const BoxDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  box-sizing: border-box;
  border-radius: 0.8rem;
  margin-left: 5rem;
  ;
`;

export const ContainerDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  box-sizing: border-box;
  border-radius: 0.8rem;
  /* background-color: #373943; */
  ;
`;

export const StyledButtonAction= styled.button`
  width: 100%;
  height: 45px;
  border-radius: 0.4rem;
  border: 1px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  font-family: var(--font-family-Rubik);
  font-size: 18px;
  font-weight: 500;
  outline: none;
  border: 1px solid rgb(254, 22, 229);
  background-color: rgb(254, 22, 229, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

//navbarhelpers
export const MenuTabs = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;

export const Tabs = styled.a`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  cursor: pointer;
  transition: 0.5s;
  font-size: 18px;
  font-weight: 500;
  padding-left: 20px; 
  transition: 0.5s ease-out;
  border-bottom: 1px solid #ffffff;

  &.active-tab {
    background-color: rgb(254, 22, 229, 0.7);
    border-radius: 0.7rem 0.7rem 0 0;
    border-bottom: 1px solid rgb(254, 22, 229, 1);
  }

`;

export const StyledButtonTransfer = styled.button`
  display: block;
  height: 45px;
  width: auto;
  border-radius: 0.4rem;
  border: 1px solid rgb(254, 22, 229);
  background-color: rgb(254, 22, 229, 0.2);
  color: #fff;
  cursor: pointer;
  font-family: var( --font-family-Sora);
  font-size: 18px;
  transition: all 0.5s ease-in-out;
  font-weight: 600;
  outline: none;
  padding: 0 20px;

`;
//
export const Box = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  color: #ffffff;
  border-radius: 0.8rem;
  transition: 0.2s;
  background-color: #272A34;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-0.5%);
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.2)
  }
`;

export const BoxTab = styled.div`
  display: block;  
  /* justify-content: center;
  align-items: center; */
  width: 50%;
`;

export const BoxTimerCouter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  /* border: 1px solid #ffffff; */
`;

export const StyledImg = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 0.8rem;
  cursor: pointer;
`;

export const StyledTextBoxBoder = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

export const StyledTextBoxName = styled.p`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledTextBoxNameDetails = styled.p`
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledTextBoxPrice = styled.p`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TextTitle = styled.p`
  color: #ffffff;
  font-size: 25px;
  font-weight: 600;
`;

export const TextSubTitle = styled.p`
  color: rgb(255, 255, 255, 0.4);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.8px;
  line-height: 2px;
`;

export const TextDescription = styled.p`
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.8px;
  font-weight: 600;
`;

export const TextTitleHome = styled.p`
  color: #ffffff;
  font-size: 50px;
  letter-spacing: 0.8px;
  font-weight: 500;
  font-family: var(--font-family-Sora);
  line-height: 0px;
`;

export const TextSubTitleHome = styled.p`
  color: rgb(255, 255, 255, 0.6);
  font-size: 18px;
  font-weight: 400;
  line-height: 2px;
`;

export const StyledButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  height: 44px;
  width: 15%;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-family: var( --font-family-Sora);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: 1px solid rgb(254, 22, 229);
  background-color: rgb(254, 22, 229, 0.2);

  &:hover {
    transition: all 0.2s ease-in-out;
    border: 1px solid #fff;
    background: #fff;
    color: #000000;
  }
`;

export const StyledButtonPrice = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  height: 20px;
  padding: 0 10px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-family: var( --font-family-Sora);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: 1px solid rgb(254, 22, 229);
  background-color: rgb(254, 22, 229, 0.2);
  position: relative;
`;

export const StyledButtonHome = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  width: 9%;
  border-radius: 0.4rem;
  padding: 0 18px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-family: var( --font-family-Rubik);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: 1px solid rgb(254, 22, 229);
  background-color: rgb(254, 22, 229, 0.2);

  &:hover {
    transition: all 0.2s ease-in-out;
    border: 1px solid #fff;
    background: #fff;
    color: #000000;
  }
`;

export const StyledButtonUnsale = styled.button`
  display: block;
  height: 40px;
  width: auto;
  border-radius: 0.4rem;
  border: 1px solid #ffd32a;
  background: none;
  color: #ffd32a;
  cursor: pointer;
  font-family: var(--font-family-Sora);
  font-size: 12px;
  letter-spacing: 2px;
  transition: all 0.5s ease-in-out;
  font-weight: 600;
  outline: none;
  padding: 0 20px;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #ffd32a;
    visibility: none;
    color:#010606;
  }

  /* &:disabled {
    opacity: 0.2;
    pointer-events: none;
  } */
`;

export const StyledButtonLoading = styled.div`
  display: inline-block;
  align-items: center;
  width: 100%;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 4px dotted #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: button-loading-spinner 1.2s linear infinite;

  @keyframes button-loading-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`
export const TextSubTitleFooterContent = styled.p`
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
`;

//navbarHome
export const MenuTabsHome = styled.div`
  width: 30%;
  height: 40px;
  display: flex;
`;

export const TabHome = styled.a`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  transition: 0.5s;
  font-size: 16px;
  font-weight: 500;
  transition: 0.5s ease-in-out;
  border: 1px solid transparent;
      border-radius: 0.6rem;

  &.active-tab {
    transition: 0.5s ease-in-out;
    border: 1px solid rgb(254, 22, 229);
    background: rgb(254, 22, 229, 0.2);
    border-radius: 0.6rem;
  }

`;

//Breed
export const ContentBreed = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

export const ContainerBreed = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoxBreed = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 236px;
  height: 431px;
  border: 1px dotted #ffffff;
  background-color: transparent;
  border-radius: 0.8rem;
  opacity: 0.5;
  margin-top: 15px;
`

export const CustomSelect = styled.select`
  display: inline-block;
  width: 100%;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #333;
  outline: none;
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 0 10px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
`
export const CustomOption = styled.option`
  display: inline-block;
  width: 100%;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #333;
  outline: none;
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 0 10px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
`

export const TextDescriptionBreed = styled.p`
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

//popup
export const ShowItems = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  position: fixed;
  top: -16px;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShowContent = styled.div`
  position: relative;
  width: 50%;
  height: 520px;
  background-color: #ffffff;
  border-radius: 0.8rem;
`;

export const StyledButtonClose = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  border: 1px solid #333333;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #333333;
    visibility: none;
    color: #ffffff;
  }
`;

export const TextTitlePopup = styled.p`
  display: flex;
  justify-content: flex-start;
  margin-left: 15px;
  color: #000000;
  font-size: 20px;
  font-weight: 600;
`;

export const BoxPopup = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  border: 1px solid #333333;
  border-radius: 0.8rem;
`;

export const StyledTextBoxPopup = styled.p`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TextDescriptionPopup = styled.p`
  color: #333333;
  font-size: 14px;
  letter-spacing: 0.8px;
  font-weight: 600;
  height: 5px;
`;

export const StyledImgPopup = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #333333;
  border-radius: 0.8rem;
  cursor: pointer;
`;
//MarketPlace
export const InputSearch = styled.input.attrs({type: "search"})`
  width: 40%;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #333;
  outline: none;
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 0 20px;
  font-size: 15px;
  color: #fff;
  transition: 0.3s;

  &:focus {
    border-color: #256ce1;
  }
`;

export const ContentMarket = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  top: -100px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

//Pagination
export const StyledNumberPage = styled.div`
  color: #ffffff;
  padding: 3px 12px;
  transition: background-color .3s;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 0.4rem;

  &.active-tab {
    border: 1px solid rgb(254, 22, 229);
    background-color: rgb(254, 22, 229, 0.2);
  }

  &:hover {
    border: 1px solid rgb(254, 22, 229);
    background-color: rgb(254, 22, 229, 0.2);
  }
`;

export const StyledNumber = styled.div`
  margin-left: 5px;
`;

export const TextDescriptionPage = styled.div`
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.8px;
  font-weight: 600;
  cursor: pointer;

  &.disable {
    color: rgb(255, 255, 255, 0.4);
    pointer-events: none;
  }
`;
//
export const BoxLoadingRender = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;