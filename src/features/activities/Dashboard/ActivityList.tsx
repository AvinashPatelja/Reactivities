import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';

export default observer(function ActivityList() {

    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { activities, selectActivity, deleteActivity, loadingButton } = activityStore;

    function handleActivityDelete(event: any, id: string) {
        setTarget(event.target.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button loading={loadingButton && target === activity.id}
                                    name={activity.id}
                                    onClick={(event) => handleActivityDelete(event, activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
                {/* <List>
                    {activities.map(activity => (
                        <List.Item key={activity.id}>
                            {activity.title}
                        </List.Item>
                    ))}
                </List> */}
            </Item.Group>
        </Segment>
    )
})