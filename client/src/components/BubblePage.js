import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../actions/index";
//import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  //const [colorList, setColorList] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="color-bubbles">
      <ColorList colors={state.colors} />
      <Bubbles colors={state.colors} />
    </div>
  );
};

export default BubblePage;
