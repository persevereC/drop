(function($,window, document,undefined){
	$.drop=function() {
		$(".selectList").each(function(){ 
			var url = "data.json"; 
			var areaJson; 
			var temp_html; 
			var oProvince = $(this).find(".province"); 
			var oCity = $(this).find(".city"); 
			var oDistrict = $(this).find(".district"); 
			//初始化省 
			var province = function(){ 
				$.each(areaJson,function(i,province){ 
					temp_html+="<option value='"+province.name+"'>"+province.name+"</option>"; 
				}); 
				oProvince.html(temp_html); 
				city(); 
			}; 
			//市 
			var city = function(){ 
				temp_html = ""; 
				var n = oProvince.get(0).selectedIndex; 
				$.each(areaJson[n].city,function(i,city){ 
					temp_html+="<option value='"+city.name+"'>"+city.name+"</option>"; 
				}); 
				oCity.html(temp_html); 
				district(); 
			}; 
			//县 
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
			//选择省改变市 
			oProvince.change(function(){ 
				city(); 
			}); 
			//选择市改变县 
			oCity.change(function(){ 
				district(); 
			}); 
			//获取json数据 
			$.getJSON(url,function(data){ 
				areaJson = data; 
				province(); 
			}); 
		}); 
	};
})(jQuery,window, document);