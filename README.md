# render-x

A weex-like framework, featuring 'write once, run everywhere', but mainly aimming at canvas-render(node and web).

### DSL

Both React and Vue are supported. In the project's example， mReact and mVue are used.

### Usage

1. Init xEngine with js-framework bundle
   
   ```javascript
   import { xEngine } from 'xRender';
   
   xEngine.initSDKEnvironment(/* js-framework path */);
   ```

2. Create a xRender instance and provide render context
   
   ```javascript
   import { xInstance } from 'xRender';
   import Konva from 'konva';
   
   const ins = new xInstance();
   ins.frame = new Konva.Stage({
       width: 100,
       height: 100,
   });
   ins.rootView = new Konva.Layer({
       id: 'root',
   });
   ins.frame.add(ins.rootView);
   ```

3. load the user application js-bundle
   
   ```javascript
   ins.renderWithBundleString(/* js-bundle code string */);
   ```
   
   

### Implementation Detail

The only important thing is context. User application js-bundle is loaded to the executing runtime with a specific context provided by render-x framework. Vdom related instructions are injected to runtime context to enable communication bwtween user application and render engine, which is well-known as 'bridge'.
