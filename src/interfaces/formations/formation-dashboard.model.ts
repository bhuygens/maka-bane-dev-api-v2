import { FormationsCategories } from '../../entities/formations/formations-categories.entity';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';

export interface FormationDashboardModel {
  nearestFormation: FormationsAvailabilities;
  formations: FormationsCategories[];
}
