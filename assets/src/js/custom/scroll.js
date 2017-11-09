/* eslint-env jquery */

const startScroll = {
  // FUNCTIONS

  functions: {
    // SMOOTHSCROLL
    smoothScroll(e) {
      const locationPath =
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname;
      let target = $(this.hash);

      const scrollAnimation = function () {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          600,
          () => {
            const $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            }
            $target.attr("tabindex", "-1");
            $target.focus();
          },
        );
      };

      if (locationPath) {
        target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);

        if (target.length) {
          e.preventDefault();
          scrollAnimation();
        }
      }
    },
  },

  // EVENTS
  events: {
    init: () => {
      $(() => {
        const allowedLiks = $("a[href*=\"#\"]")
          .not("[href=\"#\"]")
          .not("[href=\"#0\"]");
        allowedLiks.on("click", startScroll.functions.smoothScroll);
      });
    },
  },
};

// INIT OBJECTS

startScroll.events.init();
