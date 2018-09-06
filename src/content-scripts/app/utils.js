export const getBody = () => document.getElementsByTagName('body')[0];
    
export const htmlTemplateToDOMElement = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

export const isStorageEmpty = (obj) => !obj || Object.keys(obj).length === 0;

export const inject = (parent, child, specificIdToInjectInside = null) => {
    let root = parent;
    if(specificIdToInjectInside) {
        //append `#` if not specified
        const id = /^#/.test(specificIdToInjectInside) ? specificIdToInjectInside : `#${specificIdToInjectInside}`
        root = parent.querySelector(id);
        while (root && root.firstChild) {
            // make sure that we replace items instead of appending
            root.firstChild.remove();
        }
    }
    root.appendChild(child);
}