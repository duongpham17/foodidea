export const locally = (name: string) => {
    const storage = typeof window === "undefined" ? "" :  localStorage.getItem(name);
    const item = storage ? JSON.parse(storage) : null;
    return item
}