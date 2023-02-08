import React from "react";
import PropTypes from "prop-types";
import './App.css';
import pokemon from './pokemon.json';

/*
The data that gets passed into a real React Component is packaged as an Object
where each property is the attribute name and the value is the value passed in.
The component knows what to do with this object by what we defined it to do
in the creation of the component!
So for PokemonRow, we defined its parameter to destruct this object using 
the attribute name which is the property. Thus, by destructuring, we get a 
variable called pokemon that now contains the value.
From the real component used in <tbody>, we see the value is an object from the 
array from the data json file.
Now because in the component, there is HTML, to access the props of 
this variable aka an object in the HTML tags, we use { } to activate JS
*/
const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td><button onClick={() => onSelect(pokemon)}>Select</button></td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
};

// the parameters destruct the pokemon object
const PokemonInfo = ({name, base}) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
      {
        Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ) )
      }
      </tbody>
    </table>
  </div>
);

function App() {
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);
  return (
    <div style={
      {
        margin: 'auto',
        width: 800,
        paddingTop: "1rem"
      }
    }>
      <h1 className='title'>PK Search</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: "70% 30%",
        gridColumnGap: "1rem"
      }}>
        <div>
        <input
        value={filter}
       onChange={(evt) => filterSet(evt.target.value)}
        />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              { pokemon
              .filter( (pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()) )
              .slice(0,20).map( (pokemon) => (  
                <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon)=> selectedItemSet(pokemon) }></PokemonRow>
              ))}
            </tbody>
          </table>
        </div>
        { selectedItem && (
          <PokemonInfo {...selectedItem}/>
        ) }
        </div>
      </div> 
  );
}

export default App;
