import {RegionModel} from "./region-model";

export interface UserModel {
  email: string;
  firstname: string;
  lastname: string;

  admin: boolean;
  doctor: boolean;
  expert: Array<RegionModel>;
}
