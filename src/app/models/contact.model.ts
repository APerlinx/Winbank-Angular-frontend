export class Contact {

    constructor(
        public name: string = '',
        public email: string = '',
        public phone: string = '',
        public _id?: string,
    ) {

    }

    setId?(id: string = 'r101') {
        this._id = id
    }
}

export interface FilterBy {
    term: string
    
}