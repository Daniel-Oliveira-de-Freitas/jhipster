export interface IContato {
  id?: number;
  name?: string | null;
  fone?: string | null;
  email?: string | null;
}

export class Contato implements IContato {
  constructor(public id?: number, public name?: string | null, public fone?: string | null, public email?: string | null) {}
}
