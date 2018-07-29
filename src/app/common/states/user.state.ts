import { State, Action, StateContext, Selector } from 'ngxs';

import {UserInterface} from '@app/common/interfaces/user.interface';
import {AddUser, UpdateUser} from '@app/common/actions/user.action';

@State<UserInterface>({
    name: 'user',
    defaults: {
        first_name: '',
        last_name: ''
    }
})
export class UserState {
    @Selector()
    static getUser(state: UserInterface) {
        return state;
    }

    @Action(AddUser)
    addUser({ setState }: StateContext<UserInterface>, { payload }: AddUser) {
        setState(payload);
    }

    @Action(UpdateUser)
    updateUser({ patchState }: StateContext<UserInterface>, { payload }: UpdateUser) {
        patchState(payload);
    }
}
