export const toHumanizedMode = (mode) =>
  mode == "osu"
    ? "Osu!"
    : mode == "fruits"
    ? "Catch"
    : mode.charAt(0).toUpperCase() + mode.slice(1);
