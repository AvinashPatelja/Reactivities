import React, { useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submittingLoader: boolean;
}

export default function ActivityList({ activities, selectActivity, deleteActivity, submittingLoader }: Props) {

    const [target, setTarget] = useState('');

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
                                <Button loading={submittingLoader && target===activity.id} 
                                //onClick={() => deleteActivity(activity.id)} 
                                name={activity.id}
                                onClick={(event)=>handleActivityDelete(event,activity.id)}
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
}