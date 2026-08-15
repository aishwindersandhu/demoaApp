import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';

const getScreenshotMock = vi.fn(() => 'data:image/jpeg;base64,ZmFrZS1zY3JlZW5zaG90');

vi.mock('react-webcam', () => ({
  default: React.forwardRef((_props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({ getScreenshot: getScreenshotMock }));
    return <div data-testid="mock-webcam" />;
  }),
}));

import FaceCapture from '../../src/components/faceCapture';

describe('FaceCapture', () => {
  beforeEach(() => {
    getScreenshotMock.mockClear();
  });

  it('starts in idle mode showing the drop zone', () => {
    renderWithProviders(<FaceCapture handleWebImage={vi.fn()} />);
    expect(screen.getByText('Drop your photo here')).toBeInTheDocument();
  });

  it('switches to preview mode and notifies the parent when a file is selected', () => {
    const handleWebImage = vi.fn();
    const { container } = renderWithProviders(<FaceCapture handleWebImage={handleWebImage} />);

    const file = new File(['fake-image-bytes'], 'photo.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(handleWebImage).toHaveBeenCalledWith(file);
    expect(screen.getByAltText('Your photo')).toBeInTheDocument();
  });

  it('ignores non-image files', () => {
    const handleWebImage = vi.fn();
    const { container } = renderWithProviders(<FaceCapture handleWebImage={handleWebImage} />);

    const file = new File(['not an image'], 'notes.txt', { type: 'text/plain' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(handleWebImage).not.toHaveBeenCalled();
    expect(screen.getByText('Drop your photo here')).toBeInTheDocument();
  });

  it('returns to idle mode when "Change photo" is clicked', () => {
    const { container } = renderWithProviders(<FaceCapture handleWebImage={vi.fn()} />);
    const file = new File(['fake-image-bytes'], 'photo.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByText('Change photo'));
    expect(screen.getByText('Drop your photo here')).toBeInTheDocument();
  });

  it('switches to webcam mode when "Capture" is clicked, and takes a photo', async () => {
    const user = userEvent.setup();
    const handleWebImage = vi.fn();
    renderWithProviders(<FaceCapture handleWebImage={handleWebImage} />);

    await user.click(screen.getByText('Capture'));
    expect(screen.getByTestId('mock-webcam')).toBeInTheDocument();

    await user.click(screen.getByText('Take photo'));
    expect(getScreenshotMock).toHaveBeenCalled();
    expect(handleWebImage).toHaveBeenCalled();
    expect(screen.getByAltText('Your photo')).toBeInTheDocument();
  });

  it('drops a file onto the drop zone', () => {
    const handleWebImage = vi.fn();
    const { container } = renderWithProviders(<FaceCapture handleWebImage={handleWebImage} />);
    const file = new File(['fake-image-bytes'], 'photo.png', { type: 'image/png' });
    const dropZone = container.querySelector('input[type="file"]')!.parentElement as HTMLElement;

    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });

    expect(handleWebImage).toHaveBeenCalledWith(file);
  });
});
