import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid'

export default class ActivityStore {

    //activities: Activity[] = [];
    activityRegister = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    loadingButton = false;
    editMode = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activities(){
        return Array.from(this.activityRegister.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
    }

    loadingActivities = async () => {
        const activities = await agent.activities.list();
        activities.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            //this.activities.push(activity);
            this.activityRegister.set(activity.id, activity);
        })
        this.setLoadingInitial(false);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(x => x.id === id);
        this.selectedActivity = this.activityRegister.get(id)
    }
    cancelActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelActivity();
        this.editMode = true;
    }

    cancelForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        try {
            this.loadingButton = true;
            activity.id = uuid()
            agent.activities.create(activity);
            //this.activities.push(activity);
            this.activityRegister.set(activity.id,activity);
            this.selectedActivity = activity;
            this.loadingButton = false;
            this.editMode = false;
        } catch (error) {
            console.log(error);
            this.loadingButton = true;
        }
    }

    updateActivity = (activity: Activity) => {
        try {
            this.loadingButton = true;
            agent.activities.update(activity);
            //this.activities = [...this.activities.filter(x => x.id !== activity.id), activity]
            this.activityRegister.set(activity.id, activity);
            //Another way for the above lines
            //this.activities.filter(x => x.id !== activity.id)
            //this.activities.push(activity);

            this.selectedActivity = activity;
            this.loadingButton = false;
            this.editMode = false;
        } catch (error) {
            console.log(error);
            this.loadingButton = false;
        }
    }

    deleteActivity = async (id: string) => {
        this.loadingButton = true;

        try {
            agent.activities.delete(id);
            //this.activities = [...this.activities.filter(x => x.id !== id)]
            this.activityRegister.delete(id);
            if (this.selectedActivity?.id === id) this.cancelActivity();
            this.loadingButton = false;
        } catch (error) {
            console.log(error);
            this.loadingButton = false;
        }

    }
}