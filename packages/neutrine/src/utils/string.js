//Generate a random string
export function randomString () {
    return Math.random().toString(36).slice(2, 15);
}

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


