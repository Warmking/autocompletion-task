import React, { useEffect, useState } from "react";
import "../App.css";
const Autocomplete = ({
  fetchSuggetions,
  dataKey,
  staticData,
  placeholder = "....",
  customLoading,
  customStyle = {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const handleOnChange = (e) => {
      setInputValue(e.target.value)
      onChange(e.target.value)
  }

  const getSuggestions = async (query) => {
      setError(null)
      setLoading(true)
      try {
        let results;
        if(staticData){
          results = staticData.filter((items)=>{
              return items.toLowerCase().includes(query.toLowerCase())
          })
        }
        else{
          results = await fetchSuggetions(query)
        }
        setSuggestions(results)
      } catch (error) {
        setError('failed to fetch suggestions')
        setSuggestions([])
      }
      finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    if(inputValue.length > 1){
        getSuggestions(inputValue)
        console.log(suggestions);
    }
    else{
      setSuggestions([])
    }
  },[inputValue])

  return (
    <div className="container">
      <input
        style={customStyle}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Autocomplete;
