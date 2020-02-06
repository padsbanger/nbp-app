import { createHttpClient } from "../createHttpClient";
import { Dispatch } from "redux";

export const GET_TABLE = "GET_TABLE";
export const GET_TABLE_SUCCESS = "GET_TABLE_SUCCESS";
export const GET_TABLE_ERROR = "GET_TABLE_ERROR";

export const GET_ALL_TABLES = "GET_ALL_TABLES";
export const GET_ALL_TABLES_SUCCESS = "GET_ALL_TABLES_SUCCESS";
export const GET_ALL_TABLES_FAILURE = "GET_ALL_TABLES_FAILURE";

export const tables = ["A", "B", "C"];
const progressStep = 100 / tables.length;

export function getTable(tableCode: string) {
  return (dispatch: Dispatch, getState: Function): any => {
    const http = createHttpClient();
    dispatch({
      type: GET_TABLE
    });
    return http
      .get(`/tables/${tableCode}`)
      .then(({ data }) => {
        return dispatch({
          type: GET_TABLE_SUCCESS,
          payload: data[0].rates,
          progress: progressStep
        });
      })
      .catch(error => {
        return dispatch({
          type: GET_TABLE_ERROR,
          payload: error
        });
      });
  };
}

export function getTables() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GET_ALL_TABLES
    });
    const tablesApiCalls = tables.map((tableCode: string) => {
      return dispatch<any>(getTable(tableCode));
    });
    return Promise.all(tablesApiCalls)
      .then(data => {
        if (
          data.some(
            (apiCall: any) => apiCall === !apiCall || apiCall === undefined
          )
        ) {
          dispatch({
            type: GET_ALL_TABLES_FAILURE
          });
        } else {
          dispatch({
            type: GET_ALL_TABLES_SUCCESS
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_ALL_TABLES_FAILURE
        });
      });
  };
}
