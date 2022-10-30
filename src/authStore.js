import { writable } from "svelte/store";

export const IsLoggedin = writable(false);
export const LoginUserIsMod = writable(true);

export const UserName = writable("");
