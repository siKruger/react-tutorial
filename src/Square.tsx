import React from "react";


//Todo any?
export function Square(props: any) {
    return (
        <button className="square" onClick={props.onClick}> {props.value} </button>
    );
}
