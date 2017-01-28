import { Route} from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { ChatboardComponent } from "../chatboard/chatboard.component";
import { AuthGuard } from "../authentication/auth-guard";

export const AppRoutes: Route[] = [
    {
        path: "chat",
        component: ChatboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "home",
        component: LoginComponent
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
    }
];