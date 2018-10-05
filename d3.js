var url = "https://raw.githubusercontent.com/aaizemberg/vis/gh-pages/01/data/poblacion.json";

d3.json(url).then(function(data){
	viz(data);
});

function viz(data){
	var max = d3.max(data.map(function(d) {return d.poblacion;}));

	var scale = d3.scaleLinear().domain([0,max]).range([0,600]); //Sirve para escalar los graficos dependiendo del dominio de los datos y el rango que deben tomar.

	var svg = d3.select("body").append("svg")
	  .attr("width",1000).attr("height", 500);

	svg.selectAll("text")
		.data(data).enter().append("text")
		.attr("text-anchor","end")
		.attr("x", 140)
		.attr("y", (d,i) => (i+1)*15)
		.attr("fill", "black")
		.text(d => d.provincia);

	svg.selectAll("text.valores") //le tengo que poner #pob porque sino toma los textos creados anteriormente.
		.data(data).enter().append("text")
		.attr("class", "valores")
		.attr("x",  d =>  5 + 150 + scale(d.poblacion)) 
		.attr("y", (d,i) => (i+1)*15)
		.attr("fill", "black")
		.text(d => d.poblacion.toLocaleString("es-AR"));

	svg.selectAll("rect")
		.data(data).enter().append("rect")
		.attr("x", 150)
		.attr("y", (d,i) => (i)*15)
		.attr("width", d => scale(d.poblacion))
		.attr("height", 14)
		.attr("fill", "white")
		.append("title")
		.text(d => "Poblacion: " + d.poblacion.toLocaleString('es-AR'));

	d3.selectAll("rect").transition().duration(1000)
		.attr("width", d => scale(d.poblacion))
		.attr("fill", "grey");
}