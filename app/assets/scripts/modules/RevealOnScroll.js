import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(items, offset) {
    this.itemsToReveal = items;
    this.offset = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item');
  }

  createWaypoints() {
    const that = this;
    this.itemsToReveal.each(function() {
      const item = this;
      new Waypoint({
        element: item,
        handler: function() {
          $(item).addClass('reveal-item--is-visible');
        },
        offset: that.offset
      });
    });
  }
}

export default RevealOnScroll;
