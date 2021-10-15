import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
min-height: 21vh;
/* border:1px solid red; */
margin: 19px;
position: sticky;
top:0;
`;
const WrapperContainer = styled.div`
position: sticky;
top:0;
padding: 15px ;
padding-bottom: 29px;
background-color:  #0a0e18;
width: 97%;
`;
const Wrapper = styled.div`
width: 43%;
border: 1px solid grey;
border-radius: 35px;
height: 49px;
margin: 19px auto;
display: flex;
align-items: center;
padding: 10px;
background-color:  #0a0e18;
/* padding-bottom: 0; */
margin-bottom: 1px;
/* position: relative; */
`;
const InpBox = styled.input`
padding: 3px 5px;
border:0;
outline: 0;
font-size: 23px;
/* border: 1px solid red; */
width: 89%;
background-color:#0a0e18;
color: white;
`;
const SuggestionsBox = styled.div`
display:${({ len }) => (len === 0 ? "none" : "flex")};
flex-direction: column;
max-height: 580px;
overflow: auto;
position: absolute;
left:28.3%;
border:1px solid black;
background-color: #0a0e18;
width: 43%;
padding: 8px;
margin: auto;
border-bottom-left-radius: 23px;
border-bottom-right-radius: 23px;
margin-top: 0;
div {
    min-height: 70px;
    padding: 5px 8px;
    background-color: rgb(25,33,51);
    border-radius: 3px;
    font-size: 25px;
    display: flex;
    align-items: center;
    color: white;
    font-weight: 500;
    margin-bottom: 10px;
}
& :nth-child(${({ active }) => active}) {
    background-color: #03206e;
}
`;
const Spinner = styled.div`
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 21px;
  height: 21px;
  animation: spin 0.3s linear infinite;
  /* padding: 3px; */
  /* border: 1px solid red; */
  padding: 5px;
  margin-left: 15px;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
const Clear = styled.div`
display: flex;
font-size: 23px;
/* font-weight: 500; */
cursor: pointer;
color: white;
`;

export function NavBar({ suggestions, onChange, loading, setLoading, getImages}) {
    // console.log(suggestions);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState();
    const [hideSuggestionsBox, setHideSuggestionsBox] = useState(false);
    let [fn, setFn] = useState();
    const inpRef = useRef();
    const scrollRef = useRef();
    const debounceRef = useRef();
    useEffect(() => {
        debounceRef.current = debounce(reqFn, 500);
        window.addEventListener("click", function (e) {
            console.log(e.target);
            if (e.target.id !== "inpBox" && e.target.id !== "sugBox") {
                setHideSuggestionsBox(true);
            } 
        })
    }, [])
    const reqFn = () => {
        onChange(inpRef.current.value);
        setLoading(false);
    }
    const debounce = (func, delay) => {
        let timer;
        console.log("inDB", timer);
        return () => {
            console.log("start",timer, query);
            clearTimeout(timer);
            timer = setTimeout(() => {
                func();
            }, delay);
            console.log("end",timer);
        }
    }
    // let tref;
    // const temp = () => {
    //     clearTimeout(tref);
    //     console.log("start",tref);
    //     tref = setTimeout(() => {
    //             reqFn();
    //         }, 500);
    //         console.log("end",tref);
    // }


    const handleKeyPress = (e) => {
        switch (e.keyCode) {
            case 38:
                setActive(prev => prev - 1)
                break;
            case 40:
                if (hideSuggestionsBox) setHideSuggestionsBox(false);
                if (!active) {
                    setActive(1);
                } else {
                    setActive(prev => prev + 1);
                }
                break;
            case 13:
                getResults();
                break;
            default: return;   
            }
        }
    const getResults = () => {
        console.log(active);
        setHideSuggestionsBox(true);
        if (active !== undefined) {
            setQuery(suggestions[active - 1]?.query);
        }
        getImages();
        setLoading(false);
    }
    const handleClear = () => {
        setQuery("");
        setLoading(false);
        onChange("");
        inpRef.current.focus();
    }
    const handleInputChange = () => {
        if (hideSuggestionsBox) setHideSuggestionsBox(false);
        if (active) setActive(undefined);
        setLoading(true);
        setQuery(inpRef.current.value);
        debounceRef.current();
    }
    return (
        <Container>
            <WrapperContainer>
            <Wrapper onKeyDown={handleKeyPress}>
                <InpBox id="inpBox" value={query} onChange={handleInputChange} ref={inpRef} />
                <Clear onClick={handleClear}>X</Clear>
                {loading && <Spinner/>}
            </Wrapper>
            </WrapperContainer>
            {!loading && !hideSuggestionsBox && (
                <SuggestionsBox id="sugBox" active={active} len={suggestions.length}>
                    {
                        suggestions.map((item, index) => (
                            <div onClick={getResults} onMouseOver={() => setActive(index + 1)}>{item.query}</div>
                        ))
                    }
                </SuggestionsBox>
            )}
        </Container>
    )
}