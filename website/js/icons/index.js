import React from "react";
import ReactDOM from "react-dom";
import {whenReady} from "neutrine/lib/utils";

import {IconsExplorer} from "./Icons.js";

//When dom is ready
whenReady(function () {
    ReactDOM.render(<IconsExplorer />, document.getElementById("root"));
});


