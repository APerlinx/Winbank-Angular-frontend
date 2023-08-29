import { InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

export const USER_RESOLVER = new InjectionToken<((route: ActivatedRouteSnapshot) =>  Observable<User | null>)>('UserResolver');

