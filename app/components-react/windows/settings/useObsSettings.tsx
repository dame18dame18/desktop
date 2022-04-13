import React from 'react';
import { useModule, injectState } from 'slap';
import { mutation } from '../../store';
import { Services } from '../../service-provider';
import { ISettingsSubCategory } from '../../../services/settings';

/**
 * A module for components in the SettingsWindow
 */
class ObsSettingsModule {
  state = injectState({
    page: '',
  });

  init() {
    // init page
    const { WindowsService } = Services;
    if (WindowsService.state.child.queryParams) {
      this.state.page = WindowsService.state.child.queryParams.categoryName || 'General';
    } else {
      this.state.page = 'General';
    }
  }

  // @mutation()
  // setPage(page: string) {
  //   this.state.page = page;
  // }

  private get settingsService() {
    return Services.SettingsService;
  }

  saveSettings(newSettings: ISettingsSubCategory[]) {
    this.settingsService.setSettings(this.state.page, newSettings);
  }

  get settingsFormData() {
    return this.settingsService.state[this.state.page]?.formData ?? [];
  }
}

// wrap the module in a hook
export function useObsSettings() {
  return useModule(ObsSettingsModule);
}

class MyModule {
  foo: 1;
  bar: 2;
}

const { foo, bar, zoom } = useModule(MyModule).extend(m => ({
  zoom: 3,
}));
