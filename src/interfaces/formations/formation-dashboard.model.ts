import { FormationsCategories } from '../../entities/formations/formations-categories.entity';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';
import { Formations } from '../../entities/formations/formations.entity';

export interface FormationDashboardModel {
  nearestFormation: FormationsAvailabilities;
  formations: FormationsCategories[];
  nearestFormationContent: Formations;
}
