import { init as initTaskHandler } from './task-center';

export default function init (config) {
  initTaskHandler();

  const framework = config.framework || {};

  framework.init(config);
}
