export class GetUsers {
  static readonly type = "[Users] get users";
}

export class SetPage {
  static readonly type = "[Users] set page";
  constructor(public page: number) {}
}

export class SetSize {
  static readonly type = "[Users] set size";
  constructor(public size: number) {}
}
