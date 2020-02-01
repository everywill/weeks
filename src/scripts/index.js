import framework from './framework';
import { init, config } from '../sdk/js-runtime/index';

config.framework = framework;
init(config);

export default framework;
