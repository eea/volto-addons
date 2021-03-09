/*
 * Align block exposed as a widget
 *
 */

import React from 'react';

import { Form, Grid } from 'semantic-ui-react';

import AlignBlock from '@plone/volto/components/manage/Sidebar/AlignBlock';

const AlignBlockWidget = ({ id, title, required, value, onChange }) => (
  <Form.Field inline required={required}>
    <Grid>
      <Grid.Row>
        <Grid.Column width="4">
          <div className="wrapper">
            <label htmlFor="field-align">{title}</label>
          </div>
        </Grid.Column>
        <Grid.Column width="8" className="align-tools">
          <AlignBlock
            align={value}
            onChangeBlock={(block, { align }) => onChange(id, align)}
            data={{ align: value }}
            block={id}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Form.Field>
);

export default AlignBlockWidget;
