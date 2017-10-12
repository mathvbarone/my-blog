$(() => {

    //SMOOTHSCROLL 
    const allowedLiks = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');

    allowedLiks.on("click", function (e) {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            let target = $(this.hash);
            target = target.length
                ? target
                : $(`[name=${this.hash.slice(1)}]`);
            if (target.length) {
                e.preventDefault();

                $("html, body").animate(
                    {
                        scrollTop: target.offset().top
                    },
                    600,
                    () => {
                        let $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr("tabindex", "-1");
                            $target.focus();
                        }
                    }
                );
            }
        }
    });
});






