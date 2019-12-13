Volto doesn't have a system to render portlets, but we want to be able to
render them.

You can use ``renderPortletManager('plone.rightcolumn', {...this.props})`` in
the proper view template to render them. See plone.restapi for more details.
(for the moment the PR).
