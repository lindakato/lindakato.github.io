function NetworkGraph(elementId, width, height, margin) {
  this.elementId = elementId != null ? elementId : "chart";
  this.width = width != null ? width : "500";
  this.height = height != null ? height : "500";
  this.margin = margin != null ? margin : {top: 0, right: 0, bottom: 0, left: 0};
}

NetworkGraph.prototype.render = function(data) {
  if (data == null) return;

  let svg = d3.select("#" + this.elementId)
              .attr("viewBox", [0, 0, this.width, this.height])
              .attr("width", this.width)
              .attr("height", this.height);

  // Where score is a percentage from 0 to 1
  let dataNodes = [
    {
      id: 1,
      name: "Linda Kato",
      score: 1
    },
    {
      id: 2,
      name: "Tester",
      score: 0.4
    },
    {
      id: 3,
      name: "UI Developer",
      score: 1
    },
    {
      id: 4,
      name: "Functional",
      score: 0.2
    },
    {
      id: 5,
      name: "Non-Functional",
      score: 0.2
    },
    {
      id: 6,
      name: "User Acceptance",
      score: 0.2
    },
    {
      id: 7,
      name: "System Integration",
      score: 0.2
    },
    {
      id: 8,
      name: "HTML",
      score: 0.8
    },
    {
      id: 9,
      name: "CSS",
      score: 0.8
    },
    {
      id: 10,
      name: "Bootstrap",
      score: 0.5
    },
    {
      id: 11,
      name: "Javascript",
      score: 0.8
    },
    {
      id: 12,
      name: "JQuery",
      score: 0.8
    },
    {
      id: 13,
      name: "Tapestry",
      score: 0.2
    },
    {
      id: 14,
      name: "Java",
      score: 0.5
    },
    {
      id: 15,
      name: "Ruby on Rails",
      score: 0.2
    },
    {
      id: 16,
      name: "React",
      score: 0.2
    }
  ];

  let dataLinks = [
    { "source": 1, "target": 2 },
    { "source": 1, "target": 3 },
    { "source": 2, "target": 4 },
    { "source": 2, "target": 5 },
    { "source": 2, "target": 6 },
    { "source": 2, "target": 7 },
    { "source": 3, "target": 8 },
    { "source": 3, "target": 9 },
    { "source": 3, "target": 11 },
    { "source": 8, "target": 10 },
    { "source": 9, "target": 10 },
    { "source": 10, "target": 12 },
    { "source": 3, "target": 13 },
    { "source": 3, "target": 14 },
    { "source": 3, "target": 15 },
    { "source": 3, "target": 16 }
  ];

  let forceLinks = d3.forceLink(dataLinks);
  forceLinks.id( (d) => d.id ).distance(100);

  let simulation =
    d3.forceSimulation(dataNodes)
      .force("link", forceLinks)
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));

  // Render links.
  let links = svg.append("g").selectAll("line").data(dataLinks).join("line")
    .attr("stroke", "#333")
    .attr("stroke-width", "1px");

  // Render nodes.
  let nodes = svg.append("g").attr("class", "node").selectAll("node").data(dataNodes).enter().append("g");

  nodes.append("circle")
    .attr("r", (d) => d.score != null ? d.score * 35 : 10 )
    .attr("fill", (d) => {
      let color = "#555";
      if (d.id == 1) {
        color = "#ff0094";
      }
      else if (d.id == 2 || d.id == 3) {
        color = "#f1a214";
      }
      return color;
    });

  nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .attr("fill", "#fff")
    .style("font-size", (d) => {
      let size = 18;
      if (d.score >= 0.3 && d.score <= 0.6) {
        size = 14;
      }
      else if (d.score < 0.3) {
        size = 10;
      }
      return size + "pt";
    })
    .style("font-weight", (d) => d.id >= 1 && d.id <=3 ? "600" : "300")
    .text(function(d) { return d.name });

  // Call drag.
  nodes.call(d3.drag()
    .on("start", dragStart)
    .on("drag", drag)
    .on("end", dragEnd)
  );

  // Enable simulation.
  simulation.on("tick", function() {
    links
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    nodes
      .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")" );
  });

  function dragStart(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    d.fixed = true;
  }

  function drag(d) {
    if (d == null) return;
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragEnd(d) {
    if (!d3.event.active) simulation.alphaTarget(0);

    // Remove to fixed to a location.
    //d.fx = null;
    //d.fy = null;
  }
}
