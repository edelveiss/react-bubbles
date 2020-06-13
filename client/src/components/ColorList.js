import React, { useState } from "react";
//import axios from "axios";
import { deleteData, updateData, postData } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import {
  EDITING_STATE,
  FORM_STATE_COLOR,
  SET_COLOR,
  SET_INITIAL_COLOR,
  FORM_STATE_HEX,
} from "../actions/index";

// const initialColor = {
//   color: "",
//   code: { hex: "" }
// };

const ColorList = () => {
  //console.log(colors);
  //const [editing, setEditing] = useState(false);
  //const [colorToEdit, setColorToEdit] = useState(initialColor);
  const state = useSelector((state) => state);
  const [additing, setAdditing] = useState(false);
  const dispatch = useDispatch();
  const editColor = (color) => {
    // setEditing(true);
    // setColorToEdit(color);
    dispatch({ type: EDITING_STATE });
    dispatch({ type: SET_COLOR, payload: color });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    dispatch(updateData(state.color, state.colors));
    //setEditing(false);
    dispatch({ type: EDITING_STATE });
    dispatch({ type: SET_INITIAL_COLOR });
  };
  //-----------Add color--------------
  const addColor = () => {
    setAdditing(true);
    //setColorToEdit(color);
  };
  const saveAdd = (e) => {
    e.preventDefault();
    console.log("stateColor", state.color);
    dispatch(postData(state.color));
    setAdditing(false);
    dispatch({ type: SET_INITIAL_COLOR });
  };
  //----------------------------------
  const cancelHandle = () => {
    dispatch({ type: SET_INITIAL_COLOR });
    // setEditing(false);
    dispatch({ type: EDITING_STATE });
  };

  const deleteColor = (color) => {
    dispatch(deleteData(color.id, state.colors));
  };
  const handleChangeColor = (e) => {
    dispatch({
      type: FORM_STATE_COLOR,
      name: e.target.name,
      value: e.target.value,
    });
  };
  const handleChangeHex = (e) => {
    dispatch({
      type: FORM_STATE_HEX,
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {state.colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {state.editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              // onChange={e =>
              //   setColorToEdit({ ...colorToEdit, color: e.target.value })
              // }
              name="color"
              onChange={handleChangeColor}
              value={state.color.color}
            />
          </label>
          <label>
            hex code:
            <input
              // onChange={e =>
              //   setColorToEdit({
              //     ...colorToEdit,
              //     code: { hex: e.target.value }
              //   })
              // }
              name="hex"
              onChange={handleChangeHex}
              value={state.color.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={cancelHandle}>cancel</button>
          </div>
        </form>
      )}
      {/**------------------------------------------------------- */}

      {/**------------------------------------------------------- */}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div style={{ marginBottom: "1rem" }}>
        {additing && (
          <form onSubmit={saveAdd}>
            <legend>add color</legend>
            <label>
              color name:
              <input
                // onChange={(e) =>
                //   setColorToEdit({ ...stateColor, color: e.target.value })
                // }
                name="color"
                onChange={handleChangeColor}
                defaultValue={state.color.color}
              />
            </label>
            <label>
              hex code:
              <input
                // onChange={(e) =>
                //   setColorToEdit({
                //     ...colorToEdit,
                //     code: { hex: e.target.value },
                //   })
                // }
                name="hex"
                onChange={handleChangeHex}
                defaultValue={state.color.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setAdditing(false)}>cancel</button>
            </div>
          </form>
        )}

        <button onClick={() => addColor()}>add color</button>
      </div>
    </div>
  );
};

export default ColorList;
