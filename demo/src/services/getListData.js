import { DATA_URL } from "./constants";
export const getListData = async () => (await fetch(DATA_URL)).json();