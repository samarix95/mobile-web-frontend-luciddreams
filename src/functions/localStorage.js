export function saveToLocalStorage(data) {
    data.forEach(element => {
        localStorage.setItem(Object.keys(element)[0], Object.values(element)[0]);
    });
}

export function getFromLocalStorage(keys) {
    let data = [];
    keys.forEach(element => {
        if (typeof localStorage[`${element}`] !== "undefined") {
            data.push({ [`${element}`]: localStorage[`${element}`] });
        }
    });
    return data;
}

export function removeFromLocalStorage(keys) {
    keys.forEach(element => {
        localStorage.removeItem([`${element}`]);
    });
}