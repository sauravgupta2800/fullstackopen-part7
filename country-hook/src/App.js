import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const { data } = await axios.get(
          `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
        );
        console.log(data);
        setCountry(data);
      } catch {}
    }

    name && fetchCountry();
  }, [name]);

  return country;
};

const Countries = ({ countries = [] }) => {
  if (!countries.length) {
    return null;
  }

  console.log("countries: =>", countries);

  return (
    <div>
      {countries.map((country) => (
        <div>
          <h3>{country.name} </h3>
          <div>capital {country.capital} </div>
          <div>population {country.population}</div>
          <img
            src={country.flag}
            height="100"
            alt={`flag of ${country.name}`}
          />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      {country && country.length && <Countries country={country} />}
    </div>
  );
};

export default App;
