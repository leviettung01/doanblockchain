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
  font-family: var( --font-family-Sora);
  padding-bottom: 3rem;
`;

export const ImageHome = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 55%;
  min-height: 300px;
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

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  /* border: 1px solid #ffffff; */
`;

export const InputTransfer = styled.input.attrs({type: "text"})`
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
  transition: 0.3s;

  &:focus {
    border-color: #256ce1;
  }
`;

export const InputTransferNumber = styled.input.attrs({type: "number"})`
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
  transition: 0.3s;

  &:focus {
    border-color: #256ce1;
  }
`;

export const ContainerDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 350px;
  padding: 0.8rem 2rem;
  box-sizing: border-box;
  border-radius: 0.8rem;
  margin-left: 4rem;
  border: 1px solid #ffffff;
  box-shadow: 0 0 1em 1px #fff;
  /* box-shadow: 15px -15px 15px rgba(255, 255, 255, 0.2) */
  ;
`;

export const Box = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 0.8rem;
  transition: 0.2s;

  &:hover {
    transform: translateY(-0.5%);
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.3)
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
  border: 2px solid #ffffff;
  border-radius: 0.8rem;
  cursor: pointer;
`;

export const StyledImgDetails = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 0.8rem;
  box-shadow: 0 0 2em 10px #fff;
  cursor: pointer;
`;

export const StyledTextBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  width: 100%;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
`;

export const TextDescription = styled.p`
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.8px;
  font-weight: 600;
  height: 5px;
`;

export const TextDescriptionDetail = styled.p`
  color: #ffffff;
  font-size: 30px;
  letter-spacing: 0.8px;
  font-weight: 600;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;

export const StyledButton = styled.button`
  display: block;
  height: 70px;
  width: 180px;
  border-radius: 10px;
  border: 2px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  font-family: var( --font-family-Sora);
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  outline: none;
  transition: all 0.5s ease-in-out;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #fff;
    visibility: none;
    color: #010606;
  }
`;

export const StyledButtonTransfer = styled.button`
  display: block;
  height: 40px;
  width: auto;
  border-radius: 0.4rem;
  border: 1px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  font-family: var( --font-family-Sora);
  font-size: 12px;
  letter-spacing: 2px;
  transition: all 0.5s ease-in-out;
  font-weight: 600;
  outline: none;
  padding: 0 20px;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #fff;
    visibility: none;
    color: #010606;
  }

  /* &:disabled {
    opacity: 0.2;
    pointer-events: none;
  } */
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
  font-family: var( --font-family-Sora);
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

export const StyledButtonAction= styled.button`
  height: 40px;
  width: 100%;
  border-radius: 0.4rem;
  border: 1px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  font-family: var( --font-family-Sora);
  font-size: 12px;
  letter-spacing: 2px;
  transition: all 0.5s ease-in-out;
  font-weight: 600;
  outline: none;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: #fff;
    visibility: none;
    color: #010606;
  }
`;

export const StyledButtonLoadingAction = styled.div`
  display: inline-block;
  align-items: center;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 4px dotted #3498db;
  border-radius: 50%;
  border-top-color: transparent;
  animation: button-loading-spinner 1.2s linear infinite;
  margin:0 15px;

  @keyframes button-loading-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`

export const StyledButtonLoadingRemove = styled.div`
  display: inline-block;
  align-items: center;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 4px dotted #ffd32a;
  border-radius: 50%;
  border-top-color: transparent;
  animation: button-loading-spinner 1.2s linear infinite;
  margin:0 15px;

  @keyframes button-loading-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`

export const StyledButtonLoading = styled.div`
  display: inline-block;
  align-items: center;
  width: 30px;
  height: 30px;
  background: transparent;
  border: 4px dotted #3498db;
  border-radius: 50%;
  border-top-color: transparent;
  animation: button-loading-spinner 1.2s linear infinite;

  @keyframes button-loading-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`
export const TextSubTitleFooter = styled.p`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin: 0px 20px;
`;

//navbarhelpers
export const MenuTabs = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ffffff;
  display: flex;
`;

export const Tabs = styled.a`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  transition: 0.5s;
  font-size: 16px;
  font-weight: 600;
  transition: 0.5s ease-in-out;

  &.active-tab {
    background: #333;
    border-radius: 0.7rem 0.7rem 0 0;
  }

`;
// footer
export const Footer = styled.div`
  overflow: hidden;
  display: flex;
  /* display: none; */
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: #2B2B2B;
  color: #ffffff;
  padding: 5px 0px;
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
  width: 232px;
  height: 437px;
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

// export const BoxBreed = styled.input.attrs({type: "text"})`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 234px;
//   height: 407px;
//   border: 1px dotted #ffffff;
//   background-color: transparent;
//   border-radius: 0.8rem;
//   cursor: pointer;
//   opacity: 0.5;
//   transition: 0.5s ease-in-out;

//   &:hover {
//     transition: 0.5s ease-in-out;
//     opacity: 1;
//   }

//   &::placeholder {
//     color: #ffffff;
//     font-size: 14px;
//     font-weight: 600;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
// `;

export const TextDescriptionBreed = styled.p`
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 14px;
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











