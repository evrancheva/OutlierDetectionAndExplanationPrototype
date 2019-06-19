$(document).ready(function() {
    all(all_changes_11_12, multiple_outliers_11_12, single_outliers_11_12, interesting_changes_11_12, people_11_12);
    $(".btn").on("click", function() {
        $('.content').hide();
        $('.loader').show()
        var id = $(this).attr("id");
        $('.btn').removeClass('btn-primary');
        $(this).addClass('btn-primary');
        var period = $(this).text();
        $('.period').text(period);
        if (id == 34) {
            all(all_changes_03_04, multiple_outliers_03_04, single_outliers_03_04, interesting_changes_03_04, people_03_04);
        } else if (id == 45) {
            all(all_changes_04_05, multiple_outliers_04_05, single_outliers_04_05, interesting_changes_04_05, people_04_05);
        } else if (id == 56) {
            all(all_changes_05_06, multiple_outliers_05_06, single_outliers_05_06, interesting_changes_05_06, people_05_06);
        } else if (id == 67) {
            all(all_changes_06_07, multiple_outliers_06_07, single_outliers_06_07, interesting_changes_06_07, people_06_07);
        } else if (id == 78) {
            all(all_changes_07_08, multiple_outliers_07_08, single_outliers_07_08, interesting_changes_07_08, people_07_08);
        } else if (id == 89) {
            all(all_changes_08_09, multiple_outliers_08_09, single_outliers_08_09, interesting_changes_08_09, people_08_09);
        } else if (id == 910) {
            all(all_changes_09_10, multiple_outliers_09_10, single_outliers_09_10, interesting_changes_09_10, people_09_10);
        } else if (id == 1011) {
            all(all_changes_10_11, multiple_outliers_10_11, single_outliers_10_11, interesting_changes_10_11, people_10_11);
        } else if (id == 1112) {
            all(all_changes_11_12, multiple_outliers_11_12, single_outliers_11_12, interesting_changes_11_12, people_11_12);
        }
        setTimeout(function(){
          $('.loader').hide();
          $('.content').show();
        }, 1000);
        
    });
});

function all(all_changes, multiple_outliers, single_outliers, interesting_changes, people) {
    allChanges(all_changes);
    multipleOutliers(multiple_outliers);
    singleOutliers(single_outliers);
    interestingChanges(interesting_changes);
    $(".employee_id").click(function() {
        $('.explore-employee').remove();
        var id = $(this).attr('id');
        $('.employee-id-moral').text(id);
        displayData(id, people);
    });
}

function allChanges(data) {

    var html = '<table class="all-changes table table-sm">';
    html += '<tr>';
    var flag = 0;
    $.each(data[0], function(index, value) {
        html += '<th>' + index + '</th>';
    });
    html += '</tr>';
    $.each(data, function(index, value) {
        html += '<tr>';
        $.each(value, function(index2, value2) {
            html += '<td>' + value2 + '</td>';
        });
        html += '<tr>';
    });
    html += '</table>';
    $(".аll-changes").html(html);
    var rowCount = $('.all-changes tr').length;
    $('#changes-number').text(rowCount);
    allChangesHighlight();
    $('#two-changes-number').text($('.highlight').length);

}

function allChangesHighlight() {
    $(".all-changes tr").each(function() {
        var i = 0;
        $('td', this).each(function() {
            str = $(this).text();

            if (str.indexOf("-->") >= 0) {
                $(this).css('background-color', '#ffff00a8');
                i++;
                if (i > 1) {
                    $(this).parent().addClass("highlight");
                }
            }
        });
    })
}

