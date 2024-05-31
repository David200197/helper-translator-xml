export class Paginator {
  constructor({ page, perPage }) {
    Object.assign(this, { page, perPage });
  }

  get skip() {
    return (this.page - 1) * this.perPage;
  }

  get offset() {
    return (this.page - 1) * this.perPage
  }

  get limit() {
    return this.perPage;
  }

  getTotalPage(totalElement) {
    if (!this.perPage) return 1;
    return Math.ceil(totalElement / this.perPage);
  }
}
