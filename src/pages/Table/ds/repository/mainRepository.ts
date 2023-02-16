import type { AxiosApi } from "@/apps/main/infrasturcture/api/axios";
import type { PageData, Tab, Project } from "../../bl/entities";
import type { TableStore } from "../store/store";

interface MainQueryData {
  readonly page: PageData;
  readonly tabs: ReadonlyArray<Tab>;
  readonly projects: ReadonlyArray<Project>;
}

class MainRepository {
  constructor(private api: AxiosApi, private store: TableStore) {}

  init = async (): Promise<void> => {
    try {
      // . reset error status
      this.store.setIsError(false);

      // . check if it's in local storage
      // ...

      // . get from api
      const response = await this.api.get();

      if (response.status !== 200) {
        this.store.setIsError(true);
        console.error("Error while fetching data from server");
        return;
      }

      const data: MainQueryData = response.data[0];

      // . put into store
      this.store.init(data);

      // . save in local storage
      // ...
    } catch (e) {
      this.store.setIsError(true);
      console.error("Error while fetching data from server");
    }
  };
}

export default MainRepository;
