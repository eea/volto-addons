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

**How to add TemplatingToolbar as a widget**
To add TemplatingToolbar as a widget to Composite-Pages (Document) you need to go to `fise/dexterity-types/Document/@@fields` and add a new Field with 'Short Name' as `templatingtoolbar` (the id corresponding to TemplatingToolbar widget) and any 'Field Type'.