//import axios from "axios";
import { axiosWithAuth } from "../util/axiosWithAuth";

export const DATA_START = "DATA_START";
export const DATA_SUCCESS = "DATA_SUCCESS";
export const DATA_FAILURE = "DATA_FAILURE";
export const EDITING_STATE = "EDITING_STATE";
export const FORM_STATE_COLOR = "FORM_STATE_COLOR";
export const SET_COLOR = "SET_COLOR";
export const SET_INITIAL_COLOR = "SET_INITIAL_COLOR";
export const FORM_STATE_HEX = "FORM_STATE_HEX";

export const getData = () => (dispatch) => {
  dispatch({ type: DATA_START });
  setTimeout(() => {
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        // console.log("get data", res);
        dispatch({ type: DATA_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.error("fetching data error: ", err);
        dispatch({ type: DATA_FAILURE, payload: err });
      });
  }, 1000);
};

export const postData = (color) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/colors", color)
    .then((res) => {
      console.log("post data", res);
      dispatch({ type: DATA_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const deleteData = (delId, colors) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .delete(`/colors/${delId}`)
    .then((res) => {
      console.log("delete data", res);

      const newColors = colors.filter((item) => item.id !== delId);

      dispatch({ type: DATA_SUCCESS, payload: newColors });
    })
    .catch((err) => {
      console.error("delete data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const updateData = (item, colors) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .put(`/colors/${item.id}`, item)
    .then((res) => {
      console.log("update data", res);

      const newColors = colors.map((itm) => {
        if (itm.id === item.id) {
          return item;
        }
        return itm;
      });

      dispatch({ type: DATA_SUCCESS, payload: newColors });
    })
    .catch((err) => {
      console.error("update data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};
