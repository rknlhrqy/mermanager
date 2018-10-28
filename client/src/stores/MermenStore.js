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

/*
  This does not work!!!
  @action EditMerman(id, location) {
    const index = this.mermen.findIndex(each => each.id === id);
    if (index !== -1) {
      this.mermen[index].location = location;
    }
  }
*/

  @action EditMerman(id, name, location) {
    this.RemoveMerman(id);
    this.AddMerman({_id: id, name, location});
  }

  @computed get mermenResult() {
    return this.mermen;
  }

  @computed get sortedMermenResult() {
    return this.mermen.slice().sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }

}

const mermenStore = new MermenStore();

export default mermenStore;