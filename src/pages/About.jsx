import React from "react";
import React, { useEffect, useState } from "react";


function About() {
  let { data, setData } = useState([  ]);
  let { show, setShow } = useState(true);
  console.log(show);

  useEffect(() => {
    console.log("samol");
    async function getData() {
      try {
        let response = await fetch("http://jsonbek.uz/api/posts?/style=comedy");
        if (!response.ok) {
          throw new Error("xato");
        }
        let data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
    <button className onClick={() => setShow(!show)}>
      button
    </button>
    </div>

  );
}

export default About;
