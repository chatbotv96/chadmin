$(function () {

    //We compare Two sender based on number of mail sent and there deliverty or open and browser based
    $(document).ready(function () {
        progressCounter('#hours-available-progress1', 38, 2, "#F06292", 0.68, "icon-trophy3 text-pink-400", 'Hours available', '64% average')
        DateRangebind();
        Dropdownbind();
        progressCounter('#hours-available-progress', 38, 2, "#F06292", 0.68, "icon-trophy3  text-pink-400", 'Hours available', '64% average');
        progressCounter('#hours-available-progress3', 38, 2, "#F06292", 0.68, "icon-watch text-pink-400", 'Hours available', '64% average');
        progressCounter('#hours-available-progress4', 38, 2, "#F06292", 0.68, "icon-watch text-pink-400", 'Hours available', '64% average');

    });
    function Dropdownbind() {
        $('.select-border-color').select2({
            dropdownCssClass: 'border-primary',
            containerCssClass: 'border-primary text-primary-700'
        });
    }
    function progressCounter(element, radius, border, color, end, iconClass, textTitle, textAverage) {


        // Basic setup
        // ------------------------------

        // Main variables
        var d3Container = d3.select(element),
            startPercent = 0,
            iconSize = 32,
            endPercent = end,
            twoPi = Math.PI * 2,
            formatPercent = d3.format('.0%'),
            boxSize = radius * 2;

        // Values count
        var count = Math.abs((endPercent - startPercent) / 0.01);

        // Values step
        var step = endPercent < startPercent ? -0.01 : 0.01;



        // Create chart
        // ------------------------------

        // Add SVG element
        var container = d3Container.append('svg');

        // Add SVG group
        var svg = container
            .attr('width', boxSize)
            .attr('height', boxSize)
            .append('g')
                .attr('transform', 'translate(' + (boxSize / 2) + ',' + (boxSize / 2) + ')');



        // Construct chart layout
        // ------------------------------

        // Arc
        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - border);



        //
        // Append chart elements
        //

        // Paths
        // ------------------------------

        // Background path
        svg.append('path')
            .attr('class', 'd3-progress-background')
            .attr('d', arc.endAngle(twoPi))
            .style('fill', '#eee');

        // Foreground path
        var foreground = svg.append('path')
            .attr('class', 'd3-progress-foreground')
            .attr('filter', 'url(#blur)')
            .style('fill', color)
            .style('stroke', color);

        // Front path
        var front = svg.append('path')
            .attr('class', 'd3-progress-front')
            .style('fill', color)
            .style('fill-opacity', 1);



        // Text
        // ------------------------------

        // Percentage text value
        var numberText = d3.select(element)
            .append('h2')
                .attr('class', 'mt-15 mb-5')

        // Icon
        d3.select(element)
            .append("i")
                .attr("class", iconClass + " counter-icon")
                .attr('style', 'top: ' + ((boxSize - iconSize) / 2) + 'px');

        // Title
        d3.select(element)
            .append('div')
                .text(textTitle);

        // Subtitle
        d3.select(element)
            .append('div')
                .attr('class', 'text-size-small text-muted')
                .text(textAverage);



        // Animation
        // ------------------------------

        // Animate path
        function updateProgress(progress) {
            foreground.attr('d', arc.endAngle(twoPi * progress));
            front.attr('d', arc.endAngle(twoPi * progress));
            numberText.text(formatPercent(progress));
        }

        // Animate text
        var progress = startPercent;
        (function loops() {
            updateProgress(progress);
            if (count > 0) {
                count--;
                progress += step;
                setTimeout(loops, 10);
            }
        })();
    }
    function DateRangebind() {
        var start = moment().subtract(0, 'days');
        var end = moment();
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);
        $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
            
            var date1 = Date.parse(mystart);
            var date2 = Date.parse(myend);
            var timeDiff = Math.abs(date2 - date1);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
            
            $('a[href="#colored-tab4"]').click();
            if (diffDays == 1) {

            }
            else if (diffDays > 1 && diffDays < 8) {
                alert("Week Selected");
            } else if (diffDays > 7 && diffDays < 32) {
                alert("Month Selected");
            }
        });
    }
    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }
    var mystart, myend;
    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        stardate = start.format('DD/MM/YYYY');
        enddate = end.format('DD/MM/YYYY');
        mystart = start.format('MMMM D, YYYY');
        myend = end.format('MMMM D, YYYY');
    }

});