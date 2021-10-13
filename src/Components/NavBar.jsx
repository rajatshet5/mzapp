import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
width: 55%;
border: 1px solid grey;
border-radius: 19px;
height: 50px;
margin: 19px auto;
display: flex;
align-items: center;
padding: 10px;
`;
const InpBox = styled.input`
padding: 5px;
border:0;
outline: 0;
font-size: 19px;
`;
const SuggestionsBox = styled.div`
display:${({ len }) => (len === 0 ? "none" : "flex")};
flex-direction: column;
max-height: 180px;
overflow: auto;
border:1px solid black;
width: 55%;
margin: auto;
& :nth-child(${({ active }) => active}) {
    background-color: grey;
}
`;
const Spinner = styled.div`
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 19px;
  height: 19px;
  animation: spin 0.3s linear infinite;
  padding: 3px;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export function NavBar({ suggestions, onChange, loading, setLoading, getImages, q }) {
    console.log(suggestions);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState();
    const [hideSuggestionsBox, setHideSuggestionsBox] = useState(false);
    let [fn, setFn] = useState();
    const inpRef = useRef();
    const scrollRef = useRef();
    const debounceRef = useRef();
    useEffect(() => {
        debounceRef.current = debounce(reqFn, 500);
    }, [])
    const reqFn = () => {
        onChange(inpRef.current.value);
    }
    const debounce = (func, delay) => {
        let timer;
        console.log("inDB", timer);
        return () => {
            console.log("start",timer);
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
                setActive(prev => prev + 1);
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
    }
    return (
        <div>
            <Wrapper onKeyDown={handleKeyPress}>
                <InpBox value={query} onChange={(e) => { setLoading(true); setHideSuggestionsBox(false); setQuery(e.target.value); debounceRef.current() }} ref={inpRef} />
                {loading && <Spinner/>}
            </Wrapper>
            {!loading && !hideSuggestionsBox && (
                <SuggestionsBox active={active} len={suggestions.length}>
                    {
                        suggestions.map((item, index) => (
                            <div onClick={getResults} onMouseOver={() => setActive(index + 1)}>{item.query}</div>
                        ))
                    }
                </SuggestionsBox>
            )}
        </div>
    )
}