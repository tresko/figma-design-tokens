interface DSColor {
  name: string;
  value: RGBA;
}

interface PluginMessage {
  type: string;
  payload: DSColor[];
}
