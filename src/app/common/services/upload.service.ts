import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {environmentConfig} from '@app/config/environment.config';

@Injectable()
export class UploadService {
    private basePath: String;

    constructor(private afStore: AngularFireStorage) {
        this.basePath = environmentConfig.firebaseStorageBuckets.profile;
    }

    getProfilePath(uid: string, name: string): string {
        const file = this.sanitizeFileName(name);
        return `${this.basePath}/${uid}/${file.name}.${file.extension}`;
    }

    uploadFile(filename: string, file: File): AngularFireUploadTask {
        return this.afStore.upload(filename, file);
    }

    private sanitizeFileName(name: string) {
        const nameList = name.split('.');
        const extension = nameList[nameList.length - 1];
        delete nameList[nameList.length - 1];
        name = nameList.join(' ').replace(/[<>=\/._!@#$&-]/g, ' ').replace(/\s+/g, '-').replace(/-$/, '');
        return {name, extension};
    }
}
