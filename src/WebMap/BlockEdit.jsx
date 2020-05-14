import React, { Component } from 'react';
import WebMap from './WebMap';
import { SidebarPortal } from '@plone/volto/components'; // EditBlock
import { BlockEditForm } from 'volto-addons/BlockForm';

import schema from './schema'

const WebMapBlockEdit = props => {

    const hasMapId = props.data.mapId

    return (
        <div>
            {hasMapId &&
                <WebMap mapId={props.data.mapId} legend={props.data.legend} />
            }
            {!hasMapId &&
                <p style={{textAlign: "center", color:'red', fontSize: '20px'}}> Select Map ID from sidebar! </p>
            }
            <SidebarPortal selected={props.selected}>
                <BlockEditForm
                    schema={schema}
                    title={schema.title}
                    onChangeField={(id, value) => {
                        props.onChangeBlock(props.block, {
                            ...props.data,
                            [id]: value,
                        });
                    }}
                    formData={props.data}
                    block={props.block}
                />
            </SidebarPortal>
        </div>
    );
}

export default WebMapBlockEdit;