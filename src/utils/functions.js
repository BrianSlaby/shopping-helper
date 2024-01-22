function trimLastCharacter(string) {
    return string.slice(0, -1)
}

function trimFirstCharacter(string) {
    return string.slice(1)
}

function prepStringForDbPath(string) {
    if (string.includes("..")) {
        string = string.replaceAll("..", "")
    }
    if (string.lastIndexOf(".") === string.length - 1) {
       string = trimLastCharacter(string)
    }
    if (string[0] === ".") {
       string = trimFirstCharacter(string)
    } 
    if (string.includes(".")) {
        string = string.replaceAll(".", ",")
    }

    return string
}

function sortItems(items) {
    const itemsArray = Object.values(items)
    return itemsArray.sort((a, b) => a.createdAt - b.createdAt).sort((a, b) => a.isChecked - b.isChecked)
}

export { prepStringForDbPath, sortItems }