export function fadeIn(props) {
  return ({ ...props, opacity: 1, from: { opacity: 0 } });
}