function multipleOutliers(data) {
    $('.multiple-outliers-employee').empty();
    if (data.length != 0) {

        $(".multiple-outliers").text(data.length);
        $.each(data, function(i, item) {
            if(data.length == 1){
              $('<div class="alert alert-success"><p class="normal-txt"> There has been 1 employee with extreme values in multiple attributes. </p></div>').appendTo('.multiple-outliers-employee');
            }else{
              $('<div class="alert alert-success"><p class="normal-txt"> There have been '+ data.length +' employee with extreme values in multiple attributes. </p></div>').appendTo('.multiple-outliers-employee');
            }
            $('<div class="multiple-outlier-' + i + '"></div>').appendTo('.multiple-outliers-employee');
            $('<h4 class="employee_id"> Employee ID: ' + data[i].employee_id + '</div>').appendTo('.multiple-outlier-' + i);
            $('<p> The values in the following fields are extreme: </p>').appendTo('.multiple-outlier-' + i);
            multipleOutliersTable(data[i].outliers, 'multiple-outliers-table', 'Change', '.multiple-outlier-' + i,false);

            var outliers = extractOutliersOrChanges(data[i].outliers);
            if (data[i].other_changes != undefined) {
                $('<div class="alert alert-warning"><p class="normal-txt"> For this employee there have been additional changes (not extreme) as well.</p></div>').appendTo('.multiple-outlier-' + i);
                $('<p class="text mas">Here are the changes: </p>').appendTo('.multiple-outlier-' + i);
                multipleOutliersTable(data[i].other_changes, 'multiple-outliers-changes-table', 'Change', '.multiple-outlier-' + i,false);
                var changes = extractOutliersOrChanges(data[i].other_changes);
            }
            $('<div class="explanation"></div>').appendTo('.multiple-outlier-' + i);

            $('<p class="lead underlined">Explanation of the extreme values </p>').appendTo('.multiple-outlier-' + i);
            var all_ch = Object.keys(data[i].outliers).length;
            if(data[i].other_changes != undefined){
                all_ch += Object.keys(data[i].other_changes).length
            }
            if (data[i].other_changes != undefined) {
                $('<p> In conclusion, there have been changes in '  + all_ch  + ' attributes for this employee. In '+ Object.keys(data[i].outliers).length +' of the attributes there have been extreme changes (' + outliers + ') for this employee. <b> Each extreme change is most likely influenced by the occurrence of the rest of the extreme changes and the other changes as well. </b> We assume that because if, for example, there has been extreme increase in 1 attribute that most likely will lead to a change in another attribute. This goes for every explaining every extreme change.  </p>').appendTo('.multiple-outlier-' + i);
            } else {
                $('<p> In conclusion, there have been changes in  '  + all_ch  + ' for this employee. In '+ Object.keys(data[i].outliers).length +' of the attributes there have been extreme (' + outliers + ') changes for this employee. <b> Each extreme change is most likely influenced by the occurrence of the rest of the extreme changes </b> We assume that because if, for example, there has been extreme increase in 1 attribute that most likely will lead to a change in another attribute. This goes for every explaining every extreme change.  </p>').appendTo('.multiple-outlier-' + i);
            }
        });
    } else {
        $(".multiple-outliers").text(0);
    }
}

function extractOutliersOrChanges(data) {
    var outliers_or_changes = "";
    var comma = ", ";
    var i = 1;
    $.each(data, function(key, value) {
        if (i == Object.keys(data).length) {
            comma = "";
        }
        outliers_or_changes += key + comma;
        i++;
    });
    return outliers_or_changes;

}

function multipleOutliersTable(data, table, custom_field, to_here,change_only) {
    var percentage = "";
    var i = 1;
    $('<table class="table table-sm mo ' + table + '"><tr><th>Attribute</th><th>' + custom_field + '</th></tr></tr></table>').appendTo(to_here);
    
    $.each(data, function(key, value) {
        if(i >= 2 && change_only == true){
            percentage = " (%)";
        }
        var row = '<tr><td>' + key + percentage+ '</td><td>' + value  + '</td></tr>'
        $("." + table).append(row);
        i++;
    });
}

function multipleExplanation(data) {
    $('<div class="explanation"></div>').appendTo('.multiple-outliers-employee');
    $('<p class="lead underlined">Explanation of the Outliers </p>').appendTo('.multiple-outliers-employee');

    $.each(data, function(i, value1) {
        var outliers = data[i].outliers;
        var changes = data[i].other_changes;
        var out_arr = $.map(outliers, function(element, index) {
            return index
        });
        var i = 0
        $.each(outliers, function(key, value2) {
            $('<div class="explanation-outlier-' + i + '"></div>').appendTo('.multiple-outliers-employee');
            $('<p> For the outlying value in <span class="field">' + key + '</span>, the most probable reasons for its appearence are changes in: <br> <br></p>').appendTo('.explanation-outlier-' + i);
            $('<ul class="explanation-outlier-ul-' + i + '"></ul>').appendTo('.explanation-outlier-' + i);

            $.each(outliers, function(key2, value2) {
                if (key != key2) {
                    $('<li> ' + key2 + '</li>').appendTo('.explanation-outlier-ul-' + i);
                }
            });
            $.each(changes, function(key3, value) {
                if (out_arr.indexOf(key3) == -1) {
                    $('<li> ' + key3 + '</li>').appendTo('.explanation-outlier-ul-' + i);
                }
            });
            i++;
        });
        $('<div class="alert alert-danger"><p> The reasons are ranked. Firstly, the fields with outlying values are displayed. Secondly, the changes ranked according to the estimated measure of association are displayed. </p></div>').appendTo('.multiple-outliers-employee');
    });
}

