import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Gallery } from './Components/Gallery';
import { NavBar } from './Components/NavBar';

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [imagesArr, setImagesArr] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState("");
  useEffect(() => {
    axios.get(`https://unsplash.com/nautocomplete/${q}`)
      .then((res) => {
        console.log(res.data);
        setSuggestions(res.data.autocomplete);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      })
  }, [q]);
  const getImages = () => {
    axios.get(`https://api.unsplash.com/search/photos?per_page=1000&query=${q}&client_id=tKLhuJkmPl6kmr0aOuiwZ2btcvms9kKX-sQFKpmc75k`)
      .then((res) => {
        console.log(res.data.results);
        setImagesArr(res.data.results);
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
      <Gallery images={imagesArr}/>
    </div>
  );
}

export default App;
