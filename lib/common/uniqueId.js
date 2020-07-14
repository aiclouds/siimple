//Generate an unique ID
export function uniqueId () {
    return Math.random().toString(36).slice(2, 15);
}

