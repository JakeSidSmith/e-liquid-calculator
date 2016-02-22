/* global $ */

'use strict';

(function () {
  $(document).ready(function () {
    var PG_VG_MIX = 'pg-vg-mix';

    var container = $('#container');

    var baseMl = $('input:eq(0)');
    var baseVg = $('input:eq(1)');
    var liquidMl = $('input:eq(2)');
    var liquidVg = $('input:eq(3)');
    var liquidN = $('input:eq(4)');
    var flavorMl = $('input:eq(5)');
    var flavorVg = $('input:eq(6)');

    var basePercentage = $('input:eq(7)');
    var liquidPercentage = $('input:eq(8)');
    var flavorPercentage = $('input:eq(9)');
    var nicotinePercentage = $('input:eq(10)');
    var vgPercentage = $('input:eq(11)');
    var totalMl = $('input:eq(12)');

    var visualizeBase = $('.base:eq(0)');
    var visualizeLiquid = $('.liquid:eq(0)');
    var visualizeNicotine = $('.nicotine:eq(0)');
    var visualizeFlavor = $('.flavor:eq(0)');
    var visualizeVg = $('.vg:eq(0)');
    var visualizePg = $('.pg:eq(0)');

    var toPercentage = function (value) {
      return [
        (value * 100).toFixed(2),
        '%'
      ].join('');
    };

    var toMl = function (value) {
      return [
        value.toFixed(2),
        'ml'
      ].join('');
    };

    var updateCalculations = function () {
      var baseMlVal = (parseFloat(baseMl.val()) || 0);
      var baseVgVal = (parseFloat(baseVg.val()) || 0) / 100;
      var liquidMlVal = (parseFloat(liquidMl.val()) || 0);
      var liquidVgVal = (parseFloat(liquidVg.val()) || 0) / 100;
      var liquidNVal = (parseFloat(liquidN.val()) || 0) / 100;
      var flavorMlVal = (parseFloat(flavorMl.val()) || 0);
      var flavorVgVal = (parseFloat(flavorVg.val()) || 0) / 100;

      var totalMlVal = baseMlVal + liquidMlVal + flavorMlVal;
      var basePercentageVal = (baseMlVal / totalMlVal);
      var liquidPercentageVal = (liquidMlVal / totalMlVal);
      var flavorPercentageVal = (flavorMlVal / totalMlVal);
      var nicotinePercentageVal = liquidNVal * liquidPercentageVal;

      var vgPercentageVal = (basePercentageVal * baseVgVal) +
      (liquidPercentageVal * liquidVgVal) +
      (flavorPercentageVal * flavorVgVal);

      // console.log(
      //   [
      //     baseMlVal,
      //     baseVgVal,
      //     liquidMlVal,
      //     liquidVgVal,
      //     liquidNVal,
      //     flavorMlVal,
      //     flavorVgVal,
      //     'Total ml',
      //     totalMlVal,
      //     'Base %',
      //     basePercentageVal,
      //     'Liquid %',
      //     liquidPercentageVal,
      //     'Flavor %',
      //     flavorPercentageVal,
      //     'Nicotine %',
      //     nicotinePercentageVal
      //   ].join('\n')
      // );

      basePercentage.val(toPercentage(basePercentageVal));
      liquidPercentage.val(toPercentage(liquidPercentageVal));
      flavorPercentage.val(toPercentage(flavorPercentageVal));
      nicotinePercentage.val(toPercentage(nicotinePercentageVal));
      vgPercentage.val(toPercentage(vgPercentageVal));
      totalMl.val(toMl(totalMlVal));

      if (vgPercentageVal < 1 && vgPercentageVal > 0 && !container.hasClass(PG_VG_MIX)) {
        container.addClass(PG_VG_MIX);
      } else if ((vgPercentageVal === 1 || vgPercentageVal === 0) && container.hasClass(PG_VG_MIX)) {
        container.removeClass(PG_VG_MIX);
      }

      visualizeBase.css('height', toPercentage(basePercentageVal));
      visualizeBase.css('opacity', basePercentageVal ? 1 : 0);

      visualizeLiquid.css('height', toPercentage(liquidPercentageVal));
      visualizeLiquid.css('opacity', liquidPercentageVal ? 1 : 0);
      visualizeLiquid.css('bottom', toPercentage(basePercentageVal));

      visualizeNicotine.css('height', toPercentage(liquidNVal));
      visualizeNicotine.css('opacity', liquidNVal ? 1 : 0);

      visualizeFlavor.css('height', toPercentage(flavorPercentageVal));
      visualizeFlavor.css('opacity', flavorPercentageVal ? 1 : 0);
      visualizeFlavor.css('bottom', toPercentage(basePercentageVal + liquidPercentageVal));

      visualizeVg.css('height', toPercentage(vgPercentageVal));
      visualizeVg.css('opacity', vgPercentageVal ? 1 : 0);

      visualizePg.css('height', toPercentage(1 - vgPercentageVal));
      visualizePg.css('opacity', (1 - vgPercentageVal) ? 1 : 0);
      visualizePg.css('bottom', toPercentage(vgPercentageVal));

      visualizeBase.find('span:eq(0)').text(toPercentage(basePercentageVal));
      visualizeLiquid.find('span:eq(0)').text(toPercentage(liquidPercentageVal));
      visualizeNicotine.find('span:eq(0)').text(toPercentage(nicotinePercentageVal));
      visualizeFlavor.find('span:eq(0)').text(toPercentage(flavorPercentageVal));
      visualizeVg.find('span:eq(0)').text(toPercentage(vgPercentageVal));
      visualizePg.find('span:eq(0)').text(toPercentage(1 - vgPercentageVal));
    };

    $('input').bind('change, input', updateCalculations);

    updateCalculations();
  });
})();
