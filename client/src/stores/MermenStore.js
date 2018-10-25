import MermanStore from './MermanStore';
import { observable, action } from 'mobx';

class MermenStore {
  @observable mermen = [];

  @action AddMerman(value) {
    this.mermen.push(new MermanStore(value));
  }
}

const mermenStore = new MermenStore();

export default mermenStore;