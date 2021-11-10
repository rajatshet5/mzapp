import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Gallery } from './Components/Gallery';
import { NavBar } from './Components/NavBar';

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [imagesArr, setImagesArr] = useState([]);
  const [q, setQ] = useState("");
  const [currentResultQuery, setCurrentResultQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const throttleRef = useRef();
  const imagesArrRef = useRef([]);
  const pageRef = useRef(1);

  useEffect(() => {
    throttleRef.current = throttle(checkPos, 700);
    window.addEventListener("scroll", throttleRef.current);
    return () => {
      window.removeEventListener("scroll", throttleRef.current);
    }
  }, [q, currentResultQuery]);
  useEffect(() => {
    axios.get(`https://unsplash.com/nautocomplete/${q}`)
      .then((res) => {
        // console.log(res.data);
        setSuggestions(res.data.autocomplete);
      })
      .catch((err) => {
        alert(err);
      })
    }, [q]);
  const getImages = () => {
    pageRef.current = 1;
      setSearchLoading(true);
      axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=28&query=${q}&client_id=tKLhuJkmPl6kmr0aOuiwZ2btcvms9kKX-sQFKpmc75k`)
      .then((res) => {
        // console.log(res.data.results);
        setImagesArr(res.data.results);
        imagesArrRef.current = res.data.results;
        setSearchLoading(false);
        window.scrollTo(0, 0);
        // console.log(q);
        setCurrentResultQuery(q);
      })
      .catch((err) => {
        alert(err);
        setSearchLoading(false);
      })
    }
  
  const loadNext = () => {
    setMoreLoading(true);
    // console.dir(throttleRef.current);
    // console.log(pageRef.current, q);
    axios.get(`https://api.unsplash.com/search/photos?page=${pageRef.current}&per_page=16&query=${currentResultQuery}&client_id=tKLhuJkmPl6kmr0aOuiwZ2btcvms9kKX-sQFKpmc75k`)
      .then((res) => {
        // console.log(res);
        let arr = [...imagesArrRef.current, ...res.data.results];
        imagesArrRef.current = arr;
        setImagesArr(imagesArrRef.current);
      })
      .catch((err) => {
        // alert(err);
      })
      .finally(() => {
        setMoreLoading(false);
      })
  }


  const checkPos = () => {
    // console.log(q, pageRef.current);
    let maxScrollY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (window.scrollY >= 0.98 * maxScrollY) {
      // console.log("load", q);
      pageRef.current += 1;
      loadNext();
    }
  }

  // var timer;
  // function throttle() {
  //   console.log(q, pageRef.current);
  //   if (timer) {
  //     return;
  //   }
  //   timer = setTimeout(() => {
  //     checkPos();
  //     timer = undefined;
  //   }, 3800);
  // }


  const throttle = (fn, delay) => {
    let timer;
    return () => {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        fn();
        timer = undefined;
      }, delay);
    }
  }

  return (
    <div className="App">
      <NavBar
        suggestions={suggestions}
        onChange={(val) => setQ(val)}
        loading={loading}
        setLoading={setLoading}
        getImages={getImages}
      />
      <Gallery searchLoading={searchLoading}
        setSearchLoading={setSearchLoading}
        images={imagesArr}
        moreLoading={moreLoading}
      />
    </div>
  );
}

export default App;
