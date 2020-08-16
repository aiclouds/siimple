//Theme colors
let colors = {
    "red": "#e57697",
    "purple": "#b351d9",
    "orange": "#f38d00",
    "green": "#00a17d",
    "lightBlue": "#3a9ff2",
    "darkBlue": "#20118a",
    "darkGray": "#3a464e",
    "lightGray": "#969896"
};

//Export light theme configuration
export const lightTheme = {
    "name": "light",
    "tokens": {
        "comment.block": {"foreground": colors.lightGray},
        "comment.line": {"foreground": colors.lightGray},
        "constant.boolean": {"foreground": colors.red},
        "constant.language": {"foreground": colors.darkBlue},
        "constant.number": {"foreground": colors.red},
        "keyword.language": {"foreground": colors.purple},
        "meta.tag": {"foreground": colors.lightBlue},
        "meta.attribute.name": {"foreground": colors.orange},
        "meta.attribute.value": {"foreground": colors.green},
        "string.double": {"foreground": colors.green},
        "string.single": {"foreground": colors.green},
        "string.backtick": {"foreground": colors.green},
        "symbol.operator": {"foreground": colors.red},
        "symbol.punctuation": {"foreground": colors.darkGray}
    },
    "editor": {
        "editor.lines": null
    }
};


