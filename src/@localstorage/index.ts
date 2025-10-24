import {data} from '@data/business'; 

export const unique_hostname = data.name

export const user_authentication = {
  name: `${unique_hostname}-user-key`,
  get() {
    const item = localStorage.getItem(this.name);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  },
  set(data: any) {
    if (typeof data === "string") {
      localStorage.setItem(this.name, data);
    } else {
      localStorage.setItem(this.name, JSON.stringify(data));
    }
  },
  remove(){
    localStorage.removeItem(this.name);
  },
};