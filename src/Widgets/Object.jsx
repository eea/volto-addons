import React from 'react';

const Object = props => (
  <div>
    {...map(item.fields, (field, index) => (
      <Field
        {...schema.properties[field]}
        id={field}
        fieldSet={item.title.toLowerCase()}
        focus={index === 0}
        value={this.state.formData[field]}
        required={schema.required.indexOf(field) !== -1}
        onChange={this.onChangeField}
        key={field}
        error={this.state.errors[field]}
      />
    ))}
  </div>
);

export default Object;
