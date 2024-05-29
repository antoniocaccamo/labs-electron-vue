import {safeStorage} from 'electron';
import Store from 'electron-store'; 

import log from 'electron-log/main';




export class TokenStorageService {

    private readonly _key = 'EncryptedData';
    private _store = new Store<Record<string,string>>({name: 'tokens'});

    /*
     * Safe storage uses an operating system service but make sure we are not saving tokens insecurely
     */
    public constructor() {
        if (!safeStorage.isEncryptionAvailable()) {
            throw new Error('The environment does not support safe storage');
        }
    }

    /**
     * 
     * @returns 
     */
    public load() : TokenData | null {
        let tokeData : TokenData|null = null;
        try {
            // Try to read the file
            const encryptedBytesBase64 = this._store.get(this._key);
            if (!encryptedBytesBase64) {
                return null;
            }
            // Try the decryption using the operating system encryption key
            const json = safeStorage.decryptString(Buffer.from(encryptedBytesBase64, 'base64'));
            tokeData = JSON.parse(json);
        } catch (e: any) {
            log.error("error occurred", e);
        }
        return tokeData;
    }

    public save(tokeData:TokenData) : void{
        const json = JSON.stringify(tokeData);
        const buffer = safeStorage.encryptString(json);
        const encryptedBytesBase64 = buffer.toString('base64');
        this._store.set (this._key, encryptedBytesBase64);
    }

}