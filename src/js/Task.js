export default class Task {
  constructor(description, index, complete = false) {
    this.id = `id-${Math.round(Math.random() * 1000000)}`;
    this.description = description;
    this.complete = complete;
    this.index = index;
  }
}
