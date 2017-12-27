X.X.X
=====

Breaking changes:

- addChild() method renamed to add()
- removeChild() method renamed to remove()
- motor-scene element renamed to i-scene by default
- motor-node element renamed to i-node by default
- Size values can no longer be negative. An error is thrown when a negative
  size values is given.
- Browser support changed to Edge 13 and up, using native ES class syntax.
- The API is no longer compatible with Custom Elements v0. Use Custom Elements
  v1 now. (Infamous provides a v1 polyfill, read the `Migrating` section below.
- node.actualSize renamed to node.calculatedSize
- "absolute" size mode renamed to "literal" size mode.
- `absoluteSize` and `proportionalSize` properties/attributes replaced with a
  single `size` property/attribute. Specify sizeMode as before, then specify
  the numerical value for each axis depending on the sizeMode. For example, if
  we set `sizeMode = ['literal', 'proportional', 'literal']`, then we can set
  `size = [20, 0.2, 30]` where the X and Z values are literally the desired
  size, and the X axis size is 20% (0.2) of the parent node's size.
- TODO: "literal" and "proportional" size modes now have "l" and "p"
  shorthands. f.e. `sizeMode = ['l', 'p', 'l']`

API additions:

- By default, the element classes have no defined name. You can tell infamous
  to define the default element names:
  ```js
  import { useDefaultNames } from 'infamous/html'

  // defines <i-scene> and <i-node> elements:
  useDefaultNames()
  ```
- Element names can be customized. For example:
  ```js
  import { HTMLNode, HTMLScene, useDefaultNames } from 'infamous/html'

  // use the old names if you still want to:
  HTMLScene.define('motor-scene')
  HTMLNode.define('motor-node')
  document.body.innerHTML = `
    <motor-scene ...>
      <motor-node ...>
      </motor-node>
    </motor-scene>
  `

  // or give them any names you want:
  HTMLScene.define('three-dee-scene')
  HTMLNode.define('object-3d')
  document.body.innerHTML = `
    <three-dee-scene ...>
      <object-3d ...>
      </object-3d>
    </three-dee-scene>
  `

  // where
  HTMLScene.define('three-dee-scene')
  // is roughly equivalent to
  customElements.define('three-dee-scene', HTMLScene)

  // you can also use a default name by calling define() without an arg. The following
  // defines i-scene and i-node elements:
  HTMLScene.define()
  HTMLNode.define()

  // useDefaultNames() is a shortcut for defining all the default element names
  // at once:
  useDefaultNames()
  ```
