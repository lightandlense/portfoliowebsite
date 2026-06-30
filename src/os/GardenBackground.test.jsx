import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GardenBackground } from './GardenBackground';

const allFalse = {
  sun: false, rainbow: false, butterfly: false, bird: false,
  'flower-a': false, 'flower-b': false, 'flower-c': false,
  beehive: false, 'watering-can': false, spiderweb: false,
};

describe('GardenBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<GardenBackground completedZones={allFalse} />);
    expect(container.querySelector('.garden-bg')).not.toBeNull();
  });

  it('renders 10 zone wrappers', () => {
    const { container } = render(<GardenBackground completedZones={allFalse} />);
    expect(container.querySelectorAll('.garden-zone').length).toBe(10);
  });
});
