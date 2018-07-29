import { UserInterface } from '@app/common/interfaces/user.interface';

export class AddUser {
    static readonly type = '[User] add';
    constructor(public payload: UserInterface) {}
}

export class UpdateUser {
    static readonly type = '[User] Update';
    constructor(public payload: UserInterface) {}
}
