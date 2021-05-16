import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/Dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';

function App() {

  //const [activities, setActivities] = useState<Activity[]>([]);
  const {activityStore}= useStore();

  useEffect(() => {
    activityStore.loadingActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading App" />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
