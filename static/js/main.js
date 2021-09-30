let start = new Date($('#start').value);
let end = new Date($('#end').value);
let minuts = Math.round(((Math.abs(start-end)/1000)/60)/60);
$('#start').on('change', (event) => {
    start = new Date(event.target.value);
    minuts = (((Math.abs(start-end)/1000)/1)/60);
    if (minuts) {
        $('#work_duraction').val(""+minuts);
    }
})
$('#end').on('change', (event) => {
    end = new Date(event.target.value);
    minuts = (((Math.abs(start-end)/1000)/1)/60);
    if (minuts) {
        $('#work_duraction').val(""+minuts);
    }
})



function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

  var countries = [
    "01000000","01100000","01101000","01102000","01102010","01102020","01102030","01102040","01102051","01102052","01102060","01103000","01103010","01103020","01103030",
    "01103040","01103050","01104000","01104010","01104020","01104031","01104032","01104040","01105000","01106000","01107000","01108000","01108010","01109000","01110000",
    "01111000","01111010","01112000","01112010","01112020","01112030","01112040","01112050","01112060","01112070","01113000","01114000","01115000","01116000","01100000",
    "01101000","01102000","01103000","01200000","01201000","01202000","01203000","01204000","01205000","01206000","01207000","01300000","01301000","01301010","01301020",
    "01301030","01301040","01301050","01301060", "01301070","01301080","01301090","01301100","01301110","01301120","01301130","01301140","01302000","01302010","01302020",
    "01302030","01302040","01302050","01302060","01302070","01302080","01302090","01302100","01303000","01304000","01304010","01304020","01305000","01306000","01307000",
    "01308000","01309000","01310000","01311000","01312000","01313000","01314000","01315000","01315000","01315000","01315000","01315000","01316000","01317000","01318000",
    "01318010","01318020","01318030","01318040","01318050","01318060","01318070","01318080","01318090","01318100","01318100","01319000","01320000","01300000","01301000",
    "01301010","01301020","01301030","01301040","01301050",
    "01301060","01302000","01302010","01302020","01302030","01302040","01302050","01302060","01302070","01302080","01302090","01302100","01302110","01302120","01303000","01303010","01303020","01303030","01303040",
    "01303050","01303060","01303070","01303080","01303090","01303100","01304000","01304010","01304020","01304030","01304040","01304050","01304060","01304070","01304080","01304090","01304100","01304110","01304120",
    "01305000","01305010","01305020","01305030","01305040","01305050","01305060","01305070",
    "01305080","01305090","01305100","01306000","01307000","01308000","01309000","01310000","01311000","01312000","01312000","01312000","01312000","01312000","01312000","01312000","01312000","01312000","01312000",
    "01312000","01312000","01312000","01312000","01312000","01312000","01313000","02000000","02001000","02001010","02002000","02002010","02003000","02004000","02005000","02005010","02006000","02006010","02006020",
    "02006030","02006040","02006050","02006060","02007000","02008000","02009000","02010000","02011000","02012000","02013000","02014000","02015000","02016000","02000000","02001000","02002000","02003000","02003011",
    "02003012","02003021","02003022","02003023","02003024","02003031","02003032","02003033","02003020","02003030","02003040","02003000","02004000","02005000","03000000","03100000","03101000","03102000","03103000",
    "03104000","03105000","03106000","03107000","03100000","03101000","03101010","03101020","03102000","03103000","03104000","03105000",
    "03106000","03107000","03108000","03100000","03101000","03102000","03103000","03104000","03100000","03101000","03100000","03101000","03102000","03200000","03201000","03201010","03201020","03201031","03201032",
    "03201040","03201051","03201052","03201060","03201070","03201080","03201090","03201101","03201102","03202000","03203000","03203011","03203012","03203021","03203022","03204000","03205000","03206000","03200000",
    "03201000","03202000","03300000","03301000","03302000","03303000","03304000","03305000","03300000","03301000","03400000","03401000","03500000","03501001","03501002","03501010","03501020","03502000","03503001",
    "03503002","03503010","03503020","03503030","03503040","03504000","03505000","03505011","03505012","03505020","03505030","03505040","03506000","03507000","03508000","03509000","03510000","03511000","03500000",
    "03501000","03502000","03503000","03600000","03601001","03601002","03602000","03603000","03604000","03604010","03605000","03600000","03601000","03602000","03603000",
    "03700000","03701000","03701011","03701012","03701020","03701000","03702000","03700000","03701000","03800000","03801001","03801002","03801010","03801020","03802000","03803000","03804000","03805000","03806000",
    "03807000","03808000","03800000","03801000","03900000","03901001","03901002","03902000","03903001","03903002","03900000","03901000","04000000","04001000","04002000","04003000","04000000","04001000","04100000",
    "04101000","04102000","04103000","04100000","04101000","04000000","04001000","04002000","04003000","04004000","04005000","04000000","04001000","05000000","05001000","05002000","05003000","05004000","05005000",
    "05006000","05007000","05008000","05009000","05010000","05011000","05012000","05013000","05014000","05015000","05016000","05016000","05017000","05017000","05017000","05017000","05017000","05017000",
    "05017000","05017000","06000000","06100000","06101000","06101010","06101020","06102000","06102010","06102020","06103000","06104000","06105000","06105010","06106000","06107000","06108000","06100000","06101000",
    "06102000","06103000","06104000","06105000","06200000","06201000","06202000","06203000","06204000","06205000","06200000","06201000","06300000","06301000","06300000","06301000","06302000","06400000","06401000",
    "06400000","06401000","06500000","06501000","06502000","06500000","06501000","06502000","06600000","06601000","06602000","06700000","06701000","07000000","07001000","07002000","07003000","07004000","07004010",
    "07005000","07005010","07005020","07005030","07006000","07007000","07008000","07009000","07010000","07011000","07012000","07013000","07014000","07000000","07001000","07002000","07003000","08000000","08001000",
    "08002000","08003001","08003002","08004001","08004002","08005000","08005010","08006000","08007000","08007010","08008000","08008010","08009000","08009010","08010000","08010010","08011000","08011010","08012000",
    "08013000","08014000","08015000",
    "08016000","08000000","08001000","08002000","08003000","08004000","09000000","09100000","09101000","09102000","09102010","09102020","09102030","09103000","09104000","09104010","09104020","09104030","09105000",
    "09106000","09200000","09201000","09201010","09201020","09202000","09203000","09300000","09301000","09301010","09301020","09302000","09303000","09400000","09401000",
    "09402000","09500000","09501000","09600000","09601000","10000000","10001000","10002000","10003000","10004000","10005000","10006000","10007000","10000000","10001000","10002000","10003000","10004000","10005000",
    "10006000","11000000","11001000","11002000","11003000","11004000","11005000","11006000","11007000","11008000","11009000","11010000","11011000","11012000","11012000","11012000","11013000","11014000","11015000",
    "11016000","11017000","11018000","11019000","11020000","11021000","11022000","11023000","11024000","11025000","11026000","12000000","12001000","12001010","12002000","12002010","12003000","12003010","12003020",
    "12003030","12003040","12003050","12003060","12003070","12003080","12003090","12003100","12003110","12004000","12004010","12004020","12004030","12004040","12005000","12005010","12005020","12005030","12005040",
    "12005050","12005060","12005070","12005080","12005090","12005100","12005110","12006000","12006010","12006020","12006030","12006040","12006050","12006060","12006070",
    "12006080","12006090","12006100","12006110","12007000","12007010","12007020","12007030","12007040","12007050","12007060","12008000","12008010","12008020","12008030","12008040","12008050","12008060","12009000",
    "12009010","12009020","12010000","12010010","12010020","12010030","12010040","12010050","12011000","12011010","12011020","12011030","12011040","12011050","12011060","12011070","12012000","12012010","12012020",
    "12013000","12013010","12013020","12013030","12013040","12013050","12013060","12013070","12013080","12014000","12014010","12014020","12014030","12014040","12014050","12014060","12014070","12014080","12015000",
    "12015010","12015020","12015030","12016000","12016010","12016020","12017000","12017010","12017020","12017030","12017040","12017050","12017060","12017070","12018000","12018010","12018020","12018030","12018040",
    "12018050","12018060","12018070","12018080","12018090","12018100","12018110","12019000","12020000","12021000","12022000","13000000","13100000","13101000","13101000","13102000","13102000","13102000","13102000",
    "13102000","13102000","13103000","13103000","13104000","13104000","13105000","13105000","13106000","13106000","13107000","13107000","13108000","13108000","13109000","13109000","13110000","13110000","13200000",
    "13211000","13211000","13300000","13312000","13312000","13312000","13312000","13400000","13413000","13413000","13413000","13414000","13414000","13415000","13415000","13415000","13416000","13416000","13500000",
    "13517000","13517000","13600000","13618000","13618000","13619000","13619000","13620000","13620000","13621000","13621000","13622000","13622000","13623000","13623000","13624000","13624000","13625000","13625000",
    "13626000","13626000","13700000","13727000","13727000","13727000","13727000","13727000","13727000","13727000","13727000","13727000","13727000","13727000","13727000","13727000",
    "13728000","13728000","13728000","13728000","13728000","13728000","13728000","13728000","13728000","13728000","13728000","13728000","13728000","13800000","13829000","13829000","13829000","13829000","13830000",
    "13830000","13900000","13931000","13931000","13932000","13932000","14000000","14033000","14033000","14033000","14033000","14033000","14033000","14033000","14033000","14033000","14033000","14033000","14033000",
    "14100000","14134000","14134000","14134000","14134000","14134000","14134000","14134000","14200000","14235000","14235000","14300000","14336000","14336000","14336000","14336000","14336000","14336000","14337000",
    "14337000","14337000","14337000","14337000","14338000","14338000","14338000","14338000","14339000","14339000","14339000","14339000","14340000","14340000","14400000","14441000","14441000","14442000","14442000",
    "14500000","14543000","14543000","14544000","14544000","14600000","14645000","14700000","14746000","14747000","14747000","14748000","14748000","14748000","14748000","14748000","14748000","14749000","14800000",
    "14850000","14900000","14951000","15000000","15052000","15053000","15054000"
  ];
  
  if(document.getElementById("myInput") != null) {
    autocomplete(document.getElementById("myInput"), countries);
  }

  const tableBodyEmployee = (tbody,employes = [],date = new Date(),mainDate) => {
    employes.forEach(employee => {
      if(employee.status[0] != "2"){
        let tr = $(`
          <tr> 
            <td>
              <a href="/user_change?user_id=${employee._id}&date=${mainDate}">${employee.last_name + " " + employee.first_name + " " + employee.father_name}</a>
            </td>
            <td>
              ${employee.management}
            </td>
            <td>
              ${employee.section}
            </td>
            <td>
              ${employee.position}
            </td>
            <td>
              ${date}
            </td>
          </tr>
       `)
        tbody.append(tr)
      }
    });
  }

  const editWork = (event) => {
    let data_elem_id = event.target.getAttribute('data_elem_id');
    let work_text1 = $('#amal'+data_elem_id).val();
    let work_type1 = $('#worktype1'+data_elem_id).val();
    let start_date1 = $('#start1'+data_elem_id).val();
    let finish_date1 = $('#end1'+data_elem_id).val();
    let duration1 = $('#work_duraction1'+data_elem_id).val();
    let work_code1 = $('#amal1'+data_elem_id).val();

    let queryBody={
      id: data_elem_id,
      work_code: work_code1,
      work_text: work_text1,
      work_type: work_type1,
      start_date: start_date1,
      finish_date: finish_date1,
      duration: duration1
    };
    var $form = $('#exampleModal'+data_elem_id);
    var $inputs = $form.find("input, select, button, textarea");

    request = $.ajax({
        url: "/employee/edit_work?"+`id=${data_elem_id}&work_code=${queryBody.work_code}&work_text=${queryBody.work_text}&work_type=${queryBody.work_type}&start_date=${queryBody.start_date}&finish_date=${queryBody.finish_date}&duration=${queryBody.duration}`,
        type: "post",
        data: queryBody
    });
    request.done(function (response, textStatus, jqXHR){
        if(response.saqlandi == true){
            location.reload();
        }else{
            alert("malumotlar kiritilishida xatolik");
        }
    });
    request.fail(function (jqXHR, textStatus, errorThrown){
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
    request.always(function () {
        $inputs.prop("disabled", false);
    });


  }