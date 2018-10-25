import { observable, action } from 'mobx';

class MermanStore {
  constructor(value) {
    this.id = value.id;
    this.name = value.name;
    this.locaation = value.locaation;
  }
}

class MermenStore {
  @observable mermen = [];

  @action AddMerman(value) {
    this.mermen.push(new MermanStore(value));
  }
}

const mermenStore = new MermenStore();

export default mermenStore;