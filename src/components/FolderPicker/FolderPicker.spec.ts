import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ipcRenderer } from 'electron';
import FolderPicker from './FolderPicker.vue';

vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn(),
  },
}));

describe('FolderPicker', () => {
  it('renders correctly', () => {
    const wrapper = mount(FolderPicker);
    expect(wrapper.find('.folder-picker').exists()).toBe(true);
  });

  it('calls selectFolder on button click', async () => {
    const wrapper = mount(FolderPicker);
    await wrapper.find('button').trigger('click');

    expect(ipcRenderer.invoke).toHaveBeenCalledWith('select-folder');
  });

  it('updates folder path and emits event when a folder is selected', async () => {
    const selectedFolder = '/path/to/folder';
    (ipcRenderer.invoke as vi.Mock).mockResolvedValue(selectedFolder);

    const wrapper = mount(FolderPicker);
    await wrapper.find('button').trigger('click');

    expect(wrapper.vm).toHaveProperty('folder', selectedFolder);
    expect(wrapper.emitted()['update:folder']).toBeTruthy();
    expect(wrapper.emitted()['update:folder'][0]).toEqual([selectedFolder]);
  });
});
