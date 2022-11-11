import { writable } from "svelte/store";

export const TotalClick = writable(25);
export const ClickCount = writable(0);
export const LastVisible = writable({});
export const PostList = writable([]);
export const AlreadyViewed = writable(false);
