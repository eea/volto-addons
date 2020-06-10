import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LayoutTemplating } from 'volto-addons/LayoutTemplating';


const getMode = (pathname) => {
  if (!pathname) return ''
  const pathnameArray = pathname.split('/')
  return pathnameArray[pathnameArray.length - 1] + 'form'
}

const TemplatingToolbar = props => {
  const [state, setState] = useState({
    formData: null,
    mode: ''
  });
  useEffect(() => {
    const formData = props.content
    const mode = getMode(props.pathname) 
    setState({
      formData,
      mode
    })
  }, [props.content]);
  if (!props.content) return ''
  return (
    <Form.Field inline required={props.required}>
      <Grid>
        <Grid.Row>
          <Grid.Column width="12" className="align-tools">
            <LayoutTemplating
              mode={state.mode}
              formData={state.formData || {}}
              onSave={({ blocks, blocks_layout }) => {
                setState({
                  formData: { ...state.formData, blocks, blocks_layout}
                })
                props.onSave({ blocks, blocks_layout})
              }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  )
};


/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TemplatingToolbar.propTypes = {
  content: PropTypes.shape({
    '@type': PropTypes.string,
  }),
  pathname: PropTypes.string.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TemplatingToolbar.defaultProps = {
  content: null,
  pathname: null
};

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      content: state.content.data,
      pathname: state.router.location.pathname
    }),
  )
)(TemplatingToolbar);
