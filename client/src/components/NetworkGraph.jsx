import React, { useRef, useEffect, useState } from 'react';
import PlayerDetailsModal from 'components/PlayerModa'
import * as d3 from 'd3';

const NetworkGraph = ({ graphData, width = 1000, height = 1000 }) => {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  useEffect(() => {
d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', 'xMinYMin meet');

    const colorScale = d3.scaleOrdinal()
      .domain(['player', 'neutral', 'partner', 'opponent'])
      .range(['black', 'blue', 'green', 'red']);

const simulation = d3.forceSimulation(graphData.nodes)
  .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(d => Math.abs(d.value) * 70).strength(0.5))
  .force('charge', d3.forceManyBody().strength(-200))
  .force('center', d3.forceCenter(0, 0));

    const link = svg.append('g')
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke-width', d => Math.abs(d.value))
      .attr('stroke', d => {
        const targetNode = graphData.nodes.find(node => node.id === d.target.id);
        return colorScale(targetNode.type);
      });

const node = svg.append('g')
  .attr('stroke', '#fff')
  .attr('stroke-width', 2)
  .selectAll('g')
  .data(graphData.nodes)
  .join('circle')
  .attr('r', d => d.type === 'player' ? 30 : 20)
  .attr('fill', d => colorScale(d.type))
    // node.append('title').text(d => d.id);

node.append('text')
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .text(d => d.id)
  .style('font-size', '14px') // set font size to 14px
  .style('fill', '#FF7F0E') // set text color to white

  node.call(drag(simulation))
  .on('click', (event, d) => setSelectedNode(d));
const legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform', `translate(${width / 2 - 120}, ${height / 2 - 100})`);

const legendItems = legend.selectAll('.legend-item')
  .data(['you', 'neutral', 'partner', 'opponent'])
  .enter()
  .append('g')
  .attr('class', 'legend-item')
  .attr('transform', (d, i) => `translate(0, ${i * 20})`);

legendItems.append('circle')
  .attr('r', 9)
  .attr('fill', colorScale);

legendItems.append('text')
  .attr('x', 15)
  .attr('y', 5)
  .text(d => d)
  .style('font-size', '20px')
  .style('fill', '#FF7F0E');

    const linkLabel = svg.append("g")
  .selectAll("text")
  .data(graphData.links)
  .join("text")
  .attr("dy", "-3px")
  .attr("text-anchor", "middle")
  .attr("font-size", "14px")
  .attr("font-weight", "bold")
  .attr("fill", "#FF7F0E")
  .text(d => d.target.id);

simulation.on('tick', () => {
  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);

  linkLabel
    .attr("x", d => (d.source.x + d.target.x) / 2)
    .attr("y", d => (d.source.y + d.target.y) / 2);

  node.attr('cx', d => d.x).attr('cy', d => d.y);
});


    return () => {
      simulation.stop();
    };
  }, [graphData, width, height]);

  const drag = simulation => {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  };

  return (<div>
<PlayerDetailsModal
  selectedNode={selectedNode}
  handleClose={() => setSelectedNode(null)}
/>
    <svg ref={svgRef} />
    </div>)
};

export default NetworkGraph;
