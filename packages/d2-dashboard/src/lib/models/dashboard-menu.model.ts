export interface DashboardMenuObject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  subMenus?: DashboardMenuObject[];
}

export class DashboardMenu {
  constructor(public dashboard: { [key: string]: string | number | object }) {}

  toObject(): DashboardMenuObject {
    return {
      id: this.dashboard['id'] as string,
      name: this.dashboard['name'] as string,
      subMenus: this.dashboard['subMenus']
        ? (
            this.dashboard['subMenus'] as Array<{
              [key: string]: string | number | object;
            }>
          ).map((subMenu: { [key: string]: string | number | object }) =>
            new DashboardMenu(subMenu).toObject()
          )
        : undefined,
    };
  }
}