function singleOutliers(data) {
    $('.single-outlierz').empty();
    var length = Object.keys(data).length;
    var i = 0;
    $.each(data, function(key, value) {
        $('<div class="so col-md-6 single-outlier-' + i + '"></div>').appendTo('.single-outlierz');
        $('<h4 data-toggle="modal" data-target="#modal" class="employee_id click" id="' + data[key].employee_id + '">Employee ID: ' + data[key].employee_id + '</div>').appendTo('.single-outlier-' + i);
        $('<p> The extreme value is detected in the <span class="red"> ' + data[key].outlier + ' </span> field</p>').appendTo('.single-outlier-' + i);
        $('<h4 class="text-center"> ' + data[key].outlier_value + '</h4>').appendTo('.single-outlier-' + i);
        $('<div class="alert alert-warning sm"><p class="normal-txt"> For this employee there have been additional changes (not extreme) as well.</p></div>').appendTo('.single-outlier-' + i);
        $('<p class="text mas">Here are the changes: </p>').appendTo('.single-outlier-' + i);
        multipleOutliersTable(data[key].changes, 'single-outliers-table-' + i, 'Measure of Association', '.single-outlier-' + i,false);
        $('<div class="single-explanation-outlier-' + i + '"></div>').appendTo('.single-outlier-' + i);
        $('<p class="lead underlined">Explanation of the extreme value </p>').appendTo('.single-explanation-outlier-' + i);
        // $('<p> For the extreme value <span class="field">' + data[key].outlier + '</span>, the most probable reasons for its appearence are the changes in: <br> <br> </p>').appendTo('.single-explanation-outlier-' + i);
        $('<p>In conclusion, there have been changes in  '  + Object.keys(data[key].changes).length  + ' for this employee. The extreme change in ' + data[key].outlier + ' is most likely influenced by the occurrence of the rest of the changes. We assume that because we estimated the measure of association of each change with the extreme value. The higher the measure of association, the most likely the change in the attribute has influence on the occurrence of the extreme value.</p>').appendTo('.single-explanation-outlier-' + i);

        i++;
    });
    $('.single-outliers').text(length);
}

function interestingChanges(data) {
    var i = 0;
    $('.numeric-changes').empty();
    $('.int-changes').text(data.length);
    $.each(data, function(key, value) {
        $('<div class="col-md-6 n-changes ich interesting-ch-' + i + '"></div>').appendTo('.numeric-changes');
        $('<h4 class="employee_id">Employee ID: ' + data[key].employee_id + '</div>').appendTo('.interesting-ch-' + i);
        changes = data[key].changes;
        $.each(changes, function(key2, values) {
            $(' <p> The interesting change is detected in the <span class="red"> ' + key2 + ' </span> field: </p>').appendTo('.interesting-ch-' + i);
            multipleOutliersTable(values, 'interesting-changes-' + i, 'Value', '.interesting-ch-' + i,true);
        });
        i++;

    });
}

function displayData(employee_id, people) {
    all_data = {}
    var j = 0
    $.each(people, function(l, v) {
        if (v.employee_id == employee_id) {
            $('<table class="table table-sm explore-employee"><tr></tr></table>').appendTo('.modal-body');
            $.each(v, function(key, values) {
                var data = []
                if (key != 'employee_id') {
                    $('<th>' + key + '</th>').appendTo('.explore-employee tr:first');
                    for (i = 0; i < 12; i++) {
                        if (values[i].length != 0) {
                            data.push(values[i]);
                        }
                    }
                    all_data[j] = data;
                    j++;
                }
            });
        }
    });

    for (m = 0; m < 12; m++) {
        var div = ""
        for (r = 0; r < j; r++) {
            alldata = all_data[r][m];
            div += "<td>" + alldata + "</td>";

        }
        var row = "<tr>" + div + "</tr>";
        $(row).appendTo('.explore-employee');
        div = "";
    }
}