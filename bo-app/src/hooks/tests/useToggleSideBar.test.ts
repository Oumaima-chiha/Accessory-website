import { act, renderHook } from '@testing-library/react';
import useToggleSideBar from '../useToggleSideBar';
import { expect, describe, it } from 'vitest';

describe('useToggleSideBar', () => {
  it('should toggle sidebar', () => {
    const { result } = renderHook(() => useToggleSideBar());

    // open sidebar
    act(() => {
      result.current.toggleSideBar();
    });
    expect(result.current.sideToggled).toBe(true);

    act(() => {
      result.current.openSideBar();
    });
    expect(result.current.sideToggled).toBe(true);

    // close sidebar
    act(() => {
      result.current.toggleSideBar();
    });
    expect(result.current.sideToggled).toBe(false);

    act(() => {
      result.current.closeSidebar();
    });
    expect(result.current.sideToggled).toBe(false);
  });
});
