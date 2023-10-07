import Router from "./container/Router";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { projects } from "./data";



const App = () => {

  const location = useLocation();


  useEffect(() => {
    const newTitle = projects.filter(item => item.path.indexOf(location.pathname.substring(1)) > -1)
    if (newTitle && newTitle.length === 1) {
      document.title = newTitle[0].title; //updated the title in head
    } else {
      document.title = "React Projects"
    }
  }, [location])

  return (

    <Router />
  )
};
export default App;
