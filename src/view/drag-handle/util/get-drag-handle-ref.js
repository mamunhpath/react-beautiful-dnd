// @flow
import invariant from 'tiny-invariant';
import { dragHandle } from '../../data-attributes';
import { isSVG, isHTMLElement } from '../../duck-types';

const selector: string = `[${dragHandle}]`;

const throwIfSVG = (el: Object) => {
  invariant(
    !isSVG(el),
    `A drag handle cannot be an SVGElement: it has inconsistent focus support.

    More information: https://github.com/atlassian/react-beautiful-dnd/tree/master/docs/guides/dragging-svgs.md`,
  );
};

// If called when the component is disabled then the data
// attribute will not be present
const getDragHandleRef = (draggableRef: HTMLElement): HTMLElement => {
  if (draggableRef.hasAttribute(dragHandle)) {
    throwIfSVG(draggableRef);
    return draggableRef;
  }

  // find the first nested drag handle
  // querySelector will return the first match on a breadth first search which is what we want
  // Search will fail when the drag handle is disabled
  // https://codepen.io/alexreardon/pen/erOqyZ
  const el: ?HTMLElement = draggableRef.querySelector(selector);

  throwIfSVG(draggableRef);

  invariant(
    el,
    `
      Cannot find drag handle element inside of Draggable.
      Please be sure to apply the {...provided.dragHandleProps} to your Draggable

      More information: https://github.com/atlassian/react-beautiful-dnd#draggable
    `,
  );

  invariant(isHTMLElement(el), 'A drag handle must be a HTMLElement');

  return el;
};

export default getDragHandleRef;
