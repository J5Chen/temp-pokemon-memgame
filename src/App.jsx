import React, { useEffect, useState } from 'react';
import gameboy from './assets/GBA-face-gametrog.webp'
function generateIds() {
  const arr = [];
  while (arr.length < 9) {
    var r = Math.floor(Math.random() * 151) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

function shuffleIds(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return [].concat(array);
}

function Card({ id, poke, onclick }) {
  return (
    <div className="card">
      <img id={id} src={poke.sprites.front_shiny} onClick={onclick} />
    </div>
  )
}


function App() {
  const [temp, setTemp] = useState([]);
  const [idArr, setIdArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [clickedList, updateClicked] = useState([]);

  useEffect(() => {
    async function pokeFetch() {
      const reqArr = idArr.map((id) => 'https://pokeapi.co/api/v2/pokemon/' + id + '/');
      const pokearr = await Promise.all(reqArr.map((link) => fetch(link)));
      const pokedetail = [];
      for (const poke of pokearr) {
        const data = await poke.json();
        pokedetail.push(data);
      }
      setTemp(pokedetail);
    }
    pokeFetch();
  }, [idArr])

  const handleClick = (e) => {
    e.preventDefault();
    if (clickedList.indexOf(e.target.id) === -1) {
      updateClicked((temp) => [...temp, e.target.id]);
      setIdArr(shuffleIds(idArr));
    } else {
      setIdArr(generateIds());
      updateClicked([]);
    }
  }

  return (
    <>
      <img id='bg' src={gameboy}/>
      <p style={{textAlign:'center'}}>Pokemon Memory Game | Score: {clickedList.length}</p>
      <div className="card-container">
        {temp.map((x) => { return temp.length > 0 ? <Card id={x.name} key={x} poke={x} onclick={handleClick} /> : null })}
      </div>
    </>
  );
}

export default App;