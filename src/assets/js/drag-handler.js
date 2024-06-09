export default function({ element, start, move, end }) {
  element.onpointerdown = e => {
    start();
    element.setPointerCapture(e.pointerId);
    element.onpointermove = e => move(e);
    element.onpointerup = () => {
      element.onpointermove = null;
      element.onpointerup = null;
      end();
    };
  };
}