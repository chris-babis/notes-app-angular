export class User {
    _id: string;
    name: string;
    token: string;
  
    constructor (_id: string, name: string, token: string){
      this._id = _id;
      this.name = name;
      this.token = token;
    }
  
  }
  