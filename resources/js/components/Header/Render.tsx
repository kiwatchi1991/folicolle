import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Render = () => {
    return (
        <div>
            <h1>react testing library lesson</h1>
            <input type="text" />
            <button>Click1</button>
            <button>Click2</button>
            <p>Udemy</p>
            <span data-testid="copy">@React</span>
        </div>
    );
};

export default Render;
