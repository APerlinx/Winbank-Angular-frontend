import { Injectable } from '@angular/core'
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
  of,
} from 'rxjs'
import { storageService } from './async-storage.service'
import { HttpErrorResponse } from '@angular/common/http'
import { User } from '../models/user.model'
import { Move } from '../models/move.model'
const ENTITY = 'user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(
    this.loadUserFromStorage()
  )
  user$ = this.userSubject.asObservable()

  demoUser(name: string): User {
    const user: User = {
      name: name,
      balance: 150000,
      moves: sampleMoves,
    }
    this.userSubject.next(user)
    return user
  }

  public getUser(): User | null {
    return this.userSubject.value
  }

  public fetchUser(): Observable<User | null> {
    const user = this.getUser()
    return of(user)
  }

  public signup(name: string) {
    const newUser = this.demoUser(name)
    this.saveUserToStorage(newUser)
  }

  private loadUserFromStorage(): User | null {
    const storedUser = localStorage.getItem(ENTITY)
    return JSON.parse(storedUser || 'null')
  }

  private saveUserToStorage(user: User) {
    localStorage.setItem(ENTITY, JSON.stringify(user))
  }

  addMove(move: Move) {
    const user = this.getUser()
    if (!user) return
    user.moves.unshift(move)
    user.balance -= move.amount
    this.saveUserToStorage(user)
    this.userSubject.next(user)
  }

}

const sampleMoves: Move[] = [
  {
    toId: "5a56640269f443a5d64b32ca",
    to: "Ochoa Hyde",
    at: new Date('2023-05-14T10:12:22'),
    amount: 450,
  },
  {
    toId: "5a5664025f6ae9aa24a99fde",
    to: "Hallie Mclean",
    at: new Date('2023-05-15T15:20:25'),
    amount: 200,
  },
  {
    toId: "5a56640252d6acddd183d319",
    to: "Parsons Norris",
    at: new Date('2023-05-16T12:15:40'),
    amount: 650,
  },
  {
    toId: "5a566402ed1cf349f0b47b4d",
    to: "Rachel Lowe",
    at: new Date('2023-05-18T09:10:15'),
    amount: 300,
  },
  {
    toId: "5a566402abce24c6bfe4699d",
    to: "Dominique Soto",
    at: new Date('2023-05-20T08:20:30'),
    amount: 550,
  }
];
