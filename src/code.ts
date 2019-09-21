import { ActionType } from "./core/actions";
import { addColors } from "./core/colors";

figma.showUI(__html__);

figma.ui.onmessage = msg => {
  const { type, payload } = msg;
  if (type === ActionType.ADD_COLORS) {
    addColors(payload);
  }

  figma.closePlugin();
};
