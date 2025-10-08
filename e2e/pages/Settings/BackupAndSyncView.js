import { BackupAndSyncViewSelectorsIDs } from '../../selectors/Settings/BackupAndSyncView.selectors';
import { Gestures, Matchers } from '../../framework';

class BackupAndSyncView {
  get accountSyncToggle() {
    return Matchers.getElementByID(
      BackupAndSyncViewSelectorsIDs.ACCOUNT_SYNC_TOGGLE,
    );
  }

  get backupAndSyncToggle() {
    return Matchers.getElementByID(
      BackupAndSyncViewSelectorsIDs.BACKUP_AND_SYNC_TOGGLE,
    );
  }

  async toggleBackupAndSync() {
    await Gestures.waitAndTap(this.backupAndSyncToggle);
  }

  async toggleAccountSync() {
    await Gestures.waitAndTap(this.accountSyncToggle);
  }
}

export default new BackupAndSyncView();
