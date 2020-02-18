import xEngine from '../../sdk/x-engine';
import xInstance from '../../sdk/x-instance';
import { View, Text, Image, ScrollView } from './components/index';

xEngine.registerDefaultComponents = function () {
  xEngine.registerComponent('view', View);
  xEngine.registerComponent('text', Text);
  xEngine.registerComponent('image', Image);
  xEngine.registerComponent('scrollview', ScrollView);
}

export {
  xEngine,
  xInstance,
};
