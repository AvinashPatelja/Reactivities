import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../Details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    cancelActivity: () => void;
    selectActivity: (id: string) => void;
    formClose: () => void;
    editMode: boolean;
    formOpen: (id: string) => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submittingLoader: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity,
    cancelActivity, selectActivity, editMode, formClose, formOpen, createOrEdit,
    deleteActivity, submittingLoader }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity}
                    deleteActivity={deleteActivity} submittingLoader={submittingLoader} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                    <ActivityDetails activity={selectedActivity}
                        cancelSelectActivity={cancelActivity}
                        formOpen={formOpen}
                    />}
                {editMode &&
                    <ActivityForm activity={selectedActivity}
                        formClose={formClose} createOrEdit={createOrEdit}
                        submittingLoader={submittingLoader}
                    />}
            </Grid.Column>
        </Grid>
    )
}