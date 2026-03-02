export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getPathBoundingBox(d: string): BoundingBox {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  let currentX = 0;
  let currentY = 0;

  const regex = /([a-zA-Z])|([-+]?[0-9]*\.?[0-9]+)/g;
  const tokens = d.match(regex);

  if (!tokens) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let i = 0;
  let currentCommand = "";

  while (i < tokens.length) {
    const token = tokens[i];

    if (/[a-zA-Z]/.test(token)) {
      currentCommand = token;
      i++;
    }

    switch (currentCommand) {
      case "M":
        if (i + 1 < tokens.length) {
          currentX = parseFloat(tokens[i++]);
          currentY = parseFloat(tokens[i++]);
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
          currentCommand = "L";
        }
        break;
      case "m":
        if (i + 1 < tokens.length) {
          currentX += parseFloat(tokens[i++]);
          currentY += parseFloat(tokens[i++]);
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
          currentCommand = "l";
        }
        break;
      case "L":
        if (i + 1 < tokens.length) {
          currentX = parseFloat(tokens[i++]);
          currentY = parseFloat(tokens[i++]);
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
        }
        break;
      case "l":
        if (i + 1 < tokens.length) {
          currentX += parseFloat(tokens[i++]);
          currentY += parseFloat(tokens[i++]);
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
        }
        break;
      case "H":
        if (i < tokens.length) {
          currentX = parseFloat(tokens[i++]);
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
        }
        break;
      case "h":
        if (i < tokens.length) {
          currentX += parseFloat(tokens[i++]);
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
        }
        break;
      case "V":
        if (i < tokens.length) {
          currentY = parseFloat(tokens[i++]);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
        }
        break;
      case "v":
        if (i < tokens.length) {
          currentY += parseFloat(tokens[i++]);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
        }
        break;
      case "z":
      case "Z":
        break;
      default:
        i++;
        break;
    }
  }

  if (minX === Infinity) return { x: 0, y: 0, width: 0, height: 0 };

  const padding = 10;
  return {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  };
}
