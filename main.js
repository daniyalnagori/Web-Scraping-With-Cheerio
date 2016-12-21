var cheerio = require('cheerio'),
    cheerioTableparser = require('cheerio-tableparser');
var request = require('request');
var target = "https://ngos.org.pk/rights/human_rights_ngos_pakistan.htm";
request(target, function (err, response, body) {
    if (!err && response.statusCode === 200) {
        $ = cheerio.load(body);
        cheerioTableparser($);
        var data = $("#mainContent > table").parsetable(false, false, false);
        var arr = [];
        var array1 = [];
        var objecktKeys = ["logo", "name", "since", "address", "comment"];
        for (var i = 0; i < data.length; i++) {
            for (var y = 0; y < data[i].length; y++) {
                var obj = {}
                for (var x = 0; x < data.length; x++) {
                    var m = i + 1
                    if (data[x][y + 1]) {
                        if (x === 0) {
                            obj['logo'] = (data[x][y + 1].indexOf('src') != -1) ? $(data[x][y + 1]).attr('src') : data[x][y + 1];
                        } else if (x === 1) {
                            obj['name'] = (data[x][y + 1].indexOf('href') != -1) ? $(data[x][y + 1]).text() : data[x][y + 1];
                            obj['website'] = (data[x][y + 1].indexOf('href') != -1) ? $(data[x][y + 1]).attr('href') : data[x][y + 1];
                        }
                        else if (x === 2) {
                            obj['since'] = data[x][y + 1] || ""
                        }
                        else if (x === 3) {
                            obj['address'] = data[x][y + 1] || ""
                        }
                        else {
                            obj['comment'] = data[x][y + 1] || ""
                        }
                    } else {
                        obj[objecktKeys[x]] = ""
                    }
                }
                if (Object.keys(obj).length > 0) {
                    array1.push(obj)
                }
            }
            break;
        }
        console.log(array1)
    }
})


// data.forEach((val, indx) => {
//     console.log('val ', val)
//     console.log('indx ', indx)
// })

// console.log(data)

// var request = require('request');
// var cheerio = require('cheerio');
// var cheerioTableparser = require('cheerio-tableparser')
// var target = "https://ngos.org.pk/rights/human_rights_ngos_pakistan.htm";
// var names = [];
// request(target, function (err, response, body) {
//     if (!err && response.statusCode === 200) {

//         $ = cheerio.load(body);

//         cheerioTableparser($);
//         var data = $("#mainContent > table").parsetable(false, false, false)
//         var index = 0;
//         var tdIndex = 0;
//         var table = []
//         for (var i = 0; i < data[0].length; i++) {
//             var loop = 0;
//             if (tdIndex === data[0].length) {
//             } else {
//                 for (loop; loop < data.length; loop++) {
//                     abc(loop, i);
//                 }
//                 tdIndex = tdIndex + 1;
//             }
//         }
//         function abc(loop, i) {
//             // console.log("21111111111", i, data[loop][i]);
//             table.push({ [data[loop]]: data[loop][i] })
//             for (index; index < data[0].length; index++) {

//                 break;
//             }
//         }
//         console.log(table[0], "2222222222222222222222222222222")
//         // $ = cheerio.load(body);
//         // var self = this;
//         // var thejson = [];
//         // $('tr').each(function (index, value) {
//         //     console.log(value.innerHTML)
//         //     thejson.push({ [index]: $('td', this).text() })
//         //     // var json = getJson ( $(this) );
//         //     // thejson.push(json);
//         //     // var k = $('th', this), v = $('td', this).text();
//         //     // // if (index === 0) {
//         //     // //     console.log('headerrrrrrrrrrrrr', index, k)
//         //     // // }
//         //     // var data = {};
//         //     // data[k] = v;
//         //     // thejson.push(data);
//         // });
//         // console.log(thejson)
//         // $("tr").each(function (index, object) {
//         //     var summaryNode = $(object).find("td");
//         //     // console.log('objecttttttttttttt', object)
//         //     if (index === 16) {
//         //         console.log('summaryNode', index, summaryNode['0'].children[0].parent.children)
//         //     }
//         //     // var data = {};
//         //     // data[k] = summaryNode;

//         //     // console.log($(titleNode).text());
//         //     // console.log($(summaryNode).text().trim())
//         //     // 
//         //     // console.log($(summaryNode).text())
//         //     names.push({ key: $(summaryNode).text().trim() });
//         //     // names.push(data);
//         //     // console.log(names);
//         //     // console.log(names[index].key);
//         //     // console.log("<<<<<<<< index Number" + index, names[index].key);
//         //     // console.log("<<<<<<<< index Number" + names[index].key);
//         //     // console.log(names)
//         //     // this.names.push(a);
//         //     // console.log(this.a);

//         // })
//     }
// })

// // setTimeout(function () {
// //     for (var i = 0; i < names.length; i++) {
// //         console.log("index " + i, names[i].key);
// //     }
// // }, 5000);
