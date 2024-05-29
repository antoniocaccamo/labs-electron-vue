import {AppConfiguration} from './configuration-app';
import {OAuthConfiguration} from './configuration-oauth';

/*
 * A holder for configuration settings
 */
export interface Configuration {
    app: AppConfiguration;
    oauth: OAuthConfiguration;
}