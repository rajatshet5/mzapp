import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Gallery } from './Components/Gallery';
import { NavBar } from './Components/NavBar';

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [imagesArr, setImagesArr] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  useEffect(() => {
    axios.get(`https://unsplash.com/nautocomplete/${q}`)
      .then((res) => {
        console.log(res.data);
        setSuggestions(res.data.autocomplete);
      })
      .catch((err) => {
        alert(err);
      })
    }, [q]);
    const getImages = () => {
      setSearchLoading(true);
      axios.get(`https://api.unsplash.com/search/photos?page=10&per_page=10&query=${q}&client_id=tKLhuJkmPl6kmr0aOuiwZ2btcvms9kKX-sQFKpmc75k`)
      .then((res) => {
        console.log(res.data.results);
        setImagesArr(res.data.results);
        setSearchLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        alert(err);
      })
  }
  return (
    <div className="App">
      <NavBar
        suggestions={suggestions}
        onChange={(val) => setQ(val)}
        loading={loading}
        setLoading={setLoading}
        getImages={getImages}
        q={q}
      />
      <Gallery searchLoading={searchLoading} setSearchLoading={setSearchLoading} images={imagesArr}/>
    </div>
  );
}

export default App;
