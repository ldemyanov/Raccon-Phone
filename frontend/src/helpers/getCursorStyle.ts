import { ToolNames } from '@src/constants/Draw';

interface IStyles {
  [prop: string]: string;
}

export default function getCursorStyle(styles: IStyles, triknesses: number, tool: ToolNames) {
  const style = ['cursor'];

  switch (ToolNames[tool]) {
    case ToolNames.pencil:
      style.push('Pencil');
      break;
    case ToolNames.eraser:
      style.push('Eraser');
      break;
    case ToolNames.rect:
      style.push('Rectangle');
      break;
    case ToolNames.circle:
      style.push('Circle');
      break;
    case ToolNames.line:
      style.push('Line');
      break;
    case ToolNames.pipette:
      style.push('Pipette');
      break;
  }

  if (ToolNames[tool] !== ToolNames.pipette) {
    switch (triknesses) {
      case 4:
        style.push('4');
        break;
      case 8:
        style.push('8');
        break;
      case 12:
        style.push('12');
        break;
      case 16:
        style.push('16');
        break;
      case 20:
        style.push('20');
        break;
    }
  }

  return styles[style.join('')];
}
