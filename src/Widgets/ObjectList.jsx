import { Button, Form, Grid } from 'semantic-ui-react';
import React, { Fragment } from 'react';
import ObjectWidget from './Object';
import deleteSVG from '@plone/volto/icons/delete.svg';
import { Icon as VoltoIcon } from '@plone/volto/components';

const ObjectListWidget = ({ id, value = [], schema, onChange }) => {
  // TODO: notice that the Fragment key={} might cause problems, need to test
  const empty = {};
  return (
    <>
      {!value && <ObjectWidget schema={schema} />}
      {value.map((obj, index) => (
        <Fragment key={index}>
          <Form.Field inline>
            <Grid>
              <Grid.Row>
                <Grid.Column columns={1}>
                  <Button.Group>
                    <Button
                      basic
                      circular
                      size="mini"
                      onClick={() =>
                        onChange(id, value.filter((v, i) => i !== index))
                      }
                    >
                      <VoltoIcon size="20px" name={deleteSVG} />
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Field>
          <ObjectWidget
            key={index}
            schema={schema}
            value={obj}
            onChange={(fi, fv) =>
              onChange(
                id,
                value.map((v, i) => (i !== index ? v : { ...v, [fi]: fv })),
              )
            }
          />
          <hr />
        </Fragment>
      ))}
      <Form.Field inline>
        <Grid>
          <Grid.Row stretched>
            <Grid.Column stretched columns={12}>
              <div className="wrapper">
                <Button
                  primary
                  onClick={() => {
                    onChange(id, [...value, empty]);
                  }}
                >
                  Add {schema.title}
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    </>
  );
};

export default ObjectListWidget;
