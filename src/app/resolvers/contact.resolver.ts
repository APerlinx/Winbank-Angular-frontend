import { inject } from '@angular/core'
import { ResolveFn, Router } from '@angular/router'
import { ContactService } from '../services/contact.service'
import { Contact } from '../models/contact.model'
import { delay } from 'rxjs'
import { LoaderService } from '../services/loader.service'
import { LoaderContactService } from '../services/loaderContact.service'

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  // inject(LoaderService).setIsLoading(true)
  inject(LoaderContactService).setIsLoading(true)

  const id = route.params['id']

  return inject(ContactService).getContactById(id).pipe(delay(500))
}
