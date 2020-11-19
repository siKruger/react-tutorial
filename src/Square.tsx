import React from "react";
import {squareProps} from "./Types";



export function Square(props: any) {
    return (
        <button className="square" onClick={props.onClick}> {props.value} </button>
    );
}
