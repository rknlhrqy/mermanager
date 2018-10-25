import { observable, action, computed } from 'mobx';

class MermanStore {

  @observable name;
  @observable location;

  constructor(value) {
    this.id = value.id;
    this.name = value.name;
    this.locaation = value.locaation;
  }

  @action createNew({name, location}) {
    this.name = name;
    this.location = location;
  }

  @computed get merman() {
    return {id: this.id, name: this.name, location: this.location}; 
  }

  @computed get name() {
    return this.name; 
  }

  @computed get location() {
    return this.location; 
  }
}

export default MermanStore;
