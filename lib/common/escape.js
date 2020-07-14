//Map special chars to html codes
let htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

//Escape html >> converts '<', '>', '&', '"' and "'" chars to html codes
export function escape (unsafe) {
    return unsafe.replace(/[&<>"']/g, function (match) {
        return htmlEscapes[match];
    });
}


