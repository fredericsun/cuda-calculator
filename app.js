$('form').on('submit', function(e){
    e.preventDefault();

    var d = {};
    jQuery.map($('form').serializeArray(), function(n, i){
        d[n['name']] = n['value'];
    });

    var data = calculate(d);
    var graph = calculateGraphs(d);


    var $o = $('#output').show();

    _.forEach(data, function(v,k){
        $o.find('[data-value=' + k + ']').text(v);
    });


    var gds = _.map(graph, function(v){
        var vs = _.values(v.current)
        var gd = {
            current: {
                key: vs[0],
                value: vs[1]
            }
        };

        gd.data = _.map(v.data, function(v){
            var vs = _.values(v);
            return {
                key: vs[0],
                value: vs[1]
            }
        });
	gd.xlabel = v.xlabel;

        return gd;

    });

     $o.find('svg').remove();
     var f = $o.find('figure')
     drawGraph1(gds[0], f[0]);
     drawGraph1(gds[1], f[1]);
     drawGraph1(gds[2], f[2]);

})
