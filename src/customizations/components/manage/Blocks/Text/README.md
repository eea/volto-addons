Draft editor is customized to:

- present an out-of-the-way toolbar (at the top of the editor screen).
- solve a bug (maybe present just in this customization) related to decorators
- pass a key property and redux connect it, to allow forcing refresh of editor.
  This is because of a bug in draftjs editor, it doesn't refresh component
  entities when their data changes
