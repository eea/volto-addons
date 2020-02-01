Object widget: schema is a list of fields, like:

```[
    name: {
      title: 'Name'
      type: 'string',
      required: true
    },
    from: {
      title: 'From',
      type: 'string',
      required: true
    },
    subject: {
      title: 'Subject',
      type: 'string',
      required: true
    },
    message: {
      title: 'Message'
      type: 'string',
      widget: 'textarea',
      required: true
    },
]
```

This is needed to support BlockForm, an edit form for a whole block.
