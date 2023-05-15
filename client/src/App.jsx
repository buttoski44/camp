import React from "react";

function App() {
  const [data, setData] = React.useState(null);
  console.log(data);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="">
        <p className="text-[#616060]">{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
