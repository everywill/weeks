import framework from './framework';
import { init, config } from '../sdk/js-framework/index';

config.framework = framework;
init(config);

export default framework;
