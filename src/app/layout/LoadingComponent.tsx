import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
    content: string;
}

export default function LoadingComponent({content}: Props) {
    return (
        <Dimmer active={true} inverted={true}>
            <Loader content={content} />
        </Dimmer>
    )
}