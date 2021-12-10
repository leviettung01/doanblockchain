import React, {useState, useRef} from 'react'
import * as s from "../styles/globalStyles";
import TruffleRenderer from "./TruffleRenderer";
import { BiDna } from "react-icons/bi";

const ToogleShowBreed = ({data, showModal, setShowModal}) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (e) => {
        setCurrentPage(e.target.innerText);
    };

    console.log(currentPage)

    const pages = [];

    for (let i = 1; i <= Math.ceil(data.length / pageNumberLimit); i++) {
        pages.push(i);
    }
    
    const indexOfLastItem = currentPage * pageNumberLimit;
    const indexOfFirstItem = indexOfLastItem - pageNumberLimit;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    //NextPage
    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);
        if(currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      }
  
      //PrevPage
    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);
        if((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    const modalRef = useRef();

    const closeModal = (e) => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }
 
    return (
        <>
        {showModal ? (
        <s.ContainertoggleBreed ref={modalRef} onClick={closeModal}>
            <s.ContainertoggleBreedShow>
            {/* pagination */}
            <s.Container  fd={"row"} jc={"space-between"} ai={"center"} style={{padding: "17px 17px 0 12px"}}>
                <s.Container fd={"row"}>
                {pages.map((number) => (
                number < maxPageNumberLimit + 1 && number > minPageNumberLimit ? (
                    <s.StyledNumber key={number} >
                        <s.StyledNumberPage 
                            className={currentPage === number ? "active-tab" : null}
                            onClick={handleClick}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}
                        >
                            {number}
                        </s.StyledNumberPage>
                    </s.StyledNumber> 
                ): (null)  
                ))}
                </s.Container>
                <s.Container fd={"row"}>
                    <s.TextDescriptionPage
                        style={{marginRight: "15px"}}
                        className={currentPage <= 1 ? "disable" : null}
                        onClick={handlePrevbtn}
                        disabled={currentPage === pages[0] ? true : false}
                    >
                        Previous
                    </s.TextDescriptionPage>
                    <s.TextDescriptionPage
                        className={currentPage >= pages.length ? "disable" : null}
                        onClick={handleNextbtn}
                        disabled={currentPage === pages[pages.length - 1] ? true : false}
                    >
                        Next
                    </s.TextDescriptionPage>
                </s.Container>
            </s.Container>
            {/* render */}
            <s.Container jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap"}}>
            {currentItems.map(item => ( 
            <s.Box key={item.id} style={{ padding: "18px", margin:"15px"}}>
                <s.StyledImg>
                    <TruffleRenderer truffle={item}/>
                </s.StyledImg>
                <s.Container>
                    <s.TextDescription>{item.name}</s.TextDescription>
                <s.Container>
                    <s.TextDescription>#{item.id}</s.TextDescription>
                    {parseInt((item.readyTime - Date.now() / 1000) / 3600) !== 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) > 0 ? (
                    <s.TextSubTitle style={{color: "#ffd32a"}}>
                        Not Ready
                    </s.TextSubTitle>
                    ):(
                    <s.TextSubTitle style={{color: "#e96bd4"}}>
                        Breed ready
                    </s.TextSubTitle>
                    )}
                    <s.TextSubTitle><BiDna/> {item.dna}</s.TextSubTitle>
                </s.Container>
                <s.StyledTextBoxBoder>
                    <s.TextSubTitle>Rarity: <span style={{color: "#ffffff"}}>{item.rarity}</span></s.TextSubTitle>
                    <s.TextSubTitle>Level: <span style={{color: "#ffffff"}}>{item.level}</span></s.TextSubTitle>
                </s.StyledTextBoxBoder>
                </s.Container>
            </s.Box>
            ))}
            </s.Container>
            <s.StyledButtonAction 
                onClick={() => 
                    setShowModal(prev => !prev)
                }
            >
                close
            </s.StyledButtonAction>
            </s.ContainertoggleBreedShow>
            
        </s.ContainertoggleBreed>
        ):(null)}
       </>
    )
}

export default ToogleShowBreed
