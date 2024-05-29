
import { readFileSync} from 'node:fs'
import { app } from 'electron';
import {TokenStorageService } from "./token.storage";
import { TokenData } from '../dto/token-data';

export default class AuthenticatorService {

    private readonly _configFilePath =  `${app.getAppPath()}/desktop.config.json`
    private _tokenStorageService: TokenStorageService ;

    public constructor() {
        this._tokenStorageService = new TokenStorageService;
        const configurationBuffer = readFileSync(this._configFilePath);
    }


    
}