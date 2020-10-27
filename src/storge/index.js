// sessionStorge 封装
const item = 'mall';

export default {
    getItem(key, module_name) {
        // 递归 拿到里面的对象
        // "{"user":{"username":"blue","age":18}}"
        // modud_name 是外层 key是里层
        if (module_name) {
            let data = this.getItem(module_name);
            if (data) {
                let res = data[key];
                return res;
            }
        }
        return this.getStorage()[key]
    },
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name, val)
        } else {
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(item, JSON.stringify(val))
        }
    },
    // 得到全部sessionstorage
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(item));
    },
    clear(key, module_name) {
        let val = this.getStorage();
        if (module_name) {
            if (!val[module_name]) return;
            delete val[module_name][key];
        } else {
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }


}