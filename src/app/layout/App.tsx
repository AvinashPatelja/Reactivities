import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/Dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {acvtivityStore}= useStore();

  // useEffect(() => {
  //   axios.get<Activity[]>('https://localhost:44398/api/activities').then(response => {
  //     //console.log(response);
  //     setActivities(response.data);
  //   })
  // }, [])
  useEffect(() => {
    agent.activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
      });
      setActivities(response);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function createOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      agent.activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }

    // activity.id
    //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    //   : setActivities([...activities, { ...activity, id: uuid() }]);
    // setSelectedActivity(activity);
  }

  function handleDelteActivity(id: string) {
    setSubmitting(true);
    agent.activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

  }

  //if (loading) return <LoadingComponent content='Loading App' />
  if (loading) return <LoadingComponent content="Loading App" />

  return (
    <>
      <NavBar formOpen={handleFormOpen} />

      <Container style={{ marginTop: '7em' }}>
        <h2>{acvtivityStore.title}</h2>
        <Button content='Add !' positive onClick={acvtivityStore.setTitle} />
        <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelSelectActivity}
          formClose={handleFormClose}
          formOpen={handleFormOpen}
          editMode={editMode}
          createOrEdit={createOrEditActivity}
          deleteActivity={handleDelteActivity}
          submittingLoader={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
