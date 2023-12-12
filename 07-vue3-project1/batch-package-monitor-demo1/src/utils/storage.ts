const storage = {
    setItem(key:string, value:any) {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    },

    removeItem(key:string) {
        sessionStorage.removeItem(key);
    },

    getItem(key:string) {
        const value = sessionStorage.getItem(key);
        try {
            return value!=null?JSON.parse(value):null;
        } catch (ev) {
            return value;
        }
    },
    clear() {
        sessionStorage.clear();
    }
};
export {storage} ;
