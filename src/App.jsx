import { useState } from "react";
import Autocomplete from "./components/autocomplete";

function App() {

  const fetchSuggetions = async (query) => {
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if (!data.ok) {
      throw new Error('Status was not ok');
    }
    const json = await data.json();
      return json.recipes
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Auto Complete / Type Ahead</h1>
      <Autocomplete
        fetchSuggetions={fetchSuggetions}
        placeholder={"Enter Recipe..."}
        staticData={""}
        dataKey={"name"}
        customLoading={<>Loading Recipes ....</>}
        customStyle={{
          width: "30%",
          padding: "12px 20px",
          margin: "8px 15px",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
          fontSize: "16px",
          color: "#333",
          backgroundColor: "#f9f9f9",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onSelect={(res) => {
          console.log(res);
        }}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
      />
    </>
  );
}

export default App;
