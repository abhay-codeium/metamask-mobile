import { SRPListSelectorsIDs } from '../../../../selectors/MultiSRP/SRPList.selectors';
import { Matchers } from '../../../../framework';

class SRPListComponent {
  get srpList() {
    return Matchers.getElementByID(SRPListSelectorsIDs.SRP_LIST);
  }
}

export default new SRPListComponent();
