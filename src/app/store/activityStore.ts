import { makeAutoObservable, makeObservable } from "mobx";

export default class ActivityStore {
    title = 'Activity List !';

    constructor() {
        makeAutoObservable(this)
    }

    setTitle = () => {
        this.title += '!';
    }
}