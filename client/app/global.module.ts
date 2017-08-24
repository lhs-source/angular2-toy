import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserService } from './user/user.service';
import { AuthService } from './user/auth.service';
import { AuthGuardLogin } from './user/auth-guard-login.service';
import { AuthGuardAdmin } from './user/auth-guard-admin.service';

import { ChatService } from './chat/chat.service';

import { SafeHtmlPipe } from './wysiwyg/ww-safehtml.pipe';

@NgModule({
    declarations: [
        SafeHtmlPipe,
    ],
    imports: [
    ],
    exports : [
        SafeHtmlPipe,
    ],
    providers: [
        AuthService,
        AuthGuardLogin,
        AuthGuardAdmin,
        UserService,
        ChatService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GlobalModule {

}

