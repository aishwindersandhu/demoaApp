import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import { makeUtilsState } from '../fixtures';

vi.mock('react-webcam', () => ({
  default: React.forwardRef((_props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({ getScreenshot: vi.fn(() => 'data:image/jpeg;base64,ZmFrZQ==') }));
    return <div data-testid="mock-webcam" />;
  }),
}));

const navigateSpy = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => navigateSpy };
});

const uploadTriggerMock = vi.fn(() => Promise.resolve({ data: { ok: true } }));
vi.mock('../../src/api/imageAPI', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/api/imageAPI')>();
  return {
    ...actual,
    useUploadImageMutation: () => [uploadTriggerMock, { isLoading: false }],
  };
});

import { UploadImage } from '../../src/components/uploadImage';

describe('UploadImage', () => {
  beforeEach(() => {
    navigateSpy.mockClear();
    uploadTriggerMock.mockClear();
  });

  it('disables the analyse button until a photo has been selected', () => {
    renderWithProviders(<UploadImage />);
    expect(screen.getByRole('button', { name: /Analyse my palette/i })).toBeDisabled();
  });

  it('enables the button once a photo is selected, uploads it, and navigates to results', async () => {
    const { container } = renderWithProviders(<UploadImage />);
    const file = new File(['fake-image-bytes'], 'photo.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    const analyseBtn = screen.getByRole('button', { name: /Analyse my palette/i });
    expect(analyseBtn).toBeEnabled();

    const user = userEvent.setup();
    await user.click(analyseBtn);

    expect(uploadTriggerMock).toHaveBeenCalledWith(file);
    expect(navigateSpy).toHaveBeenCalledWith('/results');
  });

  it('shows "Analysing…" and disables the button while the upload is in flight', () => {
    renderWithProviders(<UploadImage />, {
      preloadedState: { utilsReducer: makeUtilsState({ isLoading: true }) },
    });
    expect(screen.getByRole('button', { name: /Analysing/i })).toBeDisabled();
  });
});
