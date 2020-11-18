import React from "react";
import {squareProps} from "./Types";



export function Square(props: squareProps) {
    return (
        <button className="square" onClick={props.onClick}> {props.value} </button>
    );
}
