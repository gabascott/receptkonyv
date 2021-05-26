
var receptTomb = [];
var leptetoIndex = 0;

$(function () {
    $.ajax({url: "receptek.json",
        success: function (result) {
            receptTomb = result;
            console.log(result);
            tablaletrehoz();
        }});
    $("#bal").click(balraLeptet);
    $("#jobb").click(jobbraLeptet);
    $("article").on("click", "tr", (kivalaszt));
});



function tablaletrehoz() {
    $("article").append("<table>");
    $("article table").append("<tr><th>nev</th><th>elkIdo</th><th>leiras</th><th>kep</th><th>hozzavalok</th></tr>");
    for (var i = 0; i < receptTomb.length; i++) {
        $("article table").append("<tr id='" + i + "'>");
        for (var item in receptTomb[i]) {
            $("article table tr").eq(i + 1).append("<td>" + receptTomb[i][item] + "</td>");
        }
    }
}

function kivalaszt() {
    var index = $(this).attr("id");
    console.log(index);
    console.log(receptTomb[index]);
    leptetoIndex = index;
    megjelenit(index);
}

function megjelenit(index) {
    $("#recept").empty();
    $("#recept").append("<img src='" + receptTomb[index].kep + "' alt='" + receptTomb[index].nev + "'>");
    $("#recept").append("<h2>");
    $("#recept h2").append(receptTomb[index].nev);
    $("#recept").append("<p>");
    $("#recept p").append(receptTomb[index].leiras);
    $("#recept").append("<p>");
    $("#recept p").eq(1).append("Elkészítési idő: " + receptTomb[index].elkIdo);
    $("#recept").append("<h3>");
    $("#recept h3").append("Hozzávalók");
    $("#recept").append("<ul>");
    var hozzavalok = receptTomb[index].hozzavalok;
    console.log(hozzavalok);
    for (var i = 0; i < hozzavalok.length; i++) {
        for (var item in hozzavalok[i]) {
            $("#recept ul").append("<li>" + item + " " + hozzavalok[i][item] + "</li>");
        }
    }
}

function balraLeptet() {
    leptetoIndex--;
    if (leptetoIndex < 0) {
        leptetoIndex = receptTomb.length - 1;
    }
    megjelenit(leptetoIndex);
}
function jobbraLeptet() {
    leptetoIndex++;
    if (leptetoIndex > receptTomb.length - 1) {
        leptetoIndex = 0;
    }
    megjelenit(leptetoIndex);
}