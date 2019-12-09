Note: these are not Plone viewlets. It's just a mechanism to introduce
arbitrary fragments in pages without requiring customization of all individual
pages.

They are intended to be registered per route. So each viewlet registration is
similar to a path registration. Addons are supposed to export add these
registrations to the config.viewlets array that is passed when configuring
them.

To render the viewlets, customize the App.jsx and somewhere:

```
import ViewletsRender from "volto-addons/Viewlets/Render";
...
render() {
...
<ViewletsRender {...this.props}
...
}
