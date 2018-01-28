(function ($) {
    $.extend({
        remResizing: function (options) {
            options = $.extend({
                fontSize: 16,
                baseline: 320,
                threshold: 0,
                basedonnarrow: false,
                basedonwide: false,
                dropoff: false,
                aligncenter: false,
                inward: false
            }, options);
            var htmlEl = $('html'),
                bodyEl = $('body'),
                frontline = $(window).width(),
                windowHeight = $(window).height();
            var sizeConstraint = function () {
                if (options.basedonnarrow) {
                    orientationSensor({
                        portrait: function () {
                            frontline = $(window).width(),
                                windowHeight = $(window).height();
                        },
                        landscape: function () {
                            frontline = $(window).height(),
                                windowHeight = $(window).width();
                        }
                    });
                } else {
                    frontline = $(window).width(),
                        windowHeight = $(window).height();
                }
                var factor = 0;
                if (options.baseline === 0) {
                    //alert('当最小宽度等于0时')
                    factor = 1;
                } else if (frontline <= options.baseline) {
                    //alert('当最小宽度不等于0且屏幕宽度小于等于最小宽度时')
                    if (options.inward) {
                        factor = frontline / options.threshold;
                    } else {
                        factor = frontline / options.baseline;
                    }
                } else if (frontline > options.baseline && frontline <= options.threshold || options.threshold === 0) {
                    //alert('当屏幕宽度大于最小宽度且小于等于最大宽度，或没有最大宽度时')
                    if (options.threshold >= 0) {
                        if (options.inward) {
                            factor = frontline / options.threshold;
                        } else {
                            factor = frontline / options.baseline;
                        }
                    }
                } else if (frontline > options.threshold) {
                    //alert('当屏幕宽度大于最大宽度时')
                    factor = frontline / options.threshold;

                    if (options.aligncenter) {
                        bodyEl.css({
                            margin: '0 auto',
                            width: options.threshold
                        });
                    } else {
                        bodyEl.css('margin', 0);
                    }
                    // if (options.dropoff) {
                    //  alert('dsadas')
                    //  htmlEl.css('font-size', 'none');
                    //  return;
                    // };
                }
                htmlEl.css('font-size', options.fontSize * factor);
                if (options.dropoff && frontline > options.threshold) {
                    // alert('dsadas')
                    htmlEl.css('font-size', '')
                }
            };
            if (options.baseline <= 0) {
                options.baseline = 1;
            }
            sizeConstraint();
            $(window).on('resize', function () {
                sizeConstraint();
            });

            //屏幕方向探测器
            function orientationSensor(callback) {
                var windowWidth = $(window).width(),
                    windowHeight = $(window).height(),
                    orientation = '';
                checkoritation();
                $(window).resize(function () {
                    checkoritation();
                });

                function checkoritation() {
                    if (typeof(callback) !== 'undefined') {
                        if (windowWidth < windowHeight) {
                            return callback.portrait();
                        } else {
                            return callback.landscape();
                        }
                    } else {
                        callback = {
                            portrait: function () {
                            },
                            landscape: function () {
                            }
                        }
                    }
                }

                //console.log((frontline < windowHeight) ? orientation = 'portrait' : orientation = 'landscape')
                return (windowWidth < windowHeight) ? orientation = 'portrait' : orientation = 'landscape';
            }
        }
    })
})(jQuery)