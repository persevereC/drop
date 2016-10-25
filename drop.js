(function($,window, document,undefined){
	$.drop=function() {
		$(".selectList").each(function(){ 
			var url = "data.json"; 
			var areaJson; 
			var temp_html; 
			var oProvince = $(this).find(".province"); 
			var oCity = $(this).find(".city"); 
			var oDistrict = $(this).find(".district"); 
			//��ʼ��ʡ 
			var province = function(){ 
				$.each(areaJson,function(i,province){ 
					temp_html+="<option value='"+province.name+"'>"+province.name+"</option>"; 
				}); 
				oProvince.html(temp_html); 
				city(); 
			}; 
			//�� 
			var city = function(){ 
				temp_html = ""; 
				var n = oProvince.get(0).selectedIndex; 
				$.each(areaJson[n].city,function(i,city){ 
					temp_html+="<option value='"+city.name+"'>"+city.name+"</option>"; 
				}); 
				oCity.html(temp_html); 
				district(); 
			}; 
			//�� 
			var district = function(){ 
				temp_html = ""; 
				var m = oProvince.get(0).selectedIndex; 
				var n = oCity.get(0).selectedIndex; 
				if(typeof(areaJson[m].city[n].area) == "undefined"){ 
					oDistrict.css("display","none"); 
				}else{ 
					oDistrict.css("display","inline"); 
					$.each(areaJson[m].city[n].area,function(i,district){		
						temp_html+="<option value='"+district+"'>"+district+"</option>"; 
				}); 
				oDistrict.html(temp_html); 
				}; 
			}; 
			//ѡ��ʡ�ı��� 
			oProvince.change(function(){ 
				city(); 
			}); 
			//ѡ���иı��� 
			oCity.change(function(){ 
				district(); 
			}); 
			//��ȡjson���� 
			$.getJSON(url,function(data){ 
				areaJson = data; 
				province(); 
			}); 
		}); 
	};
})(jQuery,window, document);