const hexToRGB = (hex: string) => {
  const hexa = hex.replace('#', '');

  const r = parseInt(hexa.slice(0, 2) || 'ff', 16);
  const g = parseInt(hexa.slice(2, 4) || 'ff', 16);
  const b = parseInt(hexa.slice(4, 6) || 'ff', 16);

  return [r, g, b];
};

export const getClosestColor = (targetColor: string, colorArray: string[]) => {
  const [r1, g1, b1] = hexToRGB(targetColor);

  const [_, closestColor] = colorArray.reduce((previousDistanceColorTuple, color) => {
    const [previousClosestDistance] = previousDistanceColorTuple;
    const [r2, g2, b2] = hexToRGB(color);

    const distance = Math.sqrt(
      ((r1 - r2) ** 2)
      + ((g1 - g2) ** 2)
      + ((b1 - b2) ** 2),
    );

    if (distance < previousClosestDistance) {
      return [distance, color];
    }

    return previousDistanceColorTuple;
  }, [Infinity, '#ffffff']);

  return closestColor;
};

