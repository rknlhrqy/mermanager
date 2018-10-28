import { observable, action, computed } from 'mobx';

class MermanStore {
  constructor(value) {
    this.id = value._id;
    this.name = value.name;
    this.location = value.location;
  }
}

class MermenStore {
  @observable mermen = [];

  @action FillMermen(value) {
    if (!Array.isArray(value)) {
      console.log('Value is not array!');
      return null;
    }
    value.map(each => {
      return this.mermen.push(new MermanStore(each));
    });
  }

  @action AddMerman(value) {
    this.mermen.push(new MermanStore(value));
  }

  @action RemoveMerman(id) {
    this.mermen = this.mermen.filter(each => each.id !== id);
  }

  @action EditMerman(id, location) {
    const [ merman ] = this.mermen.filter(each => each.id === id);
    merman.location = location;
    const index = this.mermen.indexOf(merman);
    if (index !== -1) {
      this.mermen[index] = merman;
    }
  }



  @computed get mermenResult() {
    return this.mermen;
  }
}

const mermenStore = new MermenStore();

export default mermenStore